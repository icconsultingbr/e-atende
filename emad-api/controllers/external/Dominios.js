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
  async listaDominios(req, res, app) {
    console.log('ENTROU NO DOMINIOS');
    const conn = await connection();
    try{
    const dominiosUfRepository = new DominiosUfRepository(conn);
    const dominiosNacionalidadeRepository = new DominiosNacionalidadeRepository(conn);
    const dominiosModalidadeRepository = new DominiosModalidadeRepository(conn);
    const dominiosEstabelecimentoRepository = new DominiosEstabelecimentoRepository(conn);
    const racaRepository = new RacaRepository(conn);
    const hipoteseDiagnosticaRepository = new HipoteseDiagnosticaRepository(conn);
    const tipoFichaRepository = new TipoFichaRepository(conn);
    const atencaoContinuadaRepository = new DominiosGenericRepository(conn, "tb_atencao_continuada");
    const tipoExameRepository = new DominiosGenericRepository(conn, "tb_tipo_exame");
    const classificacaoRiscoRepository = new DominiosGenericRepository(conn, "tb_classificacao_risco");
    const escolaridadeRepository = new DominiosGenericRepository(conn, "tb_escolaridade");
    const [
      ufs,
      nacionalidades,
      modalidades,
      estabelecimentos,
      racas,
      hipoteseDiagnosticas,
      tipoFichas,
      atencaoContinuadas,
      tipoExames,
      classificacaoRiscos,
      escolaridades
    ] = await Promise.all([
      dominiosUfRepository.dominioAsync(),
      dominiosNacionalidadeRepository.dominioAsync(),
      dominiosModalidadeRepository.dominioAsync(),
      dominiosEstabelecimentoRepository.dominioAsync(),
      racaRepository.dominioAsync(),
      hipoteseDiagnosticaRepository.dominioAsync(),
      tipoFichaRepository.dominioAsync(),
      atencaoContinuadaRepository.dominioAsync(),
      tipoExameRepository.dominioAsync(),
      classificacaoRiscoRepository.dominioAsync(),
      escolaridadeRepository.dominioAsync()
    ]);
    console.log('Fez a busca dos dominios');
    if (!ufs || !nacionalidades || !modalidades || !estabelecimentos || !racas || !hipoteseDiagnosticas || !tipoFichas || !atencaoContinuadas || !tipoExames || !classificacaoRiscos || !escolaridades) {
      return ApiResponse.serverError(res, 'Erro ao buscar domínios');
    }
    console.log('Retornou os dominios');
    return ApiResponse.ok(res, {
      ufs,
      nacionalidades,
      modalidades,
      estabelecimentos,
      racas,
      hipoteseDiagnosticas,
      tipoFichas,
      atencaoContinuadas,
      tipoExames,
      classificacaoRiscos,
      escolaridades
    });
  }
  finally{
    await conn.close();
  }
  }


  async listaDominiosUf(req, res, app) {
      const conn = await connection();
      try{
        const dominiosUfRepository = new DominiosUfRepository(conn);
        const ufs = await dominiosUfRepository.dominioAsync();
        if (!ufs) {
          return ApiResponse.serverError(res, 'Erro ao buscar UF');
        }
        return ApiResponse.ok(res, ufs);
      }
      finally{
        await conn.close();
      }
    }

  async listaDominiosTipoUnidade(req, res, app) {
      const conn = await connection();
      try {
        const dominiosTipoUnidadeRepository = new DominiosTipoUnidadeRepository(conn);
        const tipoUnidade = await dominiosTipoUnidadeRepository.dominioAsync();
        if (!tipoUnidade) {
          return ApiResponse.serverError(res, 'Erro ao buscar tipo unidade');
        }
        return ApiResponse.ok(res, tipoUnidade);
      }
      finally{
        await conn.close();
      }
  }

  async listaNacionalidade(req, res, app) {
      const conn = await connection();
      try{
      const dominiosNacionalidadeRepository = new DominiosNacionalidadeRepository(conn);
      const nacionalidades =  await dominiosNacionalidadeRepository.dominioAsync();
      if (!nacionalidades) {
          return ApiResponse.serverError(res, 'Erro ao buscar nacionalidades');
      }
      return ApiResponse.ok(res, nacionalidades);
    }
    finally{
      await conn.close();
    }
    }

  async listaModalidade(req, res, app) {
      const conn = await connection();
      try{

      const dominiosModalidadeRepository = new DominiosModalidadeRepository(conn);
      const modalidades = await dominiosModalidadeRepository.dominioAsync();
      if (!modalidades) {
          return ApiResponse.serverError(res, 'Erro ao buscar modalidades');
      }
      return ApiResponse.ok(res, modalidades);
    }
    finally{
      await conn.close();
    }
  }

  async listaEstabelecimento(req, res, app) {
      const conn = await connection();
      try{

        const dominiosEstabelecimentoRepository = new DominiosEstabelecimentoRepository(conn);
        const estabelecimento = await dominiosEstabelecimentoRepository.dominioAsync();
        if (!estabelecimento) {
          return ApiResponse.serverError(res, 'Erro ao buscar estabelecimento');
        }
        return ApiResponse.ok(res, estabelecimento);
      }
      finally{
        await conn.close();
      }
  }

  async listaRaca(req, res, app) {
      const conn = await connection();
      try{
        const dominiosRacaRepository = new RacaRepository(conn);
        const raca = await dominiosRacaRepository.dominioAsync()
        if (!raca) {
          return ApiResponse.serverError(res, 'Erro ao buscar raça');
        }
        return ApiResponse.ok(res, raca);
      }
      finally{
        await conn.close()
      }
  }

  async listaHipoteseDiagnostica(req, res, app) {
      const conn = await connection();
      try{
        const dominiosHipoteseDiagnosticaRepository = new HipoteseDiagnosticaRepository(conn);
        const hipoteseDiagnostica = await dominiosHipoteseDiagnosticaRepository.dominioAsync()
        if (!hipoteseDiagnostica) {
          return ApiResponse.serverError(res, 'Erro ao buscar hipótese diagnóstica');
        }
        return ApiResponse.ok(res, hipoteseDiagnostica);
      }
      finally{
        await conn.close()
      }
  }

  async listaTipoFicha(req, res, app) {
      console.log('ENTROU NO TIPO FICHA');
      const conn = await connection();
      try{

        const dominiosTipoFichaRepository = new TipoFichaRepository(conn);
        const tipoFicha = await dominiosTipoFichaRepository.dominioAsync()
        if (!tipoFicha) {
          return ApiResponse.serverError(res, 'Erro ao buscar tipo ficha');
        }
        return ApiResponse.ok(res, tipoFicha);
      }
      finally{
        await conn.close()
      }
  }

  async listaAtencaoContinuada(req, res, app) {
    console.log('ENTROU NO ATENCAO CONTINUADA');
      const conn = await connection();
      try{

        const dominiosGenericRepository = new DominiosGenericRepository(conn, "tb_atencao_continuada");
        console.log('dominiosGenericRepository')
        const atencaoContinuada = await dominiosGenericRepository.dominioAsync();
      if (!atencaoContinuada) {
        return ApiResponse.serverError(res, 'Erro ao buscar atenção continuada');
      }
      return ApiResponse.ok(res, atencaoContinuada);
    }
    finally{
      await conn.close()
    }
  }

  async listaTipoExame(req, res, app) {
      const conn = await connection();
      try{

        const dominiosGenericRepository = new DominiosGenericRepository(conn, "tb_tipo_exame");
        const tipoExame = await dominiosGenericRepository.dominioAsync();
        if (!tipoExame) {
          return ApiResponse.serverError(res, 'Erro ao buscar tipo examte');
        }
        return ApiResponse.ok(res, tipoExame);
      }
      finally{
        await conn.close()
      }
  }

  async listaClasificacaoRisco(req, res, app) {
      const conn = await connection();
      try{

        const dominiosGenericRepository = new DominiosGenericRepository(conn, "tb_classificacao_risco");
        const classificacaoRisco = await dominiosGenericRepository.dominioAsync();
        if (!classificacaoRisco) {
          return ApiResponse.serverError(res, 'Erro ao buscar atenção continuada');
        }
        return ApiResponse.ok(res, classificacaoRisco);
      }
      finally{
        await conn.close()
      }
  }
  async listaEscolaridade(req, res, app) {
    const conn = await connection();
    try{

      const dominiosGenericRepository = new DominiosGenericRepository(conn, "tb_escolaridade");
      const escolaridade = await dominiosGenericRepository.dominioAsync();
      if (!escolaridade) {
        return ApiResponse.serverError(res, 'Erro ao buscar atenção continuada');
      }
      return ApiResponse.ok(res, escolaridade);
    }
    finally{
      await conn.close()
    }
}
}

module.exports = { DominiosExternoController };
