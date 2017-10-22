module.exports = function(app, console){
    var utils = require('../common/utils.js');
    var login = require('../login/login.js');
    var booking = require('./booking.js');

    app.post('/api/newbooking', login.verifyToken, function(req, res, next){ utils.verifyapiargs(req.body, res, next, ['packageid', 'start_at', 'name', 'contact_no']) }, function(req, res){
        booking.createbooking(req,res);
    });

    app.post('/api/getbookings', login.verifyToken, function(req, res){
        booking.getbookings(req,res);
    });
}
