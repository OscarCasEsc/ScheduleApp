const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    name: String,
    firstSurname: String,
    secondSurname: String,
    email: String,
    phone: String,
    address: String
});

module.exports = mongoose.model('Contact', contactSchema);