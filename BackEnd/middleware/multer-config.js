const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/doc':'doc',
  'image/docx':'docx',
  'image/pdf': 'pdf'

};

const storage = multer.diskStorage({
  //on indique où enregistrer les fichiers entrants comme des images
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    //on utilise le nom d'origine du fichier et on remplace les espaces par des _  
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
    //on utilise un timestamp(outil de conversion) Date.now() comme nom de fichier
    //puis l'extension du fichier
  }
});

module.exports = multer({storage: storage}).fields([{
  name: 'image', maxCount: 1
}, {
  name: 'fichier', maxCount: 1
}]);
//module.exports = multer({storage: storage}).single('image');
//on exporte le multer et indiquons que nous gérerons seulement les fichiers image