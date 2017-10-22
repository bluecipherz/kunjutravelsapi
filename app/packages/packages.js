var mysql = require('../config/mysqlconfig.js');
var utils = require('../common/utils.js');
var login = require('../login/login.js');

exports.createpackage = function (req, res) {
    var querystr = "insert into kunjuapi.packages (packagename, description, cost) values (?, ?, ?)"
    mysql.getmysqlconnandrun(function (err, data, msg) {
        if (!err) {
            utils.succReply(data, msg, res);
        }
        else
            utils.failReply(err, msg, res);
    }, mysql.queryReturn(querystr, [req.body.packagename, req.body.description, req.body.cost]));
};

exports.getpackages = function (req, res) {
    var querystr = "select * from kunjuapi.packages"
    mysql.getmysqlconnandrun(function (err, data, msg) {
        if (!err) {
            if (data.length == 0)
                msg = "no packages found";
            utils.succReply(data, msg, res);
        }
        else
            utils.failReply(err, msg, res);
    }, mysql.queryReturn(querystr, []));
};
