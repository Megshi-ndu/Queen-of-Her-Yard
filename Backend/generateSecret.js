const crypto = require('crypto');

// Generate a cryptographically secure random string
const generateJWTSecret = () => {
  return crypto.randomBytes(64).toString('hex');
};

// Generate and print the secret key
const jwtSecret = generateJWTSecret();
console.log('Generated JWT Secret Key:', jwtSecret);
module.exports = jwtSecret;
