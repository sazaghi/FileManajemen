const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const Integration = require('./integration');
const User = require('./user');

const Access = sequelize.define('Access', {
    accesID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    integrationID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Integration,
            key: 'integrationID'
        }
    },
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'userID'
        }
    },
});

Access.belongsTo(User, { foreignKey: 'userID' });
User.hasMany(Access, { foreignKey: 'userID' });

Access.belongsTo(Integration, { foreignKey: 'integrationID' });
Integration.hasMany(Access, { foreignKey: 'integrationID' });

module.exports = Access;
