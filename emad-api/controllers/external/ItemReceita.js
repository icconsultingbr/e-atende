const ApiResponse = require('../../utilities/ApiResponse');
const connections = require('../../dao/connections/EatendConnection');
const ItemReceitaDAO = require ('../../dao/ItemReceitaDAO');
const {connection} = connections()
const ItemReceitaRepository = ItemReceitaDAO()
class ItemReceitaExternoController{

    async obterListaReceitaPorId(req, res, app){
      const id = req.params.id;
      const conn = await connection();
      try{
        const itemReceitaRepository = new ItemReceitaRepository(conn);
        const response = await itemReceitaRepository.buscarPorReceita(id);
        if(!response){
          return ApiResponse.notFound(res, 'Atendimento não encontrado');
        }
        return ApiResponse.ok(res, response);
      } finally {
        await conn.close();
      }
    }

}
module.exports ={ ItemReceitaExternoController }
