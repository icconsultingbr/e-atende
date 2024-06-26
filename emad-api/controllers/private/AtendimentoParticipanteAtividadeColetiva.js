module.exports = function (app) {

    const _table = "tb_atividade_coletiva_participantes";

    app.post('/participante-atividade-coletiva', async function (req, res) {
        var obj = req.body;
        var util = new app.util.Util();
        var errors = [];

        delete obj.nomePaciente;
        delete obj.sexo;
        delete obj.cartaoSus;
        delete obj.dataNascimento;

        const connection = await app.dao.connections.EatendConnection.connection();
        const AtendimentoParticipanteAtividadeColetivaRepository = new app.dao.AtendimentoParticipanteAtividadeColetivaDAO(connection);
        const atendimentoRepository = new app.dao.AtendimentoDAO(connection);
        const pacienteRepository = new app.dao.PacienteDAO(connection);

        try {            

            var buscaAtendimento = await atendimentoRepository.buscaPorIdSync(obj.idAtendimento);            

            //validar se os participantes possuem CPF e CNS
            if(buscaAtendimento.atividadeTipo == 5 || buscaAtendimento.atividadeTipo == 6){

                let paciente = await pacienteRepository.buscaPorIdSync(obj.idPaciente);

                if (!paciente[0].cpf && !paciente[0].cns) {
                    errors = util.customError(errors, "header", "Para tipo de atividade 'Atendimento em grupo' ou 'Avaliação / Procedimento coletivo', é necessário que o paciente possua CPF ou CNS cadastrado.", "");
                    res.status(400).send(errors);
                    return;
                }

            }  
            await connection.beginTransaction();

            let response = await AtendimentoParticipanteAtividadeColetivaRepository.salvaSync(obj);

            res.status(201).send(obj);

            await connection.commit();
        }
        catch (exception) {
            console.log("Erro ao salvar o participante (" + obj.nome + "), exception: " + exception);
            res.status(500).send(util.customError(errors, "header", "Ocorreu um erro inesperado", ""));
            await connection.rollback();
        }
        finally {
            await connection.close();
        }
    });


    app.get('/participante-atividade-coletiva/atendimento/:id', function (req, res) {
        let usuario = req.usuario;
        let id = req.params.id;
        let util = new app.util.Util();
        let errors = [];

        buscarPorAtendimentoId(id, res).then(function (response) {
            res.status(200).json(response);
            return;
        });
    });

    app.delete('/participante-atividade-coletiva/:id', function (req, res) {
        let id = req.params.id;
        let obj = {};
        obj.id = id;

        deletaPorId(id, res).then(function (response) {
            res.status(200).json(obj);
            return;
        });
    });

    app.put('/participante-atividade-coletiva', function (req, res) {
        let obj = req.body;
        let errors = [];
        let id = obj.id;

        errors = req.validationErrors();

        delete obj.nomePaciente;
        delete obj.sexo;
        delete obj.cartaoSus;
        delete obj.dataNascimento;

        if (errors) {
            res.status(400).send(errors);
            return;
        }
        atualizaPorId(obj, id, res).then(function (response) {
            id = id;
            res.status(201).send(obj);
        });
    });

    function buscarPorAtendimentoId(id, res) {
        let q = require('q');
        let d = q.defer();
        let util = new app.util.Util();

        let connection = app.dao.ConnectionFactory();
        let objDAO = new app.dao.AtendimentoParticipanteAtividadeColetivaDAO(connection, _table);
        let errors = [];

        objDAO.buscaPorAtendimentoId(id, function (exception, result) {
            if (exception) {
                d.reject(exception);
                console.log(exception);
                errors = util.customError(errors, "data", "Erro ao acessar os dados", "obj");
                res.status(500).send(errors);
                return;
            } else {

                d.resolve(result);
            }
        });
        return d.promise;
    }

    function salvar(obj, res) {
        delete obj.id;
        let connection = app.dao.ConnectionFactory();
        let objDAO = new app.dao.GenericDAO(connection, _table);
        let q = require('q');
        let d = q.defer();

        objDAO.salva(obj, function (exception, result) {
            if (exception) {
                console.log('Erro ao inserir', exception);
                res.status(500).send(exception);
                d.reject(exception);
                return;
            }
            else {
                d.resolve(result);
            }
        });
        return d.promise;
    }

    function deletaPorId(id, res) {
        let q = require('q');
        let d = q.defer();
        let util = new app.util.Util();
        let connection = app.dao.ConnectionFactory();
        let objDAO = new app.dao.AtendimentoParticipanteAtividadeColetivaDAO(connection, _table);
        let errors = [];

        objDAO.deletaPorId(id, function (exception, result) {
            if (exception) {
                d.reject(exception);
                errors = util.customError(errors, "data", "Erro ao remover os dados", "obj");
                res.status(500).send(errors);
                return;
            } else {
                d.resolve(result[0]);
            }
        });
        return d.promise;

    }

    function atualizaPorId(obj, id, res) {

        var q = require('q');
        var d = q.defer();
        var util = new app.util.Util();

        var connection = app.dao.ConnectionFactory();
        var objDAO = new app.dao.AtendimentoParticipanteAtividadeColetivaDAO(connection);
        var errors = [];

        objDAO.atualizaPorId(obj, id, function (exception, result) {

            if (exception) {
                d.reject(exception);
                console.log(exception);
                errors = util.customError(errors, "data", "Erro ao editar os dados", "Atribuição da caneta");
                res.status(500).send(errors);
                return;
            } else {
                d.resolve(result[0]);
            }
        });
        return d.promise;
    }
}

