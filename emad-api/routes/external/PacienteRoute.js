const { Router } = require('express')
const { externalAuth } = require('../../middlewares/ExternalAuth')
const {PacienteExternoController} = require('../../controllers/external/Paciente')

const paciente = new PacienteExternoController()
const routes = Router()

routes.get('/paciente/ficha-temporaria', externalAuth, paciente.obterIdPortIdSap)
routes.get('/paciente/:id', externalAuth, paciente.obterPacientePortId)

module.exports = { routes }
