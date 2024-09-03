const ApiResponse = require('../../utilities/ApiResponse');
const connections = require('../../dao/connections/EatendConnection');
const {connection} = connections()
const UfDAO = require ('../../dao/UfDAO');
const TipoUnidadeDAO = require ('../../dao/TipoUnidadeDAO');
const NacionalidadeDAO = require ('../../dao/NacionalidadeDAO');
const ModalidadeDAO = require ('../../dao/ModalidadeDAO');
const EstabelecimentoDAO = require ('../../dao/EstabelecimentoDAO');
const RacaDAO = require ('../../dao/RacaDAO');
const GenericDAO = require ('../../dao/GenericDAO');
const DominiosUfRepository = UfDAO()
const DominiosTipoUnidadeRepository = TipoUnidadeDAO()
const DominiosNacionalidadeRepository = NacionalidadeDAO()
const DominiosModalidadeRepository = ModalidadeDAO()
const DominiosEstabelecimentoRepository = EstabelecimentoDAO()
const DominiosGenericRepository = GenericDAO()
//fazer escolaridade
const RacaRepository = RacaDAO()

class DominiosExternoController{

  // async listaDominios(req, res, app){
  //   const domicioEspecifico = req.query.dominio;
  //   console.log('domínio espec[ifico',domicioEspecifico)
  //   const conn = await connection();

  //   const dominiosRepository = new DominiosUfRepository(conn);
  //   var response = await dominiosRepository.dominio(dominiosRepository,domicioEspecifico, res)
  //   console.log(response)
  //   ApiResponse.ok(res, response)
  //   return
  // }
    async listaDominiosUf(req, res, app){
      const conn = await connection();
      const dominiosUfRepository = new DominiosUfRepository(conn);
      dominiosUfRepository.dominio(response=>{
        console.log('RESPONSE UF',response)
        ApiResponse.ok(res, response)
      })
    }

    async listaDominiosTipoUnidade(req, res, app){
      const conn = await connection();
      const dominiosTipoUnidadeRepository = new DominiosTipoUnidadeRepository(conn);
      dominiosTipoUnidadeRepository.dominio(response=>{
        console.log('RESPONSE TIPO UNIDADE',response)
        ApiResponse.ok(res, response)
      })
    }
    async listaNacionalidade(req, res, app){
      const conn = await connection();
      const dominiosNacionalidadeRepository = new DominiosNacionalidadeRepository(conn);
      dominiosNacionalidadeRepository.dominio(response=>{
        console.log('RESPONSE NACIONALIDADE',response)
        ApiResponse.ok(res, response)
      })
    }
    async listaModalidade(req, res, app){
      const conn = await connection();
      const dominiosModalidadeRepository = new DominiosModalidadeRepository(conn);
      dominiosModalidadeRepository.dominio(response=>{
        console.log('RESPONSE MODALIDADE',response)
        ApiResponse.ok(res, response)
      })
    }
    async listaEstabelecimento(req, res, app){
      const conn = await connection();
      const dominiosEstabelecimentoRepository = new DominiosEstabelecimentoRepository(conn);
      dominiosEstabelecimentoRepository.dominio(response=>{
        console.log('RESPONSE ESTABELECIMENTO',response)
        ApiResponse.ok(res, response)
      })
    }
    async listaEscolaridade(req, res, app){
      const conn = await connection();
      const dominiosGenericRepository = new DominiosGenericRepository(conn, "tb_escolaridade");
      dominiosGenericRepository.dominio(response=>{
        console.log('RESPONSE ESCOLARIDADE',response)
        ApiResponse.ok(res, response)
      })
    }
    async listaRaca(req, res, app){
      const conn = await connection();
      const dominiosRacaRepository = new RacaRepository(conn);
      dominiosRacaRepository.dominio(response=>{
        console.log('RESPONSE RACA',response)
        ApiResponse.ok(res, response)
      })
    }
}
module.exports ={ DominiosExternoController }
