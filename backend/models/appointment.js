const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const appointmentSchema = new Schema({
    name: String,
    description: String,
    date: Date,
    createdById: ObjectId
});

module.exports = mongoose.model('Appointment', appointmentSchema);