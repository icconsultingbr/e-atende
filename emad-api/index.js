var app = require('./config/custom-express')();
var config = require("./config/config");
const WebToken = require('./utilities/WebToken');

const externalPacienteRoutes = require('./routes/external/PacienteRoute');
const externalDominiosRoutes = require('./routes/external/DominiosRoute');
const externalUfRoutes = require('./routes/external/UfRoute');
const externalAtendimentoHipoteseRoutes = require('./routes/external/AtendimentoHipoteseRoute');
const externalPacienteDocumentoRoutes = require('./routes/external/PacienteDocumentoRoute');
const externalAtendimentoRoutes = require('./routes/external/AtendimentoRoute');

app.use('/external', externalDominiosRoutes.routes);
app.use('/external', externalPacienteRoutes.routes);
app.use('/external', externalUfRoutes.routes);
app.use('/external', externalAtendimentoHipoteseRoutes.routes);
app.use('/external', externalPacienteDocumentoRoutes.routes);
app.use('/external', externalAtendimentoRoutes.routes);

var server = app.listen(config.apiPort, function () {
    console.log('Server listen at ' + config.apiPort);

    setTimeout(() => {
        const connection = app.dao.ConnectionFactory();
        const cache = new app.cache.DimCache(connection);
        cache.configurar()
            .then(result => {
                console.log('ok');
                //connection.end();
            });
    }, 2000);
});

var io = require('socket.io')({ pingInterval: 25000, pingTimeout: 60000 }).listen(server);

app.set('io', io);


io.use(function (socket, next) {

    if (socket.handshake.query && socket.handshake.query.token) {
        WebToken.verify(socket.handshake.query.token, app.settings.superSecret, function (err, decoded) {
            if (err) return next(new Error('Authentication error'));
            socket.decoded = decoded;
            next();
        });
    } else {
        next(new Error('Authentication error'));
    }
});
