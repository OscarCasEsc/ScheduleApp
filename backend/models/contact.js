const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const contactSchema = new Schema({
    name: String,
    firstSurname: String,
    secondSurname: String,
    email: String,
    phone: String,
    address: String, 
    createdById: ObjectId
});

module.exports = mongoose.model('Contact', contactSchema);