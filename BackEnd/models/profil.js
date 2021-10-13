const {Sequelize, DataTypes} = require('sequelize');
const db = require('../config/database');
const Profil =  db.define('profil', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    lastName: {
        type: DataTypes.STRING(150),
        allowNull: true
    },
    name: {
        type: DataTypes.STRING(150),
        allowNull: true
    },
    mail: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    profession: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    domaine: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    localisation: {
        type: DataTypes.STRING(150),
        allowNull: true
    },
    plateforme: {
        type: DataTypes.ENUM('valeur 1','valeur 2', 'valeur 3'),
        allowNull: true
    },
    disponibilitesDe: {
        type: DataTypes.STRING(200),
        allowNull: true
    },
    disponibilitesA: {
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
module.exports = Profil;