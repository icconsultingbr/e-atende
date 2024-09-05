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
const DominiosHipoteseDiagnosticaDAO = require ('../../dao/HipoteseDiagnosticaDAO');
const TipoFichaDAO = require ('../../dao/TipoFichaDAO');
const DominiosUfRepository = UfDAO()
const DominiosTipoUnidadeRepository = TipoUnidadeDAO()
const DominiosNacionalidadeRepository = NacionalidadeDAO()
const DominiosModalidadeRepository = ModalidadeDAO()
const DominiosEstabelecimentoRepository = EstabelecimentoDAO()
const DominiosGenericRepository = GenericDAO()
const RacaRepository = RacaDAO()
const HipoteseDiagnosticaRepository = DominiosHipoteseDiagnosticaDAO()
const TipoFichaRepository = TipoFichaDAO()

class DominiosExternoController {
  async listaDominiosUf(req, res, app) {
      const conn = await connection();
      const dominiosUfRepository = new DominiosUfRepository(conn);
      dominiosUfRepository.dominio((exception, result) => {
          console.log('RESPONSE UF', result);
          console.log('exception UF', exception);
          if (exception) {
              return ApiResponse.serverError(res, exception);
          }
          return ApiResponse.ok(res, result);
      });
  }

  async listaDominiosTipoUnidade(req, res, app) {
      const conn = await connection();
      const dominiosTipoUnidadeRepository = new DominiosTipoUnidadeRepository(conn);
      dominiosTipoUnidadeRepository.dominio((exception, result) => {
          console.log('RESPONSE TIPO UNIDADE', result);
          console.log('exception TIPO UNIDADE', exception);
          if (exception) {
              return ApiResponse.serverError(res, exception);
          }
          return ApiResponse.ok(res, result);
      });
  }

  async listaNacionalidade(req, res, app) {
      const conn = await connection();
      const dominiosNacionalidadeRepository = new DominiosNacionalidadeRepository(conn);
      dominiosNacionalidadeRepository.dominio((exception, result) => {
          console.log('RESPONSE NACIONALIDADE', result);
          console.log('exception NACIONALIDADE', exception);
          if (exception) {
              return ApiResponse.serverError(res, exception);
          }
          return ApiResponse.ok(res, result);
      });
  }

  async listaModalidade(req, res, app) {
      const conn = await connection();
      const dominiosModalidadeRepository = new DominiosModalidadeRepository(conn);
      dominiosModalidadeRepository.dominio((exception, result) => {
          console.log('RESPONSE MODALIDADE', result);
          console.log('exception MODALIDADE', exception);
          if (exception) {
              return ApiResponse.serverError(res, exception);
          }
          return ApiResponse.ok(res, result);
      });
  }

  async listaEstabelecimento(req, res, app) {
      const conn = await connection();
      const dominiosEstabelecimentoRepository = new DominiosEstabelecimentoRepository(conn);
      dominiosEstabelecimentoRepository.dominio((exception, result) => {
          console.log('RESPONSE ESTABELECIMENTO', result);
          console.log('exception ESTABELECIMENTO', exception);
          if (exception) {
              return ApiResponse.serverError(res, exception);
          }
          return ApiResponse.ok(res, result);
      });
  }

  async listaEscolaridade(req, res, app) {
      const conn = await connection();
      const dominiosGenericRepository = new DominiosGenericRepository(conn, "tb_escolaridade");
      dominiosGenericRepository.dominio((exception, result) => {
          console.log('RESPONSE ESCOLARIDADE', result);
          console.log('exception ESCOLARIDADE', exception);
          if (exception) {
              return ApiResponse.serverError(res, exception);
          }
          return ApiResponse.ok(res, result);
      });
  }

  async listaRaca(req, res, app) {
      const conn = await connection();
      const dominiosRacaRepository = new RacaRepository(conn);
      dominiosRacaRepository.dominio((exception, result) => {
          console.log('RESPONSE RAÇA', result);
          console.log('exception RAÇA', exception);
          if (exception) {
              return ApiResponse.serverError(res, exception);
          }
          return ApiResponse.ok(res, result);
      });
  }

  async listaHipoteseDiagnostica(req, res, app) {
      const conn = await connection();
      const dominiosHipoteseDiagnosticaRepository = new HipoteseDiagnosticaRepository(conn);
      dominiosHipoteseDiagnosticaRepository.dominio((exception, result) => {
          console.log('RESPONSE DIAGNOSTICO', result);
          console.log('exception DIAGNOSTICO', exception);
          if (exception) {
              return ApiResponse.serverError(res, exception);
          }
          return ApiResponse.ok(res, result);
      });
  }

  async listaTipoFicha(req, res, app) {
      console.log('ENTROU NO TIPO FICHA');
      const conn = await connection();
      const dominiosTipoFichaRepository = new TipoFichaRepository(conn);
      dominiosTipoFichaRepository.externalDominio((exception, result) => {
          console.log('RESPONSE TIPOFICHA', result);
          console.log('exception TIPOFICHA', exception);
          if (exception) {
              return ApiResponse.serverError(res, exception);
          }
          return ApiResponse.ok(res, result);
      });
  }

  async listaAtencaoContinuada(req, res, app) {
      const conn = await connection();
      const dominiosGenericRepository = new DominiosGenericRepository(conn, "tb_atencao_continuada");
      dominiosGenericRepository.dominio((exception, result) => {
          console.log('RESPONSE ATENCAO CONTINUADA', result);
          console.log('exception ATENCAO CONTINUADA', exception);
          if (exception) {
              return ApiResponse.serverError(res, exception);
          }
          return ApiResponse.ok(res, result);
      });
  }

  async listaTipoExame(req, res, app) {
      const conn = await connection();
      const dominiosGenericRepository = new DominiosGenericRepository(conn, "tb_tipo_exame");
      dominiosGenericRepository.dominio((exception, result) => {
          console.log('RESPONSE TIPO EXAME', result);
          console.log('exception TIPO EXAME', exception);
          if (exception) {
              return ApiResponse.serverError(res, exception);
          }
          return ApiResponse.ok(res, result);
      });
  }

  async listaClasificacaoRisco(req, res, app) {
      const conn = await connection();
      const dominiosGenericRepository = new DominiosGenericRepository(conn, "tb_classificacao_risco");
      dominiosGenericRepository.dominio((exception, result) => {
          console.log('RESPONSE CLASSIFICACAO RISCO', result);
          console.log('exception CLASSIFICACAO RISCO', exception);
          if (exception) {
              return ApiResponse.serverError(res, exception);
          }
          return ApiResponse.ok(res, result);
      });
  }
}

module.exports = { DominiosExternoController };
