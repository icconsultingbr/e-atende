const { Router } = require('express')
const { externalAuth } = require('../../middlewares/ExternalAuth')
const {ExameExternoController} = require('../../controllers/external/Exame')

const exame = new ExameExternoController()
const routes = Router()

routes.get('/exame/prontuario-paciente/paciente/:id', externalAuth, exame.obterExamePorPacienteId)


module.exports = { routes }
