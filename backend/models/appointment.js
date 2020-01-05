const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    name: String,
    description: String,
    date: Date
});

module.exports = mongoose.model('Appointment', appointmentSchema);