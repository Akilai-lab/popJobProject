const User = require ('./../models/user');
const Profil = require ('./../models/profil');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**akilaroha@hotmail.fr
 * 
 * mdp : machou1254
 */

exports.updateProfil = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    let image;
    var files = [];
    Profil.findOne({ where: {userId: userId} })
    .then(profil => {
        let domaine = req.body.domaine;
        console.log(typeof domaine);
        console.log('test')
        if(domaine == "back") {
            domaine = 'Développeur Back End';
            console.log(domaine);
        }
        if(domaine == "fullStack") {
            domaine = 'Développeur Full Stack';
        }
        if(domaine == "front") {
            domaine = 'Développeur Front End';
        }
        if(domaine == "illustrator") {
            domaine = 'Illustrateur';
        }
        if(domaine == "graphiste") {
            domaine = 'Graphiste';
        }
        if(domaine == "peintre") {
            domaine = 'Artiste Peintre';
        }
        if(domaine == 'photographe') {
            domaine = 'Photographe';
        }
        if(domaine == 'designer') {
            domaine = 'Designer';
        }
        if(domaine == 'creator') {
            domaine = 'Créateur de jeux';
        }
        if(domaine == 'music') {
            domaine = 'Musicien';
        }
        if(req.files) {
            var fileKeys = Object.keys(req.files);
            fileKeys.forEach(function(key) {
                files.push(req.files[key]);
            });
            for(let i of files){
                for(let j = 0; j <= i.length; j++) {
                    console.log(typeof i[j])
                    Profil.update({
                        'lastName' : req.body.prenom,
                        'name' : req.body.nom,
                        'mail' : req.body.mail,
                        'image' : image,
                        'profession' : req.body.profession,
                        'localisation' : req.body.localisation,
                        'domaine' : req.body.domaine,
                        'plateforme' : (req.body.firstLink,req.body.scndLink,req.body.phone),
                        'disponibilitesDe': req.body.start,
                        'disponibilitesA' : req.body.end
                    },
                    {where:{userId : userId}})
                    .then(() => {
                        console.log(profil);
                        console.log('after');
                        res.status(200).json();
                    })
                    .catch(error => {
                        res.status(400).json({ error })
                    })
                    if(i[j].fieldname == 'image'){
                        image = `${req.protocol}://${req.get('host')}/images/${i[j].filename}`;
                        console.log(image)
                        if(!profil) {
                            console.log(image)
                            Profil.create({
                                'lastName' : req.body.prenom,
                                'name' : req.body.nom,
                                'mail' : req.body.mail,
                                'image' : image,
                                'profession' : req.body.profession,
                                'localisation' : req.body.localisation,
                                'domaine' : req.body.domaine,
                                'plateforme' : (req.body.firstLink,req.body.scndLink,req.body.phone),
                                'disponibilitesDe': req.body.start,
                                'disponibilitesA' : req.body.end,
                                'userId' : userId
                            })
                            .then(() => {
                                console.log(profil);
                                console.log('after');
                                res.send(200);
                            })
                            .catch(error => {
                                console.log(error);
                                res.status(400).json({ error })
                            });
                        }
                        console.log(image)
                        Profil.update({
                            'lastName' : req.body.prenom,
                            'name' : req.body.nom,
                            'mail' : req.body.mail,
                            'image' : image,
                            'profession' : req.body.profession,
                            'localisation' : req.body.localisation,
                            'domaine' : req.body.domaine,
                            'plateforme' : (req.body.firstLink,req.body.scndLink,req.body.phone),
                            'disponibilitesDe': req.body.start,
                            'disponibilitesA' : req.body.end
                        },
                        {where:{userId : userId}})
                        .then(() => {
                            console.log(profil);
                            console.log('after');
                            res.status(200).json();
                        })
                        .catch(error => {
                            res.status(400).json({ error })
                        })
                        if(!profil) {
                            console.log(image)
                            Profil.create({
                                'lastName' : req.body.prenom,
                                'name' : req.body.nom,
                                'mail' : req.body.mail,
                                'image' : image,
                                'profession' : req.body.profession,
                                'localisation' : req.body.localisation,
                                'domaine' : req.body.domaine,
                                'plateforme' : (req.body.firstLink,req.body.scndLink,req.body.phone),
                                'disponibilitesDe': req.body.start,
                                'disponibilitesA' : req.body.end,
                                'userId' : userId
                            })
                            .then(() => {
                                console.log(profil);
                                console.log('after');
                                res.send(200);
                            })
                            .catch(error => {
                                console.log(error);
                                res.status(400).json({ error })
                            });
                        }
                    }
                }
            }
        }
        Profil.update({
            'lastName' : req.body.prenom,
            'name' : req.body.nom,
            'mail' : req.body.mail,
            'image' : image,
            'profession' : req.body.profession,
            'localisation' : req.body.localisation,
            'domaine' : req.body.domaine,
            'plateforme' : (req.body.firstLink,req.body.scndLink,req.body.phone),
            'disponibilitesDe': req.body.start,
            'disponibilitesA' : req.body.end
        },
        {where:{userId : userId}})
        .then(() => {
            console.log(profil);
            console.log('after');
            res.status(200).json();
        })
        .catch(error => {
            res.status(400).json({ error })
        })
    })
    .catch(error => {
        console.log(error)
    })
};

exports.gettInfo = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    console.log(userId);
    Profil.findAll()
    .then(profils => {
        console.log(profils)
        res.send(profils)
    })
    .catch(err => {
        console.log(err)
    })
};

exports.postDomaine = async (req, res, next) => {
    let newDomaine = req.body.domaine
    if(req.body.status == 'Candidat') {
        User.findAll({
            where: {
                status: 'Recruteur'
            }
        })
        .then(user=> {
            console.log(user)
            let id;
            user.forEach(scnudelement => {
                id = scnudelement.id
            });
            Profil.findAll({
                where: {
                    'domaine' : newDomaine,
                    'userId' : id
                }
            })
            .then(response => {
                res.send(response)
            })
            .catch(err=> {
                console.error(err);
            })
        })
        .catch(error => {
            console.error(error);
        })
    }
    else if (req.body.status =='Recruteur') {
        User.findAll({
            where: {
                status: 'Candidat'
            }
        })
        .then(user=> {
            console.log(user)
            let idCandidat;
            user.forEach(scnudelement => {
                idCandidat = scnudelement.id
            });
            Profil.findAll({
                where: {
                    'domaine' : newDomaine,
                    'userId' : idCandidat
                }
            })
            .then(response => {
                res.send(response)
            })
            .catch(err=> {
                console.error(err);
            })
        })
        .catch(error => {
            console.error(error);
        })
    }
    else {
        console.log('problem');
    }
};

exports.filterDispo = async (req, res, next) => {
    console.log(req.body)
    Profil.findAll()
    .then(profils => {
        console.log('profil')
        console.log(profils)
        let start = req.body.start;
        let end = req.body.end;
        res.send(profils,start,end)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ error })
    })
};