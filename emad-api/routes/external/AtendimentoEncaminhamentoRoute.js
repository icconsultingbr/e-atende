const { Router } = require('express')
const { externalAuth } = require('../../middlewares/ExternalAuth')
const {AtendimentoEncaminhamentoExternoController} = require('../../controllers/external/AtendimentoEncaminhamento')

const atendimentoEncaminhamento = new AtendimentoEncaminhamentoExternoController()
const routes = Router()

routes.get('/atendimento-encaminhamento/atendimento/:id', externalAuth, atendimentoEncaminhamento.obterAtendimentoPorAtendimentoId)
routes.get('/atendimento-encaminhamento/usuario/:id', externalAuth, atendimentoEncaminhamento.obterAtendimentoPorPacienteId)


module.exports = { routes }
