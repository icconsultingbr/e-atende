const ApiResponse = require('../../utilities/ApiResponse');
const connections = require('../../dao/connections/EatendConnection');
const AtendimentoEncaminhamentoDAO = require ('../../dao/AtendimentoEncaminhamentoDAO');
const {connection} = connections()
const AtendimentoEncaminhamentoRepository = AtendimentoEncaminhamentoDAO()
class AtendimentoEncaminhamentoExternoController{

    async obterPorAtendimentoId(req, res, app){
      const id = req.params.id;
      const conn = await connection();
      try{
        const atendimentoEncaminhamentoRepository = new AtendimentoEncaminhamentoRepository(conn);
        const response = await atendimentoEncaminhamentoRepository.buscaPorAtendimentoIdAsync(id);
        if(!response){
          return ApiResponse.notFound(res, 'Atendimento encaminhamento não encontrado');
        }
        return ApiResponse.ok(res, response);
      } finally {
        await conn.close();
      }
    }

}
module.exports ={ AtendimentoEncaminhamentoExternoController }
