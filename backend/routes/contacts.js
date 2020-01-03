const express = require('express');
const router = express.Router();

//Get Contacts
router.get('/getContacts', (req, res) => {
    res.json({
        res: 'getContacts works!'
    })
});

// Add Contact
router.post('/addContact', (req, res) => {
    res.json({
        res: 'addContact works!'
    })
});

// Edit Contact
router.post('/editContact', (req, res) => {
    res.json({
        res: 'editContact works!'
    });
});

// Delete Contact
router.delete('/deleteContact' , (req, res) => {
    res.json({
        res: 'deleteContact works!'
    });
});

module.exports = router;