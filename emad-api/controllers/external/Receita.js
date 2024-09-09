const ApiResponse = require('../../utilities/ApiResponse');
const connections = require('../../dao/connections/EatendConnection');
const ReceitaDAO = require ('../../dao/ReceitaDAO');
const {connection} = connections()
const ReceitaRepository = ReceitaDAO()
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

    async findProntuarioVacinacaoByPacienteId(req, res, app){
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

    async findCarteiraVacinacaoByPaciente(req, res, app){
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

}
module.exports ={ ReceitaExternoController }
