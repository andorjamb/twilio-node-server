'use strict';
require('dotenv').config()
const express = require('express')
const cors = require('cors');

const helmet = require("helmet");
const bodyParser = require('body-parser');
const { port } = require('./config.js')

const twilio_number = process.env.REACT_APP_TWILIO_NUMBER; 
const twilio_sid = process.env.REACT_APP_TWILIO_ACCOUNT_SID; 
const authToken = process.env.REACT_APP_TWILIO_AUTH_TOKEN;

const react_url = 'https://www.'
const react_dev_url = 'localhost:3000/'

const BODY = `SOS Service: ${req.body.senderName} needs assistance. ${req.body.message}.  GO TO: ${react_dev_url}${req.body.signalId}`

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
                    to: req.body.recipient
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



