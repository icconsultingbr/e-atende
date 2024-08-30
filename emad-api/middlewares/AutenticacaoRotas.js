const config = require('../config/config');
const WebToken = require('../utilities/WebToken');
const ApiResponse = require('../utilities/ApiResponse');

module.exports = function (app) {
  app.use(function (req, res, next) {
    var host = req.headers['host'];
    var token = req.headers.authorization;
    let errors = [];

    if (!token) {
      errors = [];
      errors = customError(errors, "header", "Não autorizado", "");

      return ApiResponse.unhoutorized(res, errors)
    }

    try {
      const decoded = WebToken.verify(token, app.settings.superSecret)

      req.usuario = decoded.usuario;

      next()
    } catch (error) {
      errors = [];
      errors = customError(errors, "header", "Não autorizado", "");

      return ApiResponse.unhoutorized(res, errors)
    }


    // -------------------------------------
    buscaUsuario(req.usuario).then(function (response) {
      if (response.length > 0) {
        if (host != decoded.host) {
          errors = [];
          errors = customError(errors, "header", "Não autorizado, origem diferente.", "");
          return res.status(401).json(errors);
        }
        if (response[0].token != req.headers.authorization) {
          errors = [];
          errors = customError(errors, "header", "Não autorizado", "");
          return res.status(401).json(errors);
        }
        if(response[0].diff >= 60){
          errors = [];
          errors = customError(errors, "header", "Tempo de ociosidade", "");
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
        errors = customError(errors, "header", "Não autorizado", "");
        return res.status(401).json(errors);
      }

      next();
    });
  })


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
    const q = require('q');
    const d = q.defer();

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
}
