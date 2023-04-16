'use strict';

const express = require('express')
const cors = require('cors');
require('dotenv').config()

const helmet = require("helmet");
const bodyParser = require('body-parser');
const { port, host } = require('./config.js')
const secrets = require('./secrets.js');

const twilio_number = secrets.twilio_number;
const twilio_sid = secrets.twilio_sid;
const authToken = secrets.authToken;
const my_number = secrets.my_number; //for testing only

const client = require('twilio')(twilio_sid, authToken);
const app = express();

app.use(cors());
app.use(helmet.hidePoweredBy());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.get('/home', (req, res) => { //for testing
    res.send('Serving home page');
})

app.post('/sms', (req, res) => {
    res.header('Content-Type', 'application/json');
    try {
        client.messages
            .create({
                body: req.body.message,
                from: `${twilio_number}`,
                to: `${my_number}` //for testing, will be req.body.recipients
            })
            .then(() => { res.send(JSON.stringify({ success: true })) })

    }
    catch (err) {
        console.log(err);
        res.send(JSON.stringify({ success: false }))
    }

})


app.listen(port, () => {
    console.log(`Twilio server listening on port ${port}`)
})

module.exports = app;






/* 


console.log(secrets.authToken)//for testing
console.log(secrets.twilio_sid)//for testing
console.log(twilio_number)
console.log(my_number)
//`https://api.twilio.com/2010-04-01/Accounts/${AccountSid}/Messages.json`

  


/*  */


