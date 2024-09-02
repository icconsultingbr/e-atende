const { Router } = require('express')
const { externalAuth } = require('../../middlewares/ExternalAuth')
const {DominiosExternoController} = require('../../controllers/external/Dominios')

const dominios = new DominiosExternoController()
const routes = Router()

routes.get('/dominios/uf', externalAuth, dominios.listaDominios)

module.exports = { routes }
