var mysql = require('../config/mysqlconfig.js');
var utils = require('../common/utils.js');

exports.succReply = function(data, msg, res){
    res.status(200).send({"status":"SUCCESS", "data":data, "err": null, "msg":msg});
};

exports.failReply = function(data, msg, res){
    res.status(400).send({"status":"FAILURE", "err":data, "data": null, "msg":msg});
};

exports.forbidReply = function(data, msg, res){
    res.status(403).send({"status":"FAILURE", "err":data, "data": null, "msg":msg});
};

exports.authFailure = function(msg, res){
    res.status(401).send({"status":"FAILURE", "data":null, "err":{}, "msg":msg});
};

exports.generalCallback = function(res){
    return function(err, data, msg){
	if (err)
	    exports.failReply(err, msg, res);
	else
	    exports.succReply(data, msg, res);
    };
};
	    
exports.checkallkeys = function(reqobj, reqkeys){
    for (var i in reqkeys)
	if (!(reqkeys[i] in reqobj))
	    return [false, reqkeys[i]];
    return [true, null];
};

exports.verifyapiargs = function (reqobj, res, next, reqkeys) {
    var isallkeys = this.checkallkeys(reqobj, reqkeys);
    if(!isallkeys[0])
        this.failReply(reqobj, "key no found " + isallkeys[1], res);
    else
        next()
};

exports.createassetpath = function(pgrouppath, assettypepath, insertid) {
    return pgrouppath+'/'+assettypepath+'/'+insertid
};

exports.verifyassettype = function(req, res, next) {
    var querystr = "select * from ydyadb.assettype where type=?";
    mysql.getmysqlconnandrun(function (err, data, msg) {
        if (!err && data.length > 0) {
            // console.log('verifyassettype==================================================================================', data);
            req.body.assettypeid = data[0].id;
            // console.log('assettypeid', req.body.assettypeid, 'data_id ', data[0].id);
            next();
        }
        else {
            utils.failReply(err, "invalid assettype", res);
        }
    }, mysql.queryReturn(querystr, [req.body.assettype]));
};

exports.getorgid = function(req, res, next) {
    var querystr = "select * from ydyadb.assettype where type='com.blueciphers.assets.group.org'";
    mysql.getmysqlconnandrun(function (err, data, msg) {
        if (!err && data.length > 0) {
            console.log(data)
            req.body.orgid = data[0].id
            next();
        }
        else {
            utils.failReply(err, "no top parent group found", res);
        }
    }, mysql.queryReturn(querystr, [req.body.assettype]));
};