'use strict';

function SessionService (deps) {

  const {
    httpStatusCodes,
    jwt,
    RSA,
    crypto,
    logger,
    config,
    moment,
    userService,
    cache,
  } = deps;


  function _generateNumberWithNDigits (n) {
    const add = 1;
    let max = 12 - add;
    if ( n > max ) {
      return _generateNumberWithNDigits(max) + _generateNumberWithNDigits(n - max);
    }
    max = Math.pow(10, n+add);
    const min = max/10;
    const number = Math.floor( Math.random() * (max - min + 1) ) + min;
    return ('' + number).substring(add);
  }

  function _createToken ({ _id, email }, thirdParty) {
    return jwt.sign({ user: { email }, thirdParty }, config.security.privateKey, {
      algorithm: config.security.algorithm,
      subject: _id.toString(),
      expiresIn: config.security.expirationTime,
    });
  }

  function _decryptPass (password) {
    try {
      const decryptor = new RSA(config.security.privateKey);
      return decryptor.decrypt(password, 'utf8');
    } catch (err) {
      logger.error('Pass with wrong encryption', err);
      return Promise.reject({ statusCode: httpStatusCodes.UNAUTHORIZED });
    }
  }

  return {

    async login ({ email, password }) {
      const passDecrypted = _decryptPass(password);
      let user = await userService.getUser({ email });
      if (user == null) {
        logger.error(`User with email ${email} doesn\'t exist in DB`);
        return Promise.reject({ statusCode: httpStatusCodes.UNAUTHORIZED, data: [ { i18nKey: 'user.notFound' } ]  });
      }
      const seed = crypto.createHash('sha256').update(`${user._id}${config.security.salt}`, 'utf8').digest('base64');
      const hashedPassword = crypto.createHash('sha256').update(`${passDecrypted}${seed}`, 'utf8').digest('base64');
      user = await userService.getUser({ email, password: hashedPassword });
      if (user == null) {
        logger.error(`User with email ${email} tried login, but failed password`);
        return Promise.reject({ statusCode: httpStatusCodes.UNAUTHORIZED, data: [ { i18nKey: 'user.notFound' } ]  });
      }
      const token = _createToken(user, false);
      return { accessToken: token , tokenType: 'Bearer', user };
    },

  };

}

module.exports = SessionService;
