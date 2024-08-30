const { UsuarioController } = require('./UsuarioController');

const usuarioController = new UsuarioController()

module.exports = function (app) {
  app.post('/usuario/recuperar-senha', (req, res) => usuarioController.recurarSenha(req, res, app));
  app.post('/usuario/login', (req, res) => usuarioController.login(req, res, app));
  app.get('/usuario/login', (req, res) => usuarioController.carregarUsuario(req, res, app));
}

