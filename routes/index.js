var express = require('express');
var router = express.Router();

let landing = require('../controllers/landing');
let home = require('../controllers/home');
let user = require('../controllers/user');
let api = require('../controllers/api/mobile_api');

let {isLoggedIn, hasAuth} = require('../middleware/hasAuth.js')

router.get('/login',user.show_login);
router.get('/signup',user.show_signup);
router.post('/login',user.login);
router.post('/signup',user.signup);
router.post('/logout',user.logout);
router.get('/logout',user.logout);
/* GET home page. */
router.get('/', landing.get_landing);
router.post('/', landing.submit_lead);
router.get('/', landing.show_leads);

router.get('/home',isLoggedIn, home.home_show);
router.post('/home', home.submit_data);
router.post('/home/check_data', home.check_data);
router.post('/home/:data_id/delete',home.delete_data);



router.post('/mobile/api/data_person',api.data_person);
router.get('/mobile/api/data_person',api.data_person);


router.post('/mobile/api/check_login',api.check_login);
router.get('/mobile/api/check_login',api.check_login);


router.post('/mobile/api/login',api.login);
router.get('/mobile/api/login',api.login);

module.exports = router;
