const jwt = require('jsonwebtoken');

const secret = 'fausto';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJub3JtYWwiLCJpYXQiOjE2NzY5MjQ2MzN9.chzYzeIEVHAkaNxu-mXrimHC6vhNHQz1mphQhdZPp80'

function verifyToken(token, secret) {
    return jwt.verify(token, secret);
}

const payload = verifyToken(token, secret);
console.log(payload);