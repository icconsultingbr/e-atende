const ApiResponse = require('../../utilities/ApiResponse');
const connections = require('../../dao/connections/EatendConnection');
const PacienteDocumentoDAO = require ('../../dao/PacienteDocumentoDAO');
const {connection} = connections()
const PacienteDocumentoRepository = PacienteDocumentoDAO()
class PacienteDocumentoExternoController{

    async obterPacientePorId(req, res, app){
      let id = req.params.id;
      console.log('ID ==>',id);

      const conn = await connection();
      try{

        const pacienteDocumentoRepository = new PacienteDocumentoRepository(conn);
        let items = [];
        items = await pacienteDocumentoRepository.buscaPorIdPaciente(id);
        console.log('ITEMS ==>',items);
        for (const itemfile of items) {
          const fs = require('fs');
          if(fs.existsSync(itemfile.caminho)){
            itemfile.base64 = fs.readFileSync(itemfile.caminho, { encoding: 'base64' });
          }
        }
        return ApiResponse.ok(res, items);
      } finally {
        await conn.close();
      }
    }
    }
module.exports ={ PacienteDocumentoExternoController }
