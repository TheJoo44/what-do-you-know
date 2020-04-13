const router = require('express').Router();
const usersCtrl = require('../../controllers/users');

router.post('/signup', usersCtrl.signup);
router.post('/login', usersCtrl.login);
router.use(require('../../config/auth'));
// router.post('/results', userCtrl.results);

module.exports = router;