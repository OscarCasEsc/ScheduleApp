const jwt = require('jsonwebtoken');

function verifyToken(req, res, next){
    if(!req.headers.authorization){
        return res.status(401).end();
    }
    
    const token = req.headers.authorization.split(' ')[1];

    if(token === 'null'){
        return res.status(401).end();
    }
    const payload = jwt.verify(token,'mySecretKey');
    const userId = payload._id;

    req.userId = userId;
    next();
}

exports.verifyToken = verifyToken;
