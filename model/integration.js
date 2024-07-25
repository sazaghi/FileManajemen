const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const User = require('./user');
const Document = require('./document');
const Folder = require('./folder')

const Integration = sequelize.define('Integration', {
    integrationID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    documentID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Document,
            key: 'documentID'
        }
    },
    folderID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Folder,
            key: 'folderID'
        }
    },
});

Integration.belongsTo(User, { foreignKey: 'userID' });
User.hasMany(Integration, { foreignKey: 'userID' });

Integration.belongsTo(Document, { foreignKey: 'documentID' });
Document.hasMany(Integration, { foreignKey: 'documentID' });

Integration.belongsTo(Folder, { foreignKey: 'folderID' })
Folder.hasOne(Integration, { foreignKey: 'folderID' })

module.exports = Integration;