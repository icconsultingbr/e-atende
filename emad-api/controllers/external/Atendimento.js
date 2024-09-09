const ApiResponse = require('../../utilities/ApiResponse');
const connections = require('../../dao/connections/EatendConnection');
const AtendimentoDAO = require ('../../dao/AtendimentoDAO');
const {connection} = connections()
const AtendimentoRepository = AtendimentoDAO()
class AtendimentoExternoController{

    async obterSinaisVitaisPorPacienteId(req, res, app){
      const id = req.params.id;
      const tipo = req.params.tipo;
      const conn = await connection();
      try{
        const atendimentoRepository = new AtendimentoRepository(conn);
        const response = await atendimentoRepository.buscaSinaisVitaisPorPacienteId(id,tipo,0,0);
        if(!response){
          return ApiResponse.notFound(res, 'Atendimento não encontrado');
        }
        return ApiResponse.ok(res, response);
      } finally {
        await conn.close();
      }
    }
    async obterPronturarioPorPacienteId(req, res, app){
      const id = req.params.id;
      const tipo = req.params.tipo;
      const conn = await connection();
      try{
        const atendimentoRepository = new AtendimentoRepository(conn);
        var response = await atendimentoRepository.buscaPorPacienteIdProntuario(id,tipo,0,0);
        if(!response){
          return ApiResponse.notFound(res, 'Atendimento não encontrado');
        }
        var atendimentos = response;
        for (const itemAtendimento of atendimentos) {
            var historicos = await atendimentoRepository.buscaHistoricoPorAtendimento(itemAtendimento.id);
            itemAtendimento.historicos = historicos ? historicos : null;
        }
        return ApiResponse.ok(res, atendimentos);
      } finally {
        await conn.close();
      }
    }

    async obterAtendimentoPorId(req, res, app){
      const id = req.params.id;
      const conn = await connection();
      try{
        const atendimentoRepository = new AtendimentoRepository(conn);
        const response = await atendimentoRepository.buscaPorIdAsync(id);
        if(!response){
          return ApiResponse.notFound(res, 'Atendimento não encontrado');
        }
        return ApiResponse.ok(res, response);
      } finally {
        await conn.close();
      }
    }

}
module.exports ={ AtendimentoExternoController }
