const ApiResponse = require('../../utilities/ApiResponse')
const connections = require('../../dao/connections/EatendConnection')
const PacienteDAO = require ('../../dao/PacienteDAO')

const { connection } = connections()
const PacienteRepository = PacienteDAO()
class PacienteExternoController {
    async obterIdPortIdSap(req, res){
      const conn = await connection()
      const pacienteRepository = new PacienteRepository(conn)

      var response = await pacienteRepository.buscaPorIdSap(req.idSap)
      if(!response.id){
        return ApiResponse.notFound(res, "Paciente não encontrado")
      }

      return ApiResponse.ok(res, response.id)
    }

    async obterPacientePortId(req, res){
      const conn = await connection()
      const pacienteRepository = new PacienteRepository(conn)

      pacienteRepository.buscaPorId(req.params.id, response => {
        if(!response.id){
          return ApiResponse.notFound(res, "Paciente não encontrado")
        }

        return ApiResponse.ok(res, response)
      })
    }

}
module.exports = { PacienteExternoController }
