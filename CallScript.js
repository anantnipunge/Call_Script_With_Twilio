const twilio = require('twilio');

const accountSid = 'AC6986a8423962df738450240df9511e02';
const authToken = '895072797bbe643fa70da2738df30d2f';

const client = new twilio(accountSid, authToken);

const yourNumber = '+13345090340';
const targetNumber = '+91 82084 65930';

const numberOfCalls = 100;

const callDelay = 30000;

function initiateCalls() {
    let callsMade = 0;

    function callLoop() {
        if (callsMade < numberOfCalls) {
            client.calls.create({
                from: yourNumber,
                to: targetNumber,
                url: 'http://demo.twilio.com/docs/voice.xml'
            })
                .then(call => {
                    console.log(`Call SID: ${call.sid}`);
                    callsMade++;
                    setTimeout(callLoop, callDelay);
                })
                .catch(error => {
                    console.error(error);
                    console.error(`Call failed: ${error.message}`);
                    process.exit(1);
                });
        }
    }

    callLoop();
}

initiateCalls();
