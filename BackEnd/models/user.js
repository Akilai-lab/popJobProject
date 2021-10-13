const {Sequelize, DataTypes} = require('sequelize');
const db = require('../config/database');
const User =  db.define('users', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    status: {
        type: DataTypes.STRING(150),
        allowNull: true
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
    password: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
  {timestamps : false}
);
/**
 * Id : Incrémentation
 Name : varchar(155) 
Username : varchar(155)
Mail : text
Password : text
Status : true or false
1/Candidat    2 /Recruteur

Image : text
Profession : varchar(255)
Localisation (VILLE) : varchar(200)
Plateforme de Contact :varchar(255)
Disponibilités : number

 */
module.exports = User;