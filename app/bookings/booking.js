var mysql = require('../config/mysqlconfig.js');
var utils = require('../common/utils.js');
var login = require('../login/login.js');

exports.createbooking = function (req, res) {
    var querystr = "insert into kunjuapi.bookings (packageid, name, contact_no, start_at) values (?, ?, ?, ?)";
    mysql.getmysqlconnandrun(function (err, data, msg) {
        if (!err) {
            utils.succReply(data, msg, res);
        }
        else
            utils.failReply(err, msg, res);
    }, mysql.queryReturn(querystr, [req.body.packageid, req.body.name, req.body.contact_no, req.body.start_at]));
};

// exports.getmybookings = function (req, res) {
//     var querystr = "select t1.* , t2.start_at from kunjuapi.packages t1, kunjuapi.bookings t2, kunjuapi.users t3 where t1.id = t2.packageid and t2.userid = t1.id and t1.id = ?;"
//     mysql.getmysqlconnandrun(function (err, data, msg) {
//         if (!err) {
//             if (data.length == 0)
//                 msg = "no bookings found";
//             utils.succReply(data, msg, res);
//         }
//         else
//             utils.failReply(err, msg, res);
//     }, mysql.queryReturn(querystr, [req.tokend.userinfo.userid]));
// };

exports.getbookings = function (req, res) {
    var querystr = "select t1.*, t2.start_at, t2.name, t2.contact_no from kunjuapi.packages t1, kunjuapi.bookings t2 where t1.id = t2.packageid";
    mysql.getmysqlconnandrun(function (err, data, msg) {
        if (!err) {
            if (data.length == 0)
                msg = "no bookings found";
            utils.succReply(data, msg, res);
        }
        else
            utils.failReply(err, msg, res);
    }, mysql.queryReturn(querystr, []));
};
