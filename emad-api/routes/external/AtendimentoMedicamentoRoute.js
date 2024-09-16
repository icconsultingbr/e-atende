const { Router } = require('express')
const { externalAuth } = require('../../middlewares/ExternalAuth')
const {AtendimentoMedicamentoExternoController} = require('../../controllers/external/AtendimentoMedicamento')

const atendimentoMedicamento = new AtendimentoMedicamentoExternoController()
const routes = Router()

routes.get('/atendimento-medicamento/atendimento/:id', externalAuth, atendimentoMedicamento.obterAtendimentoPorAtendimentoId)


module.exports = { routes }
