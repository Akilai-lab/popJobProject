const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    //const token = req.headers.authorization;
    try {
      const token = req.headers.authorization.split(' ')[1];
      console.log(token);
      /*error*/
      const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
      //console.log(decodedToken);
      const userId = decodedToken.userId;
      console.log(userId)
      /*error*/
      
      if (req.body.userId && req.body.userId !== userId) {
        console.log('ne marche pas')
        throw 'Invalid user ID';
        //si la requête de l'userId n'est pas égal à l'userId on a une erreur
      } else {
        next();
      }
    } catch {
      res.status(401).json({
        error: new Error('Invalid request!')
      });
    }
};