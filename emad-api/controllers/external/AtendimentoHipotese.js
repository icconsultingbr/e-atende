const ApiResponse = require('../../utilities/ApiResponse');
const connections = require('../../dao/connections/EatendConnection');
const AtendimentoHipoteseDAO = require ('../../dao/AtendimentoHipoteseDiagnosticaDAO');
const {connection} = connections()
const AtendimentoHipoteseRepository = AtendimentoHipoteseDAO()
class AtendimentoHipoteseExternoController{

    async obterPacientePorId(req, res, app){
      const id = req.params.id;
      const conn = await connection();
      try{
        const atendimentoHipoteseRepository = new AtendimentoHipoteseRepository(conn);
        const response = await atendimentoHipoteseRepository.listarPorPaciente(id,0,0);
        if(!response){
          return ApiResponse.notFound(res, "Atendimento Hipotese não encontrado")
        }
        return ApiResponse.ok(res, response.id);
      } finally {
        await conn.close();
      }
    }
    async obterPacienteAgrupadoPorId(req, res, app){
      const id = req.params.id;
      const conn = await connection();
      try{
        const atendimentoHipoteseRepository = new AtendimentoHipoteseRepository(conn);
        const response = await atendimentoHipoteseRepository.listarPorPacienteAgrupada(id);
        if(!response){
          return ApiResponse.notFound(res, "Atendimento Hipotese não encontrado")
        }
        return ApiResponse.ok(res, response);
      } finally {
        await conn.close();
      }
    }

}
module.exports ={ AtendimentoHipoteseExternoController }
