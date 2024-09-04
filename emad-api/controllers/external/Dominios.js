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
const DominiosHipoteseDiagnosticaRepository = require ('../../dao/HipoteseDiagnosticaDAO');
const DominiosUfRepository = UfDAO()
const DominiosTipoUnidadeRepository = TipoUnidadeDAO()
const DominiosNacionalidadeRepository = NacionalidadeDAO()
const DominiosModalidadeRepository = ModalidadeDAO()
const DominiosEstabelecimentoRepository = EstabelecimentoDAO()
const DominiosGenericRepository = GenericDAO()
//fazer escolaridade
const RacaRepository = RacaDAO()
const HipoteseDiagnosticaRepository = DominiosHipoteseDiagnosticaRepository()

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
      dominiosUfRepository.dominio((exception, result)=>{
        console.log('RESPONSE UF',result)
        console.log('exception UF',exception)
        ApiResponse.ok(res, result)
      })
    }

    async listaDominiosTipoUnidade(req, res, app){
      const conn = await connection();
      const dominiosTipoUnidadeRepository = new DominiosTipoUnidadeRepository(conn);
      dominiosTipoUnidadeRepository.dominio((exception, result)=>{
        console.log('RESPONSE TIPO UNIDADE',result)
        console.log('exception TIPO UNIDADE',exception)
        ApiResponse.ok(res, result)
      })
    }
    async listaNacionalidade(req, res, app){
      const conn = await connection();
      const dominiosNacionalidadeRepository = new DominiosNacionalidadeRepository(conn);
      dominiosNacionalidadeRepository.dominio((exception, result)=>{
        console.log('RESPONSE NACIONALIDADE',result)
        console.log('exception NACIONALIDADE',exception)
        ApiResponse.ok(res, result)
      })
    }
    async listaModalidade(req, res, app){
      const conn = await connection();
      const dominiosModalidadeRepository = new DominiosModalidadeRepository(conn);
      dominiosModalidadeRepository.dominio((exception, result)=>{
        console.log('RESPONSE MODALIDADE',result)
        console.log('exception MODALIDADE',exception)
        ApiResponse.ok(res, result)
      })
    }
    async listaEstabelecimento(req, res, app){
      const conn = await connection();
      const dominiosEstabelecimentoRepository = new DominiosEstabelecimentoRepository(conn);
      dominiosEstabelecimentoRepository.dominio((exception, result)=>{
        console.log('RESPONSE ESTABELECIMENTO',result)
        console.log('exception ESTABELECIMENTO',exception)
        ApiResponse.ok(res, result)
      })
    }
    async listaEscolaridade(req, res, app){
      const conn = await connection();
      const dominiosGenericRepository = new DominiosGenericRepository(conn, "tb_escolaridade");
      dominiosGenericRepository.dominio((exception, result)=>{
        console.log('RESPONSE ESCOLARIDADE',result)
        console.log('exception ESCOLARIDADE',exception)
        ApiResponse.ok(res, result)
      })
    }
    async listaRaca(req, res, app){
      const conn = await connection();
      const dominiosRacaRepository = new RacaRepository(conn);
      dominiosRacaRepository.dominio((exception, result)=>{
        console.log('RESPONSE RAÇA',result)
        console.log('exception RAÇA',exception)
        ApiResponse.ok(res, result)
      })
    }
    async listaHipoteseDiagnostica(req, res, app){
      const conn = await connection();
      const dominiosHipoteseDiagnosticaRepository = new HipoteseDiagnosticaRepository(conn);
      dominiosHipoteseDiagnosticaRepository.dominio((exception, result)=>{
        console.log('RESPONSE DIAGNOSTICO',result)
        console.log('exception DIAGNOSTICO',exception)
        ApiResponse.ok(res, result)
      })
    }
}
module.exports ={ DominiosExternoController }
