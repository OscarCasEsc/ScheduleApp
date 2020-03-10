const express = require('express');
const router = express.Router();

const appointment = require('../models/appointment');

const { verifyToken } = require('./validationFunctions');


// Get Appoitment
router.get('/getAppointments/:page/:limit', verifyToken, (req, res) => {
    const page = +req.params.page;
    const limit = +req.params.limit;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {}
    appointment.countDocuments({createdById: req.userId},(err,count)=> {
        if(err) {
            res.status(500).end();
        } else {

            if (endIndex < count) {
                results.next = {
                    page: page + 1,
                    limit: limit
                }
            }
        
            if (startIndex > 0) {
                results.previous = {
                    page: page - 1,
                    limit: limit
                }
            }

            results.total = count;

            appointment.find({ createdById: req.userId }, (err, docs) => {
                if (err) {
                    res.status(500).end();
                } else {
                    results.paginatedResult = docs;
                    res.status(200).json(results).end();
                }
            }).limit(limit).skip(startIndex);
        }
    });
});

// Add Appointment
router.post('/addAppointment', verifyToken, (req, res) => {
    const newAppointment = new appointment(req.body);
    newAppointment.createdById = req.userId;
    newAppointment.save((err, doc) => {
        if (err) {
            res.status(500).end();
        } else {
            res.status(200).end();
        }
    });
});

// Edit Appointment
router.post('/editAppointment/:id', verifyToken, (req, res) => {
    const appointmentId = req.params.id;

    appointment.findOneAndUpdate({ _id: appointmentId, createdById: req.userId }, req.body, (err, doc) => {
        if (err) {
            res.status(500).end();
        } else {
            if (doc === null) {
                res.status(404).end();
            } else {
                res.status(200).end();
            }
        }
    });
});

// Delete Appointment
router.delete('/deleteAppointment/:id', verifyToken, (req, res) => {
    appointment.findOneAndRemove({ _id: req.params.id, createdById: req.userId }, (err, doc) => {
        if (err) {
            res.status(500).end();
        } else {
            if (doc === null) {
                res.status(404).end();
            } else {
                res.status(200).end();
            }
        }
    });
});

/*
async function paginateResults(model){
    return (req, res, next) => {
        const page = req.body.params.page;
        const limit = req.body.params.limit;
        
        const startIndex = (page-1) * limit;
        const endIndex = page * limit;

        const results = {}

        if(endIndex < model.length) {
            results.next = {
                page: page + 1,
                limit: limit
            }
        }

        if(startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }
        results.results = await model.find().limit(limit).skip(startIndex);

        res.paginatedResults = results;
        next();
    }
}*/

module.exports = router;