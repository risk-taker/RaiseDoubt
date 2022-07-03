const express = require('express');
const router = express.Router();
const authController = require('./controllers/authController');
const commentController = require('./controllers/commentController');
const doubtController = require('./controllers/doubtController');
const auth = require('./middlewares/auth');

router.post('/signup', authController.register);
router.post('/login', authController.login);
router.get('/logout', auth, authController.logout);

//routes related to student
router.post('/askdoubt', auth, doubtController.askDoubt);
router.get('/questions', auth, doubtController.question);
router.put('/comment', auth, commentController.makeComment);
router.get('/comment/:id', auth, commentController.getComments);

//routes related to teacher
router.post('/answer/:id', auth, commentController.giveAnswer);
router.get('/resolved', auth, commentController.resolved);
router.get('/unsolved', auth, commentController.unsolved);

module.exports = router;