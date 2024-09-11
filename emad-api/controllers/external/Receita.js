const ApiResponse = require('../../utilities/ApiResponse');
const connections = require('../../dao/connections/EatendConnection');
const ReceitaDAO = require ('../../dao/ReceitaDAO');
const ItemReceitaDAO = require ('../../dao/ItemReceitaDAO');
const ItemMovimentoGeralDAO = require ('../../dao/ItemMovimentoGeralDAO');
const ParametroSegurancaDAO = require ('../../dao/ParametroSegurancaDAO');

const {connection} = connections()

const ReceitaRepository = ReceitaDAO()
const ItemReceitaRepository = ItemReceitaDAO()
const ItemMovimentoGeralRepository = ItemMovimentoGeralDAO()
const ParametroSegurancaRepository = ParametroSegurancaDAO()
class ReceitaExternoController{

    async obterReceitaPorPacienteId(req, res, app){
      const id = req.params.id;
      const conn = await connection();
      try{
        const receitaRepository = new ReceitaRepository(conn);
        const response = await receitaRepository.buscaPorPacienteIdProntuario(id,0);
        if(!response){
          return ApiResponse.notFound(res, 'Receita não encontrado');
        }
        return ApiResponse.ok(res, response);
      } finally {
        await conn.close();
      }
    }

    async obterProntuarioVacinacaoByPacienteId(req, res, app){
      const id = req.params.id;
      const conn = await connection();
      try{
        const receitaRepository = new ReceitaRepository(conn);
        const response = await receitaRepository.buscaPorPacienteIdProntuarioVacinacao(id,0);
        if(!response){
          return ApiResponse.notFound(res, 'Prontuário vacinação não encontrado');
        }
        return ApiResponse.ok(res, response);
      } finally {
        await conn.close();
      }
    }

    async obterCarteiraVacinacaoByPaciente(req, res, app){
      const id = req.params.id;
      const conn = await connection();
      try{
        const receitaRepository = new ReceitaRepository(conn);
        const response = await receitaRepository.buscaCarteiraVacinacaoPorPaciente(id,0);
        if(!response){
          return ApiResponse.notFound(res, 'Carteira vacinação não encontrado');
        }
        return ApiResponse.ok(res, response);
      } finally {
        await conn.close();
      }
    }

    async obterReceita(req, res, app){
      const { ano, idEstabelecimento, numero } = req.params;
      const conn = await connection();
      try{
        const receitaRepository = new ReceitaRepository(conn);
        const itemReceitaRepository = new ItemReceitaRepository(conn);
        const itemMovimentoGeralRepository = new ItemMovimentoGeralRepository(conn);
        const parametroSegurancaRepository = new ParametroSegurancaRepository(conn);

        const responseReceita = await receitaRepository.buscaReciboReceita(ano, idEstabelecimento, numero);
        var receita = responseReceita[0]

        if(!receita){
          return ApiResponse.notFound(res, 'Recibo receita não encontrado');
        }
        if(receita){

          var itensReceita = await itemReceitaRepository.buscarPorReceita(receita.id);
          receita.itensReceita = itensReceita ? itensReceita : null;

          for (const itemReceita of receita.itensReceita) {

              var itensEstoque = await itemMovimentoGeralRepository.buscarPorItemReceita(receita.id, itemReceita.id);
              itemReceita.itensEstoque = itensEstoque ? itensEstoque : null;
          }
      }

      let buscaChaves = "'RECEITA_TITULO','RECEITA_SUBTITULO', 'RECEITA_DESCRICAO'";

      var valorChave = await parametroSegurancaRepository.buscarValorPorChaveSync(buscaChaves);

      if (valorChave && valorChave.length > 0) {
          titulo = valorChave.filter((url) => url.NOME == "RECEITA_TITULO")[0].VALOR;
          subtitulo = valorChave.filter((url) => url.NOME == "RECEITA_SUBTITULO")[0].VALOR;
          descricao = valorChave.filter((url) => url.NOME == "RECEITA_DESCRICAO")[0].VALOR;

          receita.titulo = titulo;
          receita.subtitulo = subtitulo;
          receita.descricao = descricao;
      }
        return ApiResponse.ok(res, receita);
      } finally {
        await conn.close();
      }
    }

}
module.exports ={ ReceitaExternoController }
