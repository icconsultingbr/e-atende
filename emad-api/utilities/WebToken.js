const  jwt = require('jsonwebtoken');

class WebToken {
  static create(data, secret, expiresIn){
    return jwt.sign(data, secret, { expiresIn: expiresIn });
  }

  static verify(token, secret, cb){
    return jwt.verify(token, secret, cb);
  }

  static decode(token){
    return jwt.decode(token);
  }
}

module.exports = WebToken;
