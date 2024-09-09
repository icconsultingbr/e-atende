const { Router } = require('express')
const { externalAuth } = require('../../middlewares/ExternalAuth')
const {ReceitaExternoController} = require('../../controllers/external/Receita')

const receita = new ReceitaExternoController()
const routes = Router()

routes.get('/receita/prontuario-paciente/paciente/:id', externalAuth, receita.obterReceitaPorPacienteId)
routes.get('/receita/prontuario-vacinacao/paciente/:id', externalAuth, receita.findProntuarioVacinacaoByPacienteId)
routes.get('/receita/carteira-vacinacao/paciente/:id', externalAuth, receita.findCarteiraVacinacaoByPaciente)

module.exports = { routes }
