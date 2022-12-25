'use strict';

export default class SessionService {

  constructor (deps) {
    this.httpStatusCodes = deps.httpStatusCodes;
    this.jwt = deps.jwt;
    this.RSA = deps.RSA;
    this.crypto = deps.crypto;
    this.logger = deps.logger;
    this.config = deps.config;
    this.moment = deps.moment;
    this.userService = deps.userService;
    // this.cache = deps.cache;
  }

  _generateNumberWithNDigits (n) {
    const add = 1;
    let max = 12 - add;
    if ( n > max ) {
      return this._generateNumberWithNDigits(max) + this._generateNumberWithNDigits(n - max);
    }
    max = Math.pow(10, n+add);
    const min = max/10;
    const number = Math.floor( Math.random() * (max - min + 1) ) + min;
    return ('' + number).substring(add);
  }

  _createToken ({ _id, email }, thirdParty) {
    return this.jwt.sign({ user: { email }, thirdParty }, this.config.security.privateKey, {
      algorithm: this.config.security.algorithm,
      subject: _id.toString(),
      expiresIn: this.config.security.expirationTime,
    });
  }

  _decryptPass (password) {
    try {
      const decryptor = new this.RSA(this.config.security.privateKey);
      return decryptor.decrypt(password, 'utf8');
    } catch (err) {
      this.logger.error('Pass with wrong encryption', err);
      return Promise.reject({ statusCode: this.httpStatusCodes.UNAUTHORIZED });
    }
  }
  

  async login ({ email, password }) {
    const passDecrypted = this._decryptPass(password);
    let user = await this.userService.getUser({ email });
    if (user == null) {
      this.logger.error(`User with email ${email} doesn\'t exist in DB`);
      return Promise.reject({ statusCode: this.httpStatusCodes.UNAUTHORIZED, data: [ { i18nKey: 'user.notFound' } ]  });
    }
    const seed = crypto.createHash('sha256').update(`${user._id}${this.config.security.salt}`, 'utf8').digest('base64');
    const hashedPassword = crypto.createHash('sha256').update(`${passDecrypted}${seed}`, 'utf8').digest('base64');
    user = await this.userService.getUser({ email, password: hashedPassword });
    if (user == null) {
      this.logger.error(`User with email ${email} tried login, but failed password`);
      return Promise.reject({ statusCode: this.httpStatusCodes.UNAUTHORIZED, data: [ { i18nKey: 'user.notFound' } ]  });
    }
    const token = this._createToken(user, false);
    return { accessToken: token , tokenType: 'Bearer', user };
  }


}
