const ApiResponse = require('../../utilities/ApiResponse');
const connections = require('../../dao/connections/EatendConnection');
const ExameDAO = require ('../../dao/ExameDAO');
const {connection} = connections()
const ExameRepository = ExameDAO()
class ExameExternoController{

    async obterExamePorPacienteId(req, res, app){
      const id = req.params.id;
      const conn = await connection();
      try{
        const exameRepository = new ExameRepository(conn);
        const response = await exameRepository.buscaPorPacienteId(id);
        if(!response){
          return ApiResponse.notFound(res, 'Atendimento não encontrado');
        }
        return ApiResponse.ok(res, response);
      } finally {
        await conn.close();
      }
    }

}
module.exports ={ ExameExternoController }
