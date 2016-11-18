/**
 * Created by terences on 11/17/16.
 */

var express = require('express');
var basicAuth = require('basic-auth-connect');

var username = 'terence',
    password = 'password',
    realm = 'Node Cookbook';
var app = express();
app.use(basicAuth(function (user, pass) {
    return username === user && password === pass;
}, realm));
app.get('/:route?', function (req, res) {
    res.end('Someone likes soft cheese!');
});

app.listen(8089);