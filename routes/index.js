const users = require('./user.js');

module.exports = (app) => {
  app.use('/users', users);
};
