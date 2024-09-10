const { Router } = require('express')
const { externalAuth } = require('../../middlewares/ExternalAuth')
const {ProfissionalExternoController} = require('../../controllers/external/Profissional')

const profissional = new ProfissionalExternoController()
const routes = Router()

routes.get('/profissional/estabelecimento/:id', externalAuth, profissional.profissionalPorEstabelecimento)


module.exports = { routes }
