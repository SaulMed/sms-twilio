const timeago = require('timeago.js')
const { format } = require('morgan')
module.exports = {
    hideNumber: (phoneNumber = '') => {
        return phoneNumber.replace(/[0-9]/g, 'x')
    },
    timeago: date => {
        return timeago.format(date, 'es_MX')
    }
}