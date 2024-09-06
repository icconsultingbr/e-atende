const ApiResponse = require('../../utilities/ApiResponse');
const connections = require('../../dao/connections/EatendConnection');
const AtendimentoDAO = require ('../../dao/AtendimentoDAO');
const {connection} = connections()
const AtendimentoRepository = AtendimentoDAO()
class AtendimentoExternoController{

    async obterSinaisVitaisPorPacienteId(req, res, app){
      const id = req.params.id;
      const tipo = req.params.tipo;
      const conn = await connection();
      try{
        const atendimentoRepository = new AtendimentoRepository(conn);
        const response = await atendimentoRepository.buscaSinaisVitaisPorPacienteId(id,tipo,0,0);
        if(!response){
          return ApiResponse.notFound(res, 'Atendimento não encontrado');
        }
        return ApiResponse.ok(res, response);
      } finally {
        await conn.close();
      }
    }

}
module.exports ={ AtendimentoExternoController }
