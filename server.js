'use strict';
require('dotenv').config()
const secrets = require('./secrets.js');
const express = require('express')
const cors = require('cors');

const helmet = require("helmet");
const bodyParser = require('body-parser');
const { port } = require('./config.js')

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

app.get('/sms/:signalId', (req, res) => {
    res.send('Hi')
})

/**
 *  body: `SOS Service: ${req.body.senderName} needs assistance. ${req.body.message}.  GO TO: https://localhost:3000/sos/${req.body.signalId}`,
 * 
 */

app.post('/sms', (req, res) => {
    res.header('Content-Type', 'application/json');
    try {
            client.messages
                .create({
                    body: req.body.message,
                    from: `${twilio_number}`,
                    to: req.body.recipient    //`${my_number}`
                })
                .then(() => { res.send(JSON.stringify({ success: true })) })
    
        }
        catch (err) {
            console.log(err);
            res.send(JSON.stringify({ success: false }))
        } 
})

/* }) */


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

   */


