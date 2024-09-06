const { Router } = require('express')
const { externalAuth } = require('../../middlewares/ExternalAuth')
const {AtendimentoExternoController} = require('../../controllers/external/Atendimento')

const atendimentoHipotese = new AtendimentoExternoController()
const routes = Router()

routes.get('/atendimento/prontuario-paciente/paciente/:id/sinais-vitais/:tipo', externalAuth, atendimentoHipotese.obterSinaisVitaisPorPacienteId)

module.exports = { routes }
