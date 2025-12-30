const fs = require('fs');

function logReqRes(file) {
    return (req, res, next) => {
        fs.appendFile(file, `/n${Date.now()}:${req.ip} ${req.method}: ${req.path}/n`, (err, data) => {
            next();
        });
    };
}

module.exports = {
    logReqRes, 
}