var cleanup = require('./cleanup.js');

cleanup(function() {
  console.log('Setup finished.');
  process.exit();
});