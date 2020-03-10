const express = require('express');
const router = express.Router();

const contact = require('../models/contact');
const {verifyToken} = require('./validationFunctions');

//Get Contacts
router.get('/getContacts/:page/:limit', verifyToken, (req, res) => {
    const page = +req.params.page;
    const limit = +req.params.limit;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    contact.countDocuments({createdById: req.userId}, (err, count) => {
        if(err) {
            res.status(500).end();
        } else {
            results.total = count;
            contact.find({createdById: req.userId},(err, docs) => {
                if(err){
                    res.status(500).end();
                } else {
                    results.paginatedResults = docs;
                    res.status(200).json(results).end();
                }
            }).limit(limit).skip(startIndex);
            
        }
    });
});

// Add Contact
router.post('/addContact', verifyToken,  (req, res) => {
    const newContact = new contact(req.body);
    newContact.createdById = req.userId;
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
router.post('/editContact/:id', verifyToken, (req, res) => {
    const contactId = req.params.id;

    console.log(req.body);

    contact.findOneAndUpdate({_id: contactId, createdById: req.userId}, req.body,(err, doc) => {
        if(err) {
            res.status(500).end();
        }else{
            if(doc === null){
                res.status(404).end();
            }else{
                res.status(200).end();
            }
        }
    });
});

// Delete Contact
router.delete('/deleteContact/:id', verifyToken, (req, res) => {
    contact.findOneAndRemove({_id:req.params.id, createdById:req.userId}, (err, doc) => {
        if(err){
            res.status(500).end();
        }else{
            if(doc === null) {
                res.status(404).end();
            }else{
                res.status(200).end();
            }
        }
    });
});

module.exports = router;