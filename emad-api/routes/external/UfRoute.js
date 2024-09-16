const { Router } = require('express')
const { externalAuth } = require('../../middlewares/ExternalAuth')
const {UfExternoController} = require('../../controllers/external/Uf')

const uf = new UfExternoController()
const routes = Router()

routes.get('/uf/pais/:id', externalAuth, uf.carregaNaturalidadePorNacionalidade)

module.exports = { routes }
