const { Router } = require('express')
const { externalAuth } = require('../../middlewares/ExternalAuth')
const {AtendimentoHipoteseExternoController} = require('../../controllers/external/AtendimentoHipotese')

const atendimentoHipotese = new AtendimentoHipoteseExternoController()
const routes = Router()

routes.get('/atendimento-hipotese/paciente/:id', externalAuth, atendimentoHipotese.obterPacientePorId)
routes.get('/atendimento-hipotese/paciente-agrupado/:id', externalAuth, atendimentoHipotese.obterPacienteAgrupadoPorId)
routes.get('/atendimento-hipotese/atendimento/:id', externalAuth, atendimentoHipotese.obterAtendimentoHipotesePorAtendimentoId)

module.exports = { routes }
