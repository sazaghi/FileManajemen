const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Document = sequelize.define('Document', {
    documentID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    documentName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: true
    },
});

module.exports = Document;