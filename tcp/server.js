var net = require('net'),
    PassThroughStream = require('stream').PassThrough,
    stream = new PassThroughStream();

net.createServer({allowHalfOpen: true}, function(socket){
    socket.end('Hello, this is TCP\n');
    socket.pipe(stream, {end: false});  //this can be used to direct traffic to different places, logs, files, etc.

}).listen(8080);

net.createServer(function(socket) {
    socket.on('data', function(d) {
       d+='';
        socket.write(Date() + ' ' + d.toUpperCase());   //write the info to a different server port
        //console.log(d + '');
    });
    socket.pipe(stream);
}).listen(8081);
console.log('magic happens on port: 8080');