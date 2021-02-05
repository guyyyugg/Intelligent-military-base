var express = require('express');
var router = express.Router();

let landing = require('../controllers/landing');
let home = require('../controllers/home');
let camera = require('../controllers/camera');
let user = require('../controllers/user');
let api = require('../controllers/api/mobile_api');

let user1 = require('../controllers/user1/user1_home');
let user2 = require('../controllers/user2/user2_home');
let user3 = require('../controllers/user3/user3_home');
let admin = require('../controllers/admin/admin_home');

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
router.post('/home/:data_id/delete_email',home.delete_email);


router.get('/home/CCTV1', camera.camera_show);
router.get('/home/CCTV2', camera.camera_show1);
router.get('/home/webcam1', camera.camera_show2);
router.get('/home/webcam2', camera.camera_show3);





//user1
router.get('/user1_home', user1.user1_show);



//user2
router.get('/user2_home', user2.user2_show);
router.get('/user2_signup', user2.user2_showsignup);
router.post('/user2_signup', user2.user2_signup);




//user3
router.get('/user3_home', user3.user3_show);
router.get('/user3_signup', user3.user3_showsignup);
router.post('/user3_signup', user3.user3_signup);
router.post('/user3_home/record_cctv',user3.record_cctv1);




//admin/user4
router.get('/admin_home',admin.admin_show);
router.get('/admin_signup', admin.admin_showsignup);
router.post('/admin_signup', admin.admin_signup);
router.post('/admin_home/:data_id/delete_email',admin.delete_email);
router.post('/admin_home/record_cctv',admin.record_cctv1);







//api
router.post('/mobile/api/data_person',api.data_person);
router.get('/mobile/api/data_person',api.data_person);


router.post('/mobile/api/check_login',api.check_login);
router.get('/mobile/api/check_login',api.check_login);


router.post('/mobile/api/login',api.login);
router.get('/mobile/api/login',api.login);

module.exports = router;
