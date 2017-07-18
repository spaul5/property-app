var PropertyManagerMeta = require('./PropertyManager.js'),
	PropertyMeta = require('./Property.js'),
	TenantMeta = require('./Tenant.js'),
    connection = require('../sequelize.js');

// models defined with sequelize.define ('name', {attributes}, {options})
var PropertyManager = connection.define('propertymanagers', PropertyManagerMeta.attributes, PropertyManagerMeta.options);
var Property = connection.define('properties', PropertyMeta.attributes, PropertyMeta.options);
var Tenant = connection.define('tenants', TenantMeta.attributes, TenantMeta.options);
// you can define relationships here

module.exports.PropertyManager = PropertyManager;
module.exports.Property = Property;
module.exports.Tenant = Tenant;