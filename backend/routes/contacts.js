const express = require('express');
const router = express.Router();

const contact = require('../models/contact');

//Get Contacts
router.get('/getContacts', async (req, res) => {
    const contacts = await contact.find();
    res.status(200).json(contacts);
});

// Add Contact
router.post('/addContact', (req, res) => {
    const newContact = new contact(req.body);
    newContact.save((err, doc)=>{
        if(err){
            console.log(err);
            res.status(403).end();
        }else{
            res.status(200).end();
        }
    })
        
});

// Edit Contact
router.post('/editContact', (req, res) => {
    res.json({
        res: 'editContact works!'
    });
});

// Delete Contact
router.delete('/deleteContact/:id' , (req, res) => {
    contact.findOneAndRemove(req.params.id, (err, doc) => {
        if(err){
            res.status(500).end();
        }else{
            res.status(200).end();
        }
    });
});

module.exports = router;