var Sequelize = require('sequelize');

var attributes = {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: /^[a-z0-9\_\-]+$/i,
    }
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  },
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  salt: {
    type: Sequelize.STRING,
  },
  resetPasswordToken: {
    type: Sequelize.STRING,
  },
  resetPasswordExpires: {
    type: Sequelize.DATE,
  },
  bio: {
    type: Sequelize.TEXT,
  },
  phone: {
    type: Sequelize.INTEGER,
  },
  propertyRenting: {
    type: Sequelize.STRING,
  },
  propertyManager: {
    type: Sequelize.STRING,
  },
  billingInfo: {
    type: Sequelize.TEXT,
  },
  property: {
    type: Sequelize.INTEGER,
  },
  userType: {
    type: Sequelize.STRING
  }
};

var options = {
  freezeTableName: true
};

module.exports.attributes = attributes;
module.exports.options = options;