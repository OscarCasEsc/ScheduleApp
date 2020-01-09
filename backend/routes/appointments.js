const express = require('express');
const router = express.Router();

const appointment = require('../models/appointment');

const {verifyToken} = require('./validationFunctions');

// Get Appoitment
router.get('/getAppointments', verifyToken, (req, res) => {
    appointment.find({createrbyId: req.createrbyId},(err, docs) => {
        if(err){
            res.status(500).end();
        } else{
            res.status(200).json(docs).end();
        }
    });
});

// Add Appointment
router.post('/addAppointment',verifyToken, (req, res) => {
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
router.post('/editAppointment/:id',verifyToken, (req, res) => {
    const appointmentId = req.params.id;
    
    appointment.findOneAndUpdate({_id:appointmentId, createrbyId: req.createrbyId}, req.body,(err, doc) => {
        if(err){
            res.status(500).end();
        } else {
            if(doc === null){
                res.status(404).end();
            } else{
                res.status(200).end();
            }
        }
    });
});

// Delete Appointment
router.delete('/deleteAppointment/:id',verifyToken, (req, res) => {
    appointment.findOneAndRemove({_id:req.params.id, createrbyId: req.createrbyId}, (err,doc) => {
        if(err){
            res.status(500).end();
        } else {
            if(doc === null) {
                res.status(404).end();
            }else{
                res.status(200).end();
            }
        }
    });
});

module.exports = router;