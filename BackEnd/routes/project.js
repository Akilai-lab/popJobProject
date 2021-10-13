const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const project = require('../controllers/project');

router.get('/AllProjects', multer, project.getAllProjects);
router.get('/Projects', auth,multer, project.getProjects);
router.post('/Projects/:id', multer, project.getProjectsFilter);
router.post('/newProject', auth, multer, project.addProject);

module.exports = router;