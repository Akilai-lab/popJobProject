const Sequelize = require('sequelize');
  
// connexion database

const connect = new Sequelize('popjob', 'root', '', {
    host : 'localhost',
    dialect: 'mysql',
    logging: false,
})
 // test de connexion à la db
connect.authenticate()
 .then(()=>{
     console.log('connecté à mysql')
 })
 .catch((err)=>{
     console.error('impossible de se connecter à mysql', err)
 }) 

// création des tables selon les modèles dans la base de donnée. 
connect.sync()
    .then(() => {
        console.log('table(s) créée(s) avec succès')
  }).catch(err => console.log(err)) 

module.exports = connect;