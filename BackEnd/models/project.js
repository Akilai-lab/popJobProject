const {Sequelize, DataTypes} = require('sequelize');
const db = require('../config/database');
const Project =  db.define('project', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    link: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    file: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    descript: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    img: {
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
module.exports = Project;