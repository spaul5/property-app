var Model = require('./app/model/models.js');

module.exports = function(callback) {
  // recreate PropertyManager table
  Model.PropertyManager.sync({ force: true }).then(function() {
    // create username with username: propertyManager and 
    // password: propertyManager
    Model.PropertyManager.create({
      username: 'propertyManager',
      password: 'propertyManager',
      userType: 'propertyManager'
    }).then(callback);
  });

    // recreate Property table
  Model.Property.sync({ force: true }).then(function() {
    // create dummy property
    Model.Property.create({
      street: '2140 Fulton Street',
      city: 'San Francisco',
      state: 'California'
    }).then(callback);
  });

  // recreate Tenant table
  Model.Tenant.sync({ force: true }).then(function() {
    // create username with username: tenant and 
    // password: tenant
    Model.Tenant.create({
      username: 'tenant',
      password: 'tenant',
      userType: 'tenant'
    }).then(callback);
  });
};

