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

const react_prod_url = 'https://sos-service.netlify.app'
const react_dev_url = 'http://localhost:3000'

const client = require('twilio')(twilio_sid, authToken);
const app = express();

app.use(cors({origin: [react_dev_url, react_prod_url]}));
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

//`${twilio_number}`

app.post('/sms', (req, res) => {
    res.header('Content-Type', 'application/json');
    try {
        console.log(req.body.signalId);
            client.messages
                .create({
                    body: `SOS Service: ${req.body.senderName} needs assistance. ${req.body.signalType}: ${req.body.message}.  Go to: ${react_prod_url}/sos/${req.body.signalId}  to view ${req.body.senderName}'s location`,
                    from: 'SOS Service',
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

const getsos = (req,res) =>{
const httpdata = req.body
console.log(httpdata)
if (httpdata === ''){
    res.status(404).json('empty post provided')
    return;
}
res.status(200).json(httpdata)
}

app.post('/sos',getsos)
module.exports = app;



