const { Router } = require('express')
const { externalAuth } = require('../../middlewares/ExternalAuth')
const {AtendimentoExternoController} = require('../../controllers/external/Atendimento')

const atendimento = new AtendimentoExternoController()
const routes = Router()

routes.get('/atendimento/prontuario-paciente/paciente/:id/sinais-vitais/:tipo', externalAuth, atendimento.obterSinaisVitaisPorPacienteId)
routes.get('/atendimento/prontuario-paciente/paciente/:id/tipo-atendimento/:tipo', externalAuth, atendimento.obterPronturarioPorPacienteId)
routes.get('/atendimento/:id', externalAuth, atendimento.obterAtendimentoPorId)

module.exports = { routes }
