const ApiResponse = require('../../utilities/ApiResponse')
const connections = require('../../dao/connections/EatendConnection')
const PacienteDAO = require ('../../dao/PacienteDAO')
const AtencaoContinuadaPacienteDAO = require ('../../dao/AtencaoContinuadaPacienteDAO')
const AtendimentoDAO = require ('../../dao/AtendimentoDAO')
const AtendimentoHipoteseDiagnosticaDAO = require ('../../dao/AtendimentoHipoteseDiagnosticaDAO')
const ReceitaDAO = require ('../../dao/ReceitaDAO')
const ItemReceitaDAO = require ('../../dao/ItemReceitaDAO')
const EstabelecimentoDAO = require ('../../dao/EstabelecimentoDAO')
const NacionalidadeDAO = require ('../../dao/NacionalidadeDAO')
const UfDAO = require ('../../dao/UfDAO')
const ExameDAO = require ('../../dao/ExameDAO')
const AtendimentoProcedimentoDAO = require ('../../dao/AtendimentoProcedimentoDAO')
const AtendimentoEncaminhamentoDAO = require ('../../dao/AtendimentoEncaminhamentoDAO')

const { connection } = connections()

const PacienteRepository = PacienteDAO()
const AtencaoContinuadaPacienteRepository = AtencaoContinuadaPacienteDAO()
const AtendimentoRepository = AtendimentoDAO()
const AtendimentoHipoteseDiagnosticaRepository = AtendimentoHipoteseDiagnosticaDAO()
const ReceitaRepository = ReceitaDAO()
const ItemReceitaRepository = ItemReceitaDAO()
const EstabelecimentoRepository = EstabelecimentoDAO()
const NacionalidadeRepository = NacionalidadeDAO()
const UfRepository = UfDAO()
const ExameRepository = ExameDAO()
const AtendimentoProcedimentoRepository = AtendimentoProcedimentoDAO()
const AtendimentoEncaminhamentoRepository = AtendimentoEncaminhamentoDAO()
class PacienteExternoController {
    async obterIdPortIdSap(req, res){
      const conn = await connection()
      try{
        const pacienteRepository = new PacienteRepository(conn)
      const response = await pacienteRepository.buscaPorIdSapAsync(req.idSap)
      console.log('PACIENTE TOKEN', response)
      if(!response){
        return ApiResponse.notFound(res, "Paciente não encontrado")
      }
      return ApiResponse.ok(res, response)
    } finally {
      await conn.close()
    }
    }

    async obterPacientePortId(req, res){
      const conn = await connection()
      try{
        const pacienteRepository = new PacienteRepository(conn)
        console.log('ID', req.params.id)
        const paciente=await pacienteRepository.buscaPorIdAsync(req.params.id)
        if(!paciente){
        return ApiResponse.notFound(res, "Paciente não encontrado")
      }
      console.log('PACIENTE', paciente)
      return ApiResponse.ok(res, paciente)
    } finally {
      await conn.close()
    }
    }

    async obterProntuarioReportPorPacienteId(req, res){

      const idPaciente = req.params.id
      const tipoFicha = req.query.tipoFicha == 'undefined' || req.query.tipoFicha == 'null' ? 0 : req.query.tipoFicha;
      const profissional = req.query.profissional == 'undefined' || req.query.profissional == 'null' ? 0 : req.query.profissional;

      const conn = await connection()

      try{
        const pacienteRepository = new PacienteRepository(conn)
        const atencaoContinuadaPacienteRepository = new AtencaoContinuadaPacienteRepository(conn)
        const atendimentoRepository = new AtendimentoRepository(conn)
        const nacionalidadeRepository = new NacionalidadeRepository(conn)
        const ufRepository = new UfRepository(conn)
        const atendimentoEncaminhamentoRepository = new AtendimentoEncaminhamentoRepository(conn)
        const receitaRepository = new ReceitaRepository(conn)
        const itemReceitaRepository = new ItemReceitaRepository(conn)
        const exameReporitory = new ExameRepository(conn)
        const atendimentoHipoteseRepository = new AtendimentoHipoteseDiagnosticaRepository(conn)
        const estabelecimentoRepository = new EstabelecimentoRepository(conn)
        const atendimentoProcedimentoRepository = new AtendimentoProcedimentoRepository(conn)

        let paciente=await pacienteRepository.buscaPorIdSync(idPaciente)
        let gruposAtencaoContinuada = await atencaoContinuadaPacienteRepository.buscaPorPacienteSync(idPaciente)

        paciente[0].gruposAtencaoContinuada = gruposAtencaoContinuada

        const sinaisVitais = await atendimentoRepository.buscaSinaisVitaisPorPacienteId(idPaciente, '', tipoFicha, profissional)
        const nacionalidade = await nacionalidadeRepository.buscaPorIdSync(paciente[0].nacionalidade)
        const naturalidade = await ufRepository.buscaPorIdSync(paciente[0].ufNaturalidade)

        if (nacionalidade) {
            paciente[0].nacionalidadeNome = nacionalidade[0].nome;
        }

      if (naturalidade) {
            paciente[0].naturalidadeNome = naturalidade[0].nome;
        }

      if (paciente[0].escolaridade) {
            paciente[0].escolaridadeNome = escolaridade.find(x => x.id == paciente[0].escolaridade).nome;
        }

      let atendimentos = await atendimentoRepository.buscaPorPacienteIdProntuario(idPaciente, 1, tipoFicha, profissional);
      if (atendimentos) {
          for (let atendimento of atendimentos) {
              let historicos = await atendimentoRepository.buscaHistoricoPorAtendimento(atendimento.id);
              atendimento.historicos = historicos;
          }
      }

      const encaminhamentos = await atendimentoEncaminhamentoRepository.buscaEncaminhamentoPorPacienteId(idPaciente, tipoFicha, profissional)

      let receitas = await receitaRepository.buscaPorPacienteIdProntuario(idPaciente, tipoFicha)
      if (receitas) {
        for (let receita of receitas) {
            let itens = await itemReceitaRepository.buscarPorReceita(receita.id);
            receita.itensReceita = itens;
        }
      }

      const fichasAtendimento = await atendimentoRepository.buscaPorPacienteIdProntuario(idPaciente, 2, tipoFicha, profissional)
      const exames = await exameReporitory.buscaPorPacienteId(idPaciente, tipoFicha, profissional)
      const hipoteseDiagnostica = await atendimentoHipoteseRepository.listarPorPaciente(idPaciente, tipoFicha, profissional)
      const vacinas = await receitaRepository.buscaPorPacienteIdProntuarioVacinacao(idPaciente, tipoFicha, profissional)
      const estabelecimento = await estabelecimentoRepository.carregaPorId(paciente[0].idEstabelecimentoCadastro);
      const procedimentos = await atendimentoProcedimentoRepository.listarPorPaciente(idPaciente, tipoFicha, profissional)

      let response = { paciente, estabelecimento, sinaisVitais, atendimentos, receitas, fichasAtendimento, exames, hipoteseDiagnostica, vacinas, procedimentos, encaminhamentos };

      if(!paciente){
        return ApiResponse.notFound(res, "Paciente não encontrado")
      }
      return ApiResponse.ok(res, response)
    } finally {
      await conn.close()
    }
    }

}
module.exports = { PacienteExternoController }
