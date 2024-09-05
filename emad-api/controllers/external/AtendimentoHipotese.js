const ApiResponse = require('../../utilities/ApiResponse');
const connections = require('../../dao/connections/EatendConnection');
const AtendimentoHipoteseDAO = require ('../../dao/AtendimentoHipoteseDiagnosticaDAO');
const {connection} = connections()
const AtendimentoHipoteseRepository = AtendimentoHipoteseDAO()
class AtendimentoHipoteseExternoController{

    async obterPacientePorId(req, res, app){
      let id = req.params.id;

      const conn = await connection();
      const atendimentoHipoteseRepository = new AtendimentoHipoteseRepository(conn);
      var response = await atendimentoHipoteseRepository.listarPorPaciente(id,0,0);
      console.log('ATENDIMENTO HIPOTESE !', response);
      return ApiResponse.ok(res, response.id);
    }
    async obterPacienteAgrupadoPorId(req, res, app){
      let id = req.params.id;

      const conn = await connection();
      const atendimentoHipoteseRepository = new AtendimentoHipoteseRepository(conn);
      var response = await atendimentoHipoteseRepository.listarPorPacienteAgrupada(id);
      console.log('ATENDIMENTO HIPOTESE !', response);
      return ApiResponse.ok(res, response.id);
    }

}
module.exports ={ AtendimentoHipoteseExternoController }
