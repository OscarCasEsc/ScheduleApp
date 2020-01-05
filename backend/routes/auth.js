const express = require('express');
const router = express.Router();

const user = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

//bcrypt Settings
const salt = bcrypt.genSaltSync(10);

router.get('/login', async (req, res) => {
   const userFind = await user.findOne({email: req.body.email});

   if(userFind && bcrypt.compareSync(req.body.password, userFind.password)){
        const token = jwt.sign({_id: userFind._id}, 'mySecretKey', { expiresIn: 60 * 60 });
        res.status(200).json({token: token}).end();
   }else{
       res.status(403).end();
   }

});

router.post('/register', (req, res) => {
    const newUser = new user(req.body);
    const encryptedPassword = bcryp.hashSync(req.body.password, salt);
    newUser.password = encryptedPassword;
    newUser.save()
        .then( res.status(200).end())
        .catch( res.status(500).end());
});

module.exports = router;