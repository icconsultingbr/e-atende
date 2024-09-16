const { Router } = require('express')
const { externalAuth } = require('../../middlewares/ExternalAuth')
const {PacienteDocumentoExternoController} = require('../../controllers/external/PacienteDocumento')

const paciente = new PacienteDocumentoExternoController()
const routes = Router()

routes.get('/paciente-documento/documento/:id', externalAuth, paciente.obterPacientePorId)

module.exports = { routes }
