const express = require('express');
const router = express.Router();

const user = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

//bcrypt Settings
const salt = bcrypt.genSaltSync(10);

router.get('/login', async (req, res) => {
   const userFind = await user.findOne({email: req.query.email});

   if(userFind && bcrypt.compareSync(req.query.password, userFind.password)){
        const token = jwt.sign({_id: userFind._id}, 'mySecretKey', { expiresIn: 60 * 60 });
        res.status(200).json({token: token}).end();
   }else{
       res.status(403).end();
   }

});

router.post('/register', (req, res) => {
    const newUser = new user(req.body);
    const encryptedPassword = bcrypt.hashSync(req.body.password, salt);
    newUser.password = encryptedPassword;
    newUser.save((err, doc) =>{
        if(err){
            res.status(500).end();
        }else{
            res.status(200).end();
        }
    });
});

module.exports = router;