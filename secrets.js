'use strict';
require('dotenv').config();

const secrets = {
    twilio_sid: process.env.REACT_APP_TWILIO_ACCOUNT_SID,
    authToken: process.env.REACT_APP_TWILIO_AUTH_TOKEN,
    twilio_auth_token: process.env.REACT_APP_TWILIO_AUTH_TOKEN,
    my_number: process.env.REACT_APP_MY_NUMBER,
    twilio_number: process.env.REACT_APP_TWILIO_NUMBER
}

//testing
console.log(secrets.twilio_sid, secrets.twilio_auth_token, secrets.authToken, secrets.my_number, secrets.twilio_number);


module.exports = secrets;