const ApiResponse = require('../../utilities/ApiResponse');
const connections = require('../../dao/connections/EatendConnection');
const AtendimentoProcedimentoDAO = require ('../../dao/AtendimentoProcedimentoDAO');
const {connection} = connections()
const AtendimentoProcedimentoRepository = AtendimentoProcedimentoDAO()
class AtendimentoProcedimentoExternoController{

    async obterListaPacienteId(req, res, app){
      const id = req.params.id;
      const conn = await connection();
      try{
        const atendimentoRepository = new AtendimentoProcedimentoRepository(conn);
        const response = await atendimentoRepository.listarPorPaciente(id,0,0);
        if(!response){
          return ApiResponse.notFound(res, 'Atendimento não encontrado');
        }
        return ApiResponse.ok(res, response);
      } finally {
        await conn.close();
      }
    }
    async obterPorAtendimentoId(req, res, app){
      const id = req.params.id;
      const conn = await connection();
      try{
        const atendimentoRepository = new AtendimentoProcedimentoRepository(conn);
        const response = await atendimentoRepository.buscarPorAtendimentoId(id);
        if(!response){
          return ApiResponse.notFound(res, 'Atendimento Procedimento não encontrado');
        }
        return ApiResponse.ok(res, response);
      } finally {
        await conn.close();
      }
    }

}
module.exports ={ AtendimentoProcedimentoExternoController }
