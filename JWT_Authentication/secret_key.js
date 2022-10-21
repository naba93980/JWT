var crypto = require("crypto");
var secretKey = crypto.randomBytes(256).toString('hex');

console.log(secretKey);

