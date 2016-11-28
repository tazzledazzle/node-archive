var nodemailer = require('nodemailer');

var transport = nodemailer.createTransport('SMTP', {
    host: 'smtp.gmail.com',
    secureConnection: true,
    port: 465,
    auth: {
        //todo: fill in my info
        user: 'email@email.com',
        pass: 'password'
    }
});


var msg = {
    transport: transport,
    text: 'Hello! This is your newsletter, :D',
    from: "",   //add a user
    subject: "Node works to send messages via gmail!"
};

var maillist = [
    ''  //create a list of peoples
];

maillist.forEach(function (to, i) {
    //grab the dest string
   msg.to = to;
    //this is where I'm sending using nodemailer
    //TODO: for some reason this isn't a "method"
    nodemailer.sendMail(msg, function (err) {
        if (err) {
            console.log('Sending to ' + to + ' Failed!' + err);
            return;
        }

        console.log('Sent to '+ to);
        // if this is the last message, close the transport
        if (i === maillist.length - 1) { msg.transport.close();}
    });
});