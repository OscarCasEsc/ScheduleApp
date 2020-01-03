const express = require('express');
const router = express.Router();

// Get Appoitment
router.get('/getAppointments', (req, res) => {
    res.json({
        res: 'getAppointments works!'
    });
});

// Add Appointment
router.post('/addAppointment', (req, res) => {
    res.json({
        res: 'addAppointment works!'
    });
});

// Edit Appointment
router.post('/editAppointment', (req, res) => {
    res.json({
        res:'editAppointment works!'
    });
});

// Delete Appointment
router.delete('/deleteAppointment', (req, res) => {
    res.json({
        res: 'deleteApintment works!'
    });
});

module.exports = router;