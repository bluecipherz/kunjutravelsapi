module.exports = function(app, console){
    var utils = require('../common/utils.js');
    var login = require('../login/login.js');
    var packages = require('./packages.js');

    app.post('/api/createpackage', login.verifyToken, function(req, res, next){ utils.verifyapiargs(req.body, res, next, ['packagename', 'description', 'cost']) }, function(req, res){
        packages.createpackage(req,res);
    });

    app.post('/api/getpackages', login.verifyToken, function(req, res){
        packages.getpackages(req,res);
    });

}
