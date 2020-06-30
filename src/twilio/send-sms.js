const config = require('../config');
const client = require('twilio')(config.accountSid,config.authToken)

/**
 * 
 * @param {string} body - The SMS message 
 * @param {string} phone - The phone number
 */

async function sendMessage(body, phone) {
    try {
        const message = await client.messages.create({
            to: phone,
            from: '+13237160594',
            body: body
        })
        //console.log(message.sid)
        return message;
    } catch (error) {
        console.log('Soy erro  tipo: '+error)
    }
}

module.exports = { sendMessage }