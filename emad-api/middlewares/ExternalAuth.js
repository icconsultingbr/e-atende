const WebToken = require('../utilities/WebToken');
const ApiResponse = require('../utilities/ApiResponse');
const {externalSecret} = require("../config/config.json")

function externalAuth(req, res, next) {
  const token = req.headers.authorization;

  if(!token){
    return ApiResponse.unhoutorized(res, "Token não informado");
  }

  try {
    const decoded = WebToken.verify(token, externalSecret);
    req.idSap = decoded.idSap;

    next();
  } catch (error) {
    console.log('Erro token do usuário: ', error);
    return ApiResponse.unhoutorized(res, "Token inválido");
  }
}

module.exports ={
  externalAuth
}
