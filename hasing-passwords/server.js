/**
 * Created by terences on 11/17/16.
 */


var express = require('express');
var crypto = require('crypto');
var bodyParser = require('body-parser');

var userStore = {}, app = express();

app.listen(8080);

app.use(bodyParser());

app.get('/', function(req, res) {
    res.sendfile('regform.html');
});

app.post('/', function (req, res) {
    if (!req.body.user || !req.body.pass) {
        res.send('Username and password both required');
        return;
    }
    // Vanilla MD5 hash
    //var hash = crypto
    //    .createHash("md5")
    //    .update(req.body.pass)
    //    .digest('hex');

    // HMAC, Hash-based Message Authentication Code option:
    //var hash = crypto
    //    .createHmac("md5",'SuperSecretKey')
    //    .update(req.body.pass)
    //    .digest('hex');

    //console.log(hash);

    // PBKDF2 is the second version of Password-Based Key Derivation Function
    crypto.randomBytes(128, function(err, salt) {
        if (err) { throw err; }
        salt = new Buffer(salt).toString('hex');
        crypto.pbkdf2(req.body.pass, salt, 7000, 256, function(err, hash) {
            if (err) {throw err; }
            userStore[req.body.user] = {salt : salt, hash: (new Buffer(hash).toString('hex'))};
            res.send('Thanks for registering ' + req.body.user);
            console.log(userStore);
        });
    });
    //userStore[req.body.user] = hash;
    //res.send('Thanks for registering ' + req.body.user);
    //console.log(userStore);

});