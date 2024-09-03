const ApiResponse = require('../../utilities/ApiResponse');
const connections = require('../../dao/connections/EatendConnection');
const PacienteDAO = require ('../../dao/PacienteDAO');
const {connection} = connections()
const PacienteRepository = PacienteDAO()
class PacienteExternoController{

    async obterPacienteIdPortIdSap(req, res, app){
      const conn = await connection();
      const pacienteRepository = new PacienteRepository(conn);
      var response = await pacienteRepository.buscaPorIdSap(req.idSap);
      console.log('PACIENTE ENCONTRADO', response);
      return ApiResponse.ok(res, response.id);
    }

}
module.exports ={ PacienteExternoController }
