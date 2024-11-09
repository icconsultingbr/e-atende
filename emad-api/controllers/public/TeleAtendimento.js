const {
    inNumberArray,
    isBetween,
    isLengthLessThan,
    isRequired,
    matchesStringArray,
    validateRequest
} = require('../../util/ZoomValidations');

const KJUR = require('jsrsasign');
const { toStringArray } = require('../../util/ZoomUtil');
const config = require('../../config/config');

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

// Helper function to coerce body values
const coerceRequestBody = (body) => ({
    ...body,
    ...['role', 'expirationSeconds', 'cloudRecordingOption', 'cloudRecordingElection', 'audioCompatibleMode']
        .reduce((acc, cur) => ({ ...acc, [cur]: typeof body[cur] === 'string' ? parseInt(body[cur]) : body[cur] }), {})
});

// Helper to join geoRegions array
const joinGeoRegions = function(geoRegions) { 
    const value = toStringArray(geoRegions);
    return value ? value.join(',') : '';
}

// JWT Creation Helper
const createZoomJwt = (payload) => {
    const header = { alg: 'HS256', typ: 'JWT' };
    try {
        const sHeader = JSON.stringify(header);
        const sPayload = JSON.stringify(payload);
        return KJUR.jws.JWS.sign('HS256', sHeader, sPayload, config.zoomConfig.videoSDKSecret);
    } catch (error) {
        console.error("Error creating JWT:", error);
        throw new Error("JWT generation failed");
    }
};

// Route function
module.exports = function (app) {

    app.post('/tele-atendimento/auth', (req, res) => {
        const requestBody = coerceRequestBody(req.body);
        const validationErrors = validateRequest(requestBody, validator);

        if (validationErrors.length > 0) {
            return res.status(400).json({ errors: validationErrors });
        }

        const {
            role,
            sessionName,
            expirationSeconds,
            userIdentity,
            sessionKey,
            geoRegions,
            cloudRecordingOption,
            cloudRecordingElection,
            audioCompatibleMode
        } = requestBody;

        const iat = Math.floor(Date.now() / 1000);
        const exp = expirationSeconds ? iat + expirationSeconds : iat + 60 * 60 * 2;

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

        try {
            const sdkJWT = createZoomJwt(payload);
            return res.json({ signature: sdkJWT });
        } catch (error) {
            return res.status(500).json({ error: "Failed to create signature" });
        }
    });

    app.get('/tele-atendimento/:id/:pw', async (req, res) => {
        let usuario = req.usuario;
        let util = new app.util.Util();
        let id = req.params.id;
        let errors = [];

        //const connection = await app.dao.connections.EatendConnection.connection();

        try {
            //const atendimentoRepository = new app.dao.AtendimentoDAO(connection);

            //const response = await atendimentoRepository.buscaHistoricoPorAtendimento(id);

            const response = {
                "atendimentoId": 12345,
                "sessionId": "12345",
                "": req.params.pw
            }

            // sessionName: string = '';
            // userName: string = '';
            // password: string = '';
            // role: number = 0;
            // config: any;

            
            res.status(200).json(response);
        }
        catch (exception) {
            errors = util.customError(errors, "data", "Erro ao acessar os dados", "objs");
            res.status(500).send(errors);
        }
        finally {
            // await connection.close();
        }
    });
};
