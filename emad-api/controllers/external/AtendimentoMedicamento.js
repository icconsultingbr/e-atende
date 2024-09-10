const ApiResponse = require('../../utilities/ApiResponse');
const connections = require('../../dao/connections/EatendConnection');
const AtendimentoMedicamentoDAO = require ('../../dao/AtendimentoMedicamentoDAO');
const {connection} = connections()
const AtendimentoMedicamentoRepository = AtendimentoMedicamentoDAO()
class AtendimentoMedicamentoExternoController{

    async obterAtendimentoPorAtendimentoId(req, res, app){
      const id = req.params.id;
      const conn = await connection();
      try{
        const atendimentoMedicamentoRepository = new AtendimentoMedicamentoRepository(conn);
        console.log('AtendimentoMedicamentoExternoController.obterAtendimentoPorAtendimentoId - id:', id);
        const response = await atendimentoMedicamentoRepository.buscaPorAtendimentoIdAsync(id);
        console.log('AtendimentoMedicamentoExternoController.obterAtendimentoPorAtendimentoId - response:', response);
        if(!response){
          return ApiResponse.notFound(res, 'Atendimento Medicamento não encontrado');
        }
        return ApiResponse.ok(res, response);
      } finally {
        await conn.close();
      }
    }

}
module.exports ={ AtendimentoMedicamentoExternoController }
