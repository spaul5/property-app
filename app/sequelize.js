var Sequelize = require('sequelize');

	sequelize = new Sequelize('postgres://ysepiqxaniprub:f1b8d95a2d2cd5be7f474ec39a66dc88dbc751e70cc572f85c8845ad7cb653b2@ec2-50-19-105-113.compute-1.amazonaws.com:5432/d3facv16tgqkmq?sslmode=require', {dialectOptions: {ssl: true}});
	module.exports = sequelize;