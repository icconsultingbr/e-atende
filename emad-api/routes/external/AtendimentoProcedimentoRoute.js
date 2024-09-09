const { Router } = require('express')
const { externalAuth } = require('../../middlewares/ExternalAuth')
const {AtendimentoProcedimentoExternoController} = require('../../controllers/external/AtendimentoProcedimento')

const atendimentoProcedimento = new AtendimentoProcedimentoExternoController()
const routes = Router()

routes.get('/atendimento-procedimento/paciente/:id', externalAuth, atendimentoProcedimento.obterListaPacienteId)

module.exports = { routes }
