const ApiResponse = require('../../utilities/ApiResponse')
const connections = require('../../dao/connections/EatendConnection')
const PacienteDAO = require ('../../dao/PacienteDAO')

const { connection } = connections()
const PacienteRepository = PacienteDAO()
class PacienteExternoController {
    async obterIdPortIdSap(req, res){
      const conn = await connection()
      try{
        const pacienteRepository = new PacienteRepository(conn)
      const response = await pacienteRepository.buscaPorIdSapAsync(req.idSap)
      console.log('PACIENTE TOKEN', response)
      if(!response.id){
        return ApiResponse.notFound(res, "Paciente não encontrado")
      }
      return ApiResponse.ok(res, response.id)
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

}
module.exports = { PacienteExternoController }
