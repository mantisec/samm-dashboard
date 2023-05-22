const env = require('./env.js');
module.exports = {
  'secret': env.app_secret,
  ROLEs: ['USER', 'ADMIN', 'AUDITOR']
};
