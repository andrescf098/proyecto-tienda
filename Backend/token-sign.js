const jwt = require('jsonwebtoken');

const secret = 'fausto';
const payload = {
    sub: 1,
    role: 'normal' 
};

function signToken(payload, secret) {
    return jwt.sign(payload, secret);
}

const token = signToken(payload, secret);
console.log(token);