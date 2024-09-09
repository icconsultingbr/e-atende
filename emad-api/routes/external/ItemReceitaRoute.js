const { Router } = require('express')
const { externalAuth } = require('../../middlewares/ExternalAuth')
const {ItemReceitaExternoController} = require('../../controllers/external/ItemReceita')

const itemReceita = new ItemReceitaExternoController()
const routes = Router()

routes.get('/item-receita/:id', externalAuth, itemReceita.obterListaReceitaPorId)

module.exports = { routes }
