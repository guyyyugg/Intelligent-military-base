var express = require('express');
var router = express.Router();

let landing = require('../controllers/landing');
let home = require('../controllers/home');
let user = require('../controllers/user')
router.get('/login',user.show_login);
router.get('/signup',user.show_signup);
router.post('/login',user.login);
router.post('/signup',user.signup);
/* GET home page. */
router.get('/', landing.get_landing);
router.post('/', landing.submit_lead);
router.get('/home', home.home_show);

module.exports = router;
