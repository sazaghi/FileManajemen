const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Folder = sequelize.define('Folder', {
    folderID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    folderName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Folder;