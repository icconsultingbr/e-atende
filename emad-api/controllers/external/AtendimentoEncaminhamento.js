const ApiResponse = require('../../utilities/ApiResponse');
const connections = require('../../dao/connections/EatendConnection');
const AtendimentoEncaminhamentoDAO = require ('../../dao/AtendimentoEncaminhamentoDAO');
const {connection} = connections()
const AtendimentoEncaminhamentoRepository = AtendimentoEncaminhamentoDAO()
class AtendimentoEncaminhamentoExternoController{

    async obterAtendimentoPorAtendimentoId(req, res, app){
      const id = req.params.id;
      const conn = await connection();
      try{
        const atendimentoMedicamentoRepository = new AtendimentoEncaminhamentoRepository(conn);
        const response = await atendimentoMedicamentoRepository.buscaPorAtendimentoIdAsync(id);
        if(!response){
          return ApiResponse.notFound(res, 'Atendimento Enncaminhamento não encontrado');
        }
        return ApiResponse.ok(res, response);
      } finally {
        await conn.close();
      }
    }

}
module.exports ={ AtendimentoEncaminhamentoExternoController }
