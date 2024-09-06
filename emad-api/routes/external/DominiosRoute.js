const { Router } = require('express')
const { externalAuth } = require('../../middlewares/ExternalAuth')
const {DominiosExternoController} = require('../../controllers/external/Dominios')

const dominios = new DominiosExternoController()
const routes = Router()

// routes.get('/dominios', externalAuth, dominios.listaDominios)// other features
routes.get('/dominios/uf', externalAuth, dominios.listaDominiosUf)
routes.get('/dominios/tipo-unidade', externalAuth, dominios.listaDominiosTipoUnidade)
routes.get('/dominios/nacionalidade', externalAuth, dominios.listaNacionalidade)
routes.get('/dominios/modalidade', externalAuth, dominios.listaModalidade)
routes.get('/dominios/estabelecimento', externalAuth, dominios.listaEstabelecimento)
routes.get('/dominios/escolaridade', externalAuth, dominios.listaEscolaridade)
routes.get('/dominios/raca', externalAuth, dominios.listaRaca)
routes.get('/dominios/hipotese-diagnostica', externalAuth, dominios.listaHipoteseDiagnostica)
routes.get('/dominios/atencao-continuada', externalAuth, dominios.listaAtencaoContinuada)
routes.get('/dominios/tipo-ficha', externalAuth, dominios.listaTipoFicha)
routes.get('/dominios/tipo-exame', externalAuth, dominios.listaTipoExame)
routes.get('/dominios/classificacao-risco', externalAuth, dominios.listaClasificacaoRisco)
routes.get('/dominios', externalAuth, dominios.listaDominios)

module.exports = { routes }
