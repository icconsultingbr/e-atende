// Import dependencies
const axios = require('axios');
const KJUR = require('jsrsasign');
const q = require('q');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const {
    inNumberArray, isBetween, isLengthLessThan, isRequired, matchesStringArray, validateRequest
} = require('../../util/ZoomValidations');
const { toStringArray } = require('../../util/ZoomUtil');
const config = require('../../config/config');
const { error } = require('console');

// Validator configuration
const validator = {
    role: [isRequired, inNumberArray([0, 1])],
    sessionName: [isRequired, isLengthLessThan(200)],
    expirationSeconds: isBetween(1800, 172800),
    userIdentity: isLengthLessThan(35),
    sessionKey: isLengthLessThan(36),
    geoRegions: matchesStringArray(['AU', 'BR', 'CA', 'CN', 'DE', 'HK', 'IN', 'JP', 'MX', 'NL', 'SG', 'US']),
    cloudRecordingOption: inNumberArray([0, 1]),
    cloudRecordingElection: inNumberArray([0, 1]),
    audioCompatibleMode: inNumberArray([0, 1])
};

// Helper to coerce body values
function coerceRequestBody(body) {
    const coerced = Object.assign({}, body);
    ['role', 'expirationSeconds', 'cloudRecordingOption', 'cloudRecordingElection', 'audioCompatibleMode'].forEach(function (key) {
        if (typeof body[key] === 'string') {
            coerced[key] = parseInt(body[key], 10);
        }
    });
    return coerced;
}

// Join geoRegions array into a string
function joinGeoRegions(geoRegions) {
    const value = toStringArray(geoRegions);
    return value ? value.join(',') : '';
}

// JWT Creation Helper
function createZoomJwt(payload) {
    const header = { alg: 'HS256', typ: 'JWT' };
    try {
        return KJUR.jws.JWS.sign('HS256', JSON.stringify(header), JSON.stringify(payload), config.zoomConfig.videoSDKSecret);
    } catch (error) {
        console.error("Error creating JWT:", error);
        throw new Error("JWT generation failed");
    }
}

// Generate Token
function generateToken(body) {
    body = body || {};
    const requestBody = coerceRequestBody(body);
    const validationErrors = validateRequest(requestBody, validator);

    if (validationErrors && validationErrors.length > 0) {
        return { error: validationErrors };
    }

    const {
        role, sessionName, expirationSeconds, userIdentity, sessionKey, geoRegions,
        cloudRecordingOption, cloudRecordingElection, audioCompatibleMode
    } = requestBody;

    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + (expirationSeconds || 60 * 60 * 2);

    const payload = {
        app_key: config.zoomConfig.videoSDKKey,
        role_type: role,
        tpc: sessionName,
        version: 1,
        iat,
        exp,
        user_identity: userIdentity,
        session_key: sessionKey,
        geo_regions: joinGeoRegions(geoRegions),
        cloud_recording_option: cloudRecordingOption,
        cloud_recording_election: cloudRecordingElection,
        audio_compatible_mode: audioCompatibleMode
    };

    return createZoomJwt(payload);
}

// Generate API Token
function generateAPIToken() {
    const API_KEY = config.zoomConfig.apiKey;
    const API_SECRET = config.zoomConfig.apiSecret;
    const header = { alg: 'HS256', typ: 'JWT' };
    const iat = Math.round((Date.now() - 30000) / 1000);
    const exp = iat + 60 * 60 * 2;
    const payload = { iss: API_KEY, iat, exp };

    return KJUR.jws.JWS.sign('HS256', JSON.stringify(header), JSON.stringify(payload), API_SECRET);
}

// Module Export
module.exports = function (app) {
    app.post('/tele-atendimento/auth', function (request, response) {
        const result = generateToken(request.body);
        if (result.error) {
            return response.status(400).json({ errors: result.error });
        }
        return response.json({ signature: result });
    });
    
    /**
     * Downloads the recording of a telehealth session
     * @route GET /tele-atendimento/sessao/:sessaoId/download
     * @param {string} req.params.sessaoId - ID of the session to download
     * @returns {Buffer} Recording file as octet-stream
     * @throws {400} If session ID is missing or video download fails
     * @throws {404} If session is not found
     * @throws {500} If an unexpected error occurs
     */
    app.get('/tele-atendimento/sessao/:sessaoId/download', async function (req, res) {
        const sessaoId = req.params.sessaoId;

        if (!sessaoId) {
            return res.status(400).json({ error: "Parametro não identificado." });
        }

        const connection = await app.dao.connections.EatendConnection.connection();

        try {
            const teleAtendimentoRepository = new app.dao.TeleAtendimentoDAO(connection);

            const teleAtendimento = await teleAtendimentoRepository.obterPorSessaoId(sessaoId);

            if(!teleAtendimento){
                return res.status(404).json({ error: "Sessão não encontrada." });
            }

            const zoomApiUrl = 'https://api.zoom.us/v2/videosdk/sessions/' + teleAtendimento.sessaoIdZoom + '/recordings?include_fields=download_access_token';

            const zoomResponse = await axios.get(zoomApiUrl, {
                headers: { Authorization: 'Bearer ' + generateAPIToken() }
            });

            const recordingFiles = zoomResponse.data && zoomResponse.data.recording_files;
            const downloadUrl = recordingFiles && recordingFiles.length > 0 ? recordingFiles[0].download_url : null;
            const downloadToken = zoomResponse.data && zoomResponse.data.download_access_token;

            if (!downloadUrl || !downloadToken) {
                return res.status(400).json({ error: "Ocorreu um erro ao fazer download do video" });
            }

            const downloadResponse = await axios.get(downloadUrl, {
                headers: { Authorization: 'Bearer ' + downloadToken },
                responseType: 'arraybuffer'
            });

            res.set('Content-Type', 'application/octet-stream');
            res.send(downloadResponse.data);
        }
        catch (exception) {
            res.status(500).send(util.customError(errors, "header", "Ocorreu um erro inesperado " + exception, ""));
        }
        finally {
            await connection.close();
        }
    });


    /**
     * Cria uma nova sessao de atendimento
     * @route POST /tele-atendimento/sessoes
     * @param {Object} req.body.atendimentoId - ID do atendimento
     * @param {boolean} req.body.medico - Flag indicando se e medico
     * @returns {Object} Response contendo a URl da sessao
     * @returns {string} Response.url - URL da sessao
     * @throws {400} Se o atendimento nao for informado
     */
    app.post('/tele-atendimento/sessoes', async function (req, res) {
        const body = req.body || {};
        const payload = {
            atendimentoId: body.atendimentoId,
            agendamentoId: body.agendamentoId,
            perfil: body.medico ? 'medico' : 'paciente'
        };


        if (!payload.atendimentoId && !payload.agendamentoId) {
            res.status(400).json({ error: 'Informe o número do agendamento ou atendimento' });
            return;
        }

        if (!config.meeting) {
            res.status(400).json({ error: 'Meeting não foi configurado' });
        }

        const connection = await app.dao.connections.EatendConnection.connection();

        try {
            const teleAtendimentoRepository = new app.dao.TeleAtendimentoDAO(connection);

            let teleAtendimento =  payload.atendimentoId ? await teleAtendimentoRepository.obterPorAtendimentoId(payload.atendimentoId) : 
                                await teleAtendimentoRepository.obterPorAgendamentoId(payload.agendamentoId);

            if (teleAtendimento) {
                const url = `${config.meeting.url}/tele-atendimento/${teleAtendimento.sessaoId}/${teleAtendimento.sessaoPassword}/1/${payload.perfil}`;
                res.json({ url: url });
                return;
            }

            teleAtendimento = {
                id: 0,
                agendamentoId: payload.agendamentoId,
                atendimentoId: payload.atendimentoId,
                sessaoId: uuidv4(),
                sessaoPassword: generatePassword(),
                situacao: 1,
                sessaoIdZoom: null
            };

            await teleAtendimentoRepository.incluir(teleAtendimento);

            const url = `${config.meeting.url}/tele-atendimento/${teleAtendimento.sessaoId}/${teleAtendimento.sessaoPassword}/1/${payload.perfil}`;

            res.json({ url: url });
        }
        catch (exception) {
            res.status(500).send(util.customError(errors, "header", "Ocorreu um erro inesperado " + exception, ""));
        }
        finally {
            await connection.close();
        }
    });


    app.post('/tele-atendimento/webhook', async function (request, response) {
        const { event, payload } = request.body;

        console.log(`Received Zoom Webhook Event: ${event}`);
        console.log(payload);

        if (event === 'endpoint.url_validation') {
            const hashForValidate = crypto.createHmac('sha256', config.zoomConfig.zoomWebhookSecret)
                .update(payload.plainToken)
                .digest('hex');

            return response.status(200).json({
                plainToken: payload.plainToken,
                encryptedToken: hashForValidate
            });
        }

        const connection = await app.dao.connections.EatendConnection.connection();
        const util = new app.util.Util();

        try{
            const teleAtendimentoRepository = new app.dao.TeleAtendimentoDAO(connection);

            const teleAtendimento = await teleAtendimentoRepository.obterPorSessaoId(payload.object.session_name);
            if(!teleAtendimento){
                return response.status(200).json({});
                return;
            }

            teleAtendimento.sessaoIdZoom = payload.object.session_id;
            if(event == 'session.started'){
                teleAtendimento.situacao = 3;
            }
            if (event == 'session.ended') {
                teleAtendimento.situacao = 4;
            }
            if(event == 'session.recording_completed'){
                teleAtendimento.situacao = 5;
            }

            await teleAtendimentoRepository.atualizar(teleAtendimento);

            return response.status(200).json({});
        }
        catch (exception) {
            response.status(500).send(util.customError([], "header", "Ocorreu um erro inesperado " + exception, ""));
        }
        finally {
            await connection.close();
        }
    });
};

/**
 * Gera um número aleatório
 * @param {number} [length=6] - Quantidade de caracteres do numero
 * @returns {string} O numero gerado
 */
function generatePassword(length = 6) {
    const characters = '0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return password;
}
