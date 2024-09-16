const ApiResponse = require('../../utilities/ApiResponse');
const connections = require('../../dao/connections/EatendConnection');
const ProfissionalDAO = require ('../../dao/ProfissionalDAO');
const {connection} = connections()
const ProfissionalRepository = ProfissionalDAO()
class ProfissionalExternoController{

    async profissionalPorEstabelecimento(req, res, app){
      const id = req.params.id;
      const conn = await connection();
      try{
        const atendimentoRepository = new ProfissionalRepository(conn);
        const response = await atendimentoRepository.buscarPorEstabelecimentoAsync(id);
        if(!response){
          return ApiResponse.notFound(res, 'Atendimento não encontrado');
        }
        return ApiResponse.ok(res, response);
      } finally {
        await conn.close();
      }
    }

}
module.exports ={ ProfissionalExternoController }
