const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
    res.json({
        res: 'Login'
    })
});

router.post('register', (req, res) => {
    res.json({
        res: 'Register'
    })
});

module.exports = router;