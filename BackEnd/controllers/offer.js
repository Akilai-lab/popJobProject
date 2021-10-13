const Offer = require ('./../models/offer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ReflectiveKey } = require('@angular/core');
const User = require('../models/user');

exports.addOffer = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    var d = new Date();
    var date = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
    console.log(date);
    /**    formData.append("title", title);
    formData.append("descript", story);
    formData.append("typeContrat", valeur); */
    console.log(req.body.title) // undefined
    console.log(req.body.descript) // undefined
    User.findOne({
        where: {
            id : userId
        }
    })
    .then(user=> {
        console.log(user.status)
        if(user.status == 'Recruteur') {
            Offer.create({ 
                'typeContrat': req.body.typeContrat, 
                'date': date,
                'descript': req.body.descript,
                'title': req.body.title,
                'userId' : userId
            })
            .then(offer => {
                console.log(userId);
                console.log(offer);
                res.send(offer);
                res.sendStatus(200);
            })
            .catch(error => {
                console.log(error);
                res.status(400).json({ error })
            });
        }  
    })
    .catch(error => {
        console.log(error);
        res.status(400).json({ error })
    }); 
};
/**akilaroha@hotmail.fr
 * 
 * mdp : machou1254
 */
exports.getOffers = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    let status;
    User.findOne({
        where:{
            id: userId
        }
    })
    .then(user=> {
        this.status = user.status
        if(this.status == 'Recruteur') {
            Offer.findAll({
                where: {
                    userId : userId
                }
            })    
            .then(offers => {
                console.log(offers);
                res.send(offers);
            })
            .catch(error => {
                console.log(error);
                res.status(400).json({ error })
            });
        }
        if(this.status == 'Candidat') {
            Offer.findAll()    
            .then(offers => {
                console.log(offers);
                res.send(offers);
            })
            .catch(error => {
                console.log(error);
                res.status(400).json({ error })
            });
        }
    })
    .catch(error => {
        console.log(error);
        res.status(400).json({ error })
    });
};
//router.get('/AllOffers', auth,multer, project.getAllOffers);
exports.getAllOffers = async (req, res, next) => {
    Offer.findAll()    
    .then(offers => {
        console.log(offers);
        res.send(offers);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error })
    });
};
exports.selectType = async (req, res, next) => {
    console.log(typeof req.body)
    console.log(req.body)
    console.log(req.body.typeContrat)
    
    Offer.findAll({
        where: {
            typeContrat : req.body.typeContrat    
        }
    })    
    .then(offers => {
        console.log(offers);
        res.send(offers);
    })
    .catch(error => {
        console.log(error);
        res.status(400).json({ error })
    });
};