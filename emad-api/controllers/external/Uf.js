const ApiResponse = require('../../utilities/ApiResponse');
const connections = require('../../dao/connections/EatendConnection');
const UfDAO = require ('../../dao/UfDAO');
const {connection} = connections()
const UfRepository = UfDAO()
class UfExternoController {

    async carregaNaturalidadePorNacionalidade(req, res, app){
      console.log('carregaNaturalidadePorNacionalidade ==> ', req.params.id);
      const conn = await connection();
      try{
        const ufRepository = new UfRepository(conn);
        const response = await ufRepository.buscaPorPaisIdAsync(req.params.id);
        if(!response){
          return ApiResponse.notFound(res, "Uf não encontrado")
        }
        return ApiResponse.ok(res, response);
      }
      finally{
        await conn.close();
      }
    }

}
module.exports ={ UfExternoController }
