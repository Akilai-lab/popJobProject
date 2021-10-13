const {Sequelize, DataTypes} = require('sequelize');
const db = require('../config/database');
const Offer =  db.define('offer', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    typeContrat : {
        type: DataTypes.STRING(150),
        allowNull: true
    },
    date: {
        type: DataTypes.DATE,
        allowNull: true
      },
    descript: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    title: {
        type: DataTypes.STRING(200),
        allowNull: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
  },
  {timestamps : false}
);
module.exports = Offer;