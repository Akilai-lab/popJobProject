const express = require('express');

const app = express();
const { Sequelize , DataTypes } = require('sequelize');
const path = require('path');
const bodyParser = require("body-parser");
const cors = require('cors');
const user = require('./routes/user');
const project = require ('./routes/project');
const Offer = require('./routes/offer');
const Profil = require('./routes/profil');

app.use((req, res, next) => {
  res.status(201);
  next();
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});  

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.json());

var cookie = require('cookie');
var escapeHtml = require('escape-html');
var http = require('http');
var url = require('url');

function onRequest(req, res) {
  // Parse the query string
  var query = url.parse(req.url, true, true).query;

  if (query && query.name) {
    // Set a new cookie with the name
    res.setHeader('Set-Cookie', cookie.serialize('name', String(query.name), {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7 // 1 week
    }));

    // Redirect back after setting cookie
    res.statusCode = 302;
    res.setHeader('Location', req.headers.referer || '/');
    res.end();
    return;
  }

  // Parse the cookies on the request
  var cookies = cookie.parse(req.headers.cookie || '');

  // Get the visitor name set in the cookie
  var name = cookies.name;

  res.setHeader('Content-Type', 'text/html; charset=UTF-8');

  if (name) {
    res.write('<p>Welcome back, <b>' + escapeHtml(name) + '</b>!</p>');
  } else {
    res.write('<p>Hello, new visitor!</p>');
  }

  res.write('<form method="GET">');
  res.write('<input placeholder="enter your name" name="name"> <input type="submit" value="Set Name">');
  res.end('</form>');
}
http.createServer(onRequest).listen(3030);
/**créer un bloc et router vers /localhost:3030/ pour envoyer les données envoyées par l'utilisateur 
 * et qu'une fois envoyées au localhost, que ca soit récupéré dans les cookies*/
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/user', user);
app.use('/api/project', project);
app.use('/api/offer', Offer);
app.use('/api/profil', Profil);
module.exports = app;