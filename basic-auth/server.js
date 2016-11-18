/**
 * Created by terences on 11/17/16.
 */

var http = require('http');

var username = 'terence',
    password = 'password',
    realm = 'Node Cookbook';
function authenticate(res) {
    res.writeHead(401, {'WWW-Authenticate': 'Basic realm="' + realm + '"'});
    res.end('Authorization required.');
}

http.createServer(function (req, res) {
    var auth, login;

    if (!req.headers.authorization) {
        authenticate(res);
        return;
    }

    auth = req.headers.authorization.replace(/^Basic /, '');
    auth = (new Buffer(auth, 'base64').toString('utf8'));

    login = auth.split(':');

    if (login[0] === username && login[1] === password) {
        res.end('Someone linkes soft cheese!');
        return;
    }

    authenticate(res);

}).listen(8080);
