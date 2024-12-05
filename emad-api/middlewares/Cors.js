module.exports = function (app) {

    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT, *");
        res.header("Access-Control-Allow-Headers", "*");
        
        next()
    });
}