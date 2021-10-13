const Project = require ('./../models/project');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ReflectiveKey } = require('@angular/core');

exports.addProject = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    var d = new Date();
    var date = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
    console.log(date);

var files = [];
var fileKeys = Object.keys(req.files);
let image;
let folder;
let link;
if(req.body.link != undefined) {
    link = req.body.link;
    console.log(link)
}
fileKeys.forEach(function(key) {
    files.push(req.files[key]);
});
for(let i of files){
    for(let j = 0; j <= i.length; j++) {
        console.log(typeof i[j])
        if(i[j].fieldname == 'image'){
            //console.log(j.filename);//affiche le nom
            image = `${req.protocol}://${req.get('host')}/images/${i[j].filename}`;
            //console.log(image)
            if(userId.status == 'Candidat') {
            Project.create({ 
                'link': link, 
                'date': date,
                'img': image,
                'file': folder,
                'descript': req.body.descript,
                'title': req.body.title,
                'userId' : userId
                })
                .then(() => {
                    console.log(userId);
                    res.sendStatus(200);
                })
                .catch(error => {
                    console.log(error);
                    res.status(400).json({ error })
                });
            }
        }
       
        if(i[j].fieldname == 'fichier'){
            //console.log(j.filename);//affiche le nom
            folder = `${req.protocol}://${req.get('host')}/images/${i[j].filename}`;
            //console.log(folder)
            if(userId.status == 'Candidat') {
            Project.create({ 
                'link': link, 
                'date': date,
                'img': image,
                'file': folder,
                'descript': req.body.descript,
                'title': req.body.title,
                'userId' : userId
                })
                .then(() => {
                    console.log(userId);
                    res.sendStatus(200);
                })
                .catch(error => {
                    console.log(error);
                    res.status(400).json({ error })
                });
            }
        }
    }
}
};
/**akilaroha@hotmail.fr
 * 
 * mdp : machou1254
 */
//router.get('/AllProjects', multer, project.getAllProjects);
//axios.get("http://localhost:3000/api/project/AllProjects")
exports.getAllProjects = async (req, res, next) => {
    console.log('test')
    Project.findAll()    
    .then(projects => {
        console.log(projects);
        res.send(projects);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error })
    });
};
exports.getProjects = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    Project.findAll({
        where: {
            userId : userId
        }
    })    
    .then(projects => {
        console.log(projects);
        res.send(projects);
    })
    .catch(error => {
        console.log(error);
        res.status(400).json({ error })
    });
};
//router.post('/Projects/:id', multer, project.getProjectsFilter);
exports.getProjectsFilter = async (req, res, next) => {
    Project.findAll({
        where: {
            userId : userId
        }
    })    
    .then(projects => {
        console.log(projects);
        res.send(projects);
    })
    .catch(error => {
        console.log(error);
        res.status(400).json({ error })
    });
};
/**router.post('/typeEmploi', project.selectType); */
exports.selectType = async (req, res, next) => {
    console.log('test')
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    Project.findAll({
        where: {
            userId : userId
        }
    })    
    .then(projects => {
        console.log(projects);
        res.send(projects);
    })
    .catch(error => {
        console.log(error);
        res.status(400).json({ error })
    });
};