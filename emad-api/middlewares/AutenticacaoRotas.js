const config = require('../config/config');
const { externalSecret } = require('../config/config.json');
const WebToken = require('../utilities/WebToken');

module.exports = function (app) {

    app.use(function (req, res, next) {

        var ip = req.headers['X-Forwarded-For'] || req.connection.remoteAddress;

        var userAgent = req.headers['user-agent'];
        var host = req.headers['Host'];
        var token = req.headers.authorization;
        let errors = [];

        if (token) {
          WebToken.verify(token, req.originalUrl.includes('external') ? externalSecret : app.settings.superSecret, function (err, decoded) {
                if (err) {
                    var datetime = new Date();
                    console.log('Erro token do usuário: ' + req.usuario + ', at: ' + datetime + ', token: ' + token);
                    console.log(err);
                    errors = [];
                    errors = customError(errors, "header", "Não autorizado", "1");
                    return res.status(401).json(errors);
                } else {
                    req.usuario = decoded.usuario;
                    if(decoded.usuario){
                    buscaUsuario(decoded.usuario).then(function (response) {
                        if (response.length > 0) {

                            //if (host != decoded.host || ip != decoded.ip) {
                            if (host != decoded.host) {
                                errors = [];
                                //errors = customError(errors, "header", "Não autorizado, IP, host ou user-agent estão diferentes", "");
                                errors = customError(errors, "header", "Não autorizado, origem diferente.", "2");
                                return res.status(401).json(errors);
                            }
                            if (response[0].token != req.headers.authorization) {
                                errors = [];
                                errors = customError(errors, "header", "Não autorizado", "3");
                                return res.status(401).json(errors);
                            }
                            if(response[0].diff >= 60){
                                errors = [];
                                errors = customError(errors, "header", "Tempo de ociosidade", "4");
                                return res.status(401).json(errors);
                            }
                            if(req.usuario.id === config.idUsuarioIntegracao &&
                                (
                                    ["atendimento", "finalizar"].some(el => !req.url.includes(el)) &&
                                    ["paciente", "transferencia-unidade"].some(el => !req.url.includes(el)) &&
                                    ["paciente"].some(el => !req.url.includes(el))
                                )){
                                errors = customError(errors, "header", "Acesso negado", "");
                                return res.status(403).json(errors);
                            }
                        }
                        else {
                            errors = customError(errors, "header", "Não autorizado", "5");
                            return res.status(401).json(errors);
                        }
                        if (req.url == '/usuario/redefinir-senha') {

                            let obj = {
                                "headers" : {
                                    "est" : (req.headers.est ? req.headers.est : null)
                                },
                                "url" : req.url,
                                "method" : req.method,
                                "body" : {
                                    "senhaAtual" : '********',
                                    "novaSenha" : '********',
                                    "confirmarNovaSenha" : '********',
                                },
                                "usuario" : {
                                   "id" :  req.usuario.id
                                }
                            };
                        }
                        next();
                    });
                  } else {
                    next();
                  }
                }
            });
        } else {
            errors = [];

            errors = customError(errors, "header", "Não autorizado", "6");
            return res.status(401).json(errors);
        }
    });

    app.use(function (err, req, res, next) {
        if (err) {
            console.log(err);
            res.status(404).send(err);
        }
        next()
    });

    function customError(errors, field, message, value) {
        if (errors == false) {
            errors = [];
        }

        var error = {};
        error.location = "body";
        error.param = field;
        error.msg = message;
        error.value = value;
        errors.push(error);
        return errors;
    }

    function buscaUsuario(usuario) {
        let q = require('q');
        let d = q.defer();
        let connection = app.dao.ConnectionFactory();
        let usuarioDAO = new app.dao.UsuarioDAO(connection);
        usuarioDAO.buscaUsuario(usuario, function (exception, result) {
            if (exception) {
                d.reject(exception);
            } else {
                d.resolve(result);
            }
        });
        return d.promise;
    }


    function addLog(req) {

        let q = require('q');
        let d = q.defer();

        let object = {};

        object.dataCriacao = new Date();
        object.idUsuario = (req.usuario ? req.usuario.id : null);
        object.acao = req.method;
        object.funcionalidade = req.url;
        object.entrada = JSON.stringify(req.body);
        object.idEstabelecimento = (req.headers.est ? req.headers.est : null);


        let connection = app.dao.ConnectionFactory();
        let objectDAO = new app.dao.LogDAO(connection);
        objectDAO.salva(object, function (exception, result) {
            if (exception) {
                console.log(exception);
                d.reject(exception);
            } else {
                d.resolve(result);
            }
        });
        return d.promise;

    }

    function addActivity(req) {

        let q = require('q');
        let d = q.defer();

        let connection = app.dao.ConnectionFactory();
        let objectDAO = new app.dao.UsuarioDAO(connection);
        objectDAO.addActivity(req.usuario.id, function (exception, result) {
            if (exception) {
                console.log(exception);
                d.reject(exception);
            } else {
                d.resolve(result);
            }
        });
        return d.promise;

    }
}
