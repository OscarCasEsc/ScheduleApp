const express = require('express');
const router = express.Router();

const appointment = require('../models/appointment');

// Get Appoitment
router.get('/getAppointments', (req, res) => {
    appointment.find((err, docs) => {
        if(err){
            res.status(500).end();
        } else{
            res.status(200).json(docs);
        }
    });
});

// Add Appointment
router.post('/addAppointment', (req, res) => {
    const newAppointment = new appointment(req.body);
    newAppointment.save((err,doc) => {
        if(err){
            res.status(500).end();
        }else{
            res.status(200).end();
        }
    });
});

// Edit Appointment
router.post('/editAppointment/:id', (req, res) => {
    const appointmentId = req.params.id;
    
    appointment.findByIdAndUpdate(appointmentId,req.body,(err, doc) => {
        if(err){
            res.status(500).end();
        } else {
            res.status(200).end();
        }
    });
});

// Delete Appointment
router.delete('/deleteAppointment/:id', (req, res) => {
    appointment.findOneAndRemove(req.params.id, (err,doc) => {
        if(err){
            res.status(500).end();
        } else {
            res.status(200).end();
        }
    });
});

module.exports = router;