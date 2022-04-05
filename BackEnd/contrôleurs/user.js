const User = require ('./../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res, next) => {
    bcrypt.hash( req.body.password , 10)
    .then( hash => {
         User.create({
             'name': req.body.name, 
             'lastName': req.body.lastName,
             'mail': req.body.email,
             'password':hash,
             'status': req.body.status
         })
         .then(() => {
             console.log(User);
             res.send(200);
         })
         .catch(error => {
             console.log(error);
             res.status(400).json({ error })
         });
     })
};
let idUser;

exports.login = async (req, res, next) => {
        User.findOne({ where: {mail: req.body.email} })
        .then(User => {
          console.log(User.password);
            idUser = User.id;
            console.log(idUser)
            if (!User) {
              return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, User.password)
            .then(() => {
              console.log(res);
              if (bcrypt.compare(req.body.password, User.password)===false) {
                return res.status(401).json({ error: "erreur d'authentification" });
              }
              res.status(200).json({
                  token: jwt.sign(
                    { userId: User.id },
                    'RANDOM_TOKEN_SECRET',
                    { expiresIn: '24h' }
                  )
              });
              console.log('hy');
              var Cookies = require( "cookies" );
              new Cookies(req,res).set('access_token',token, {
                httpOnly: true, //cookie not available through client js code
                secure: true // true to force https
              });
              console.log(idUser);
              })
            .catch(error =>{
              console.log(error)
              res.status(500).json({ error })
          })
          .catch(error => res.status(500).json({ error }));
        })
};
exports.aboutHim = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
  const userId = decodedToken.userId;
  console.log(userId);
  User.findOne({ where: {id: userId} })
  .then(user => {
    const info = {
      'status': user.status,
      'id':user.id};
    res.send(info)
  })
  .catch(error =>{
    console.log(error)
    res.status(500).json({ error })
  })
};
/**router.get('/allUser', user.allUsers); */
exports.allUsers = async (req, res, next) => {
  User.findAll({
    where: {
      status : 'Candidat'
    }
  })
  .then(user => {
    res.send(user)
  })
  .catch(error =>{
    console.log(error)
    res.status(500).json({ error })
  })
};
