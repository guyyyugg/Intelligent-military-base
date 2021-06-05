var express = require('express');
var router = express.Router();

let landing = require('../controllers/landing');
let home = require('../controllers/home');
let camera = require('../controllers/camera');
let user = require('../controllers/user');
let api = require('../controllers/api/mobile_api');
let api2 = require('../controllers/api/http_api');
let user1 = require('../controllers/user1/user1_home');
let user2 = require('../controllers/user2/user2_home');
let user3 = require('../controllers/user3/user3_home');
let admin = require('../controllers/admin/admin_home');
var multer = require('multer')();
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
router.post('/home/check_sensor_pir', home.check_sensor_pir);
router.post('/home/:data_id/delete',home.delete_data);
router.post('/home/:data_id/delete_email',home.delete_email);


router.get('/home/CCTV1', camera.camera_show);
router.get('/home/CCTV2', camera.camera_show1);
router.get('/home/webcam1', camera.camera_show2);
router.get('/home/webcam2', camera.camera_show3);





//user1
router.get('/user1_home',hasAuth, user1.user1_show);

router.get('/user1_adddevice',hasAuth, user1.user1_adddevice);
router.post('/user1_adddevice_add',hasAuth, user1.user1_adddevice_add);

router.get('/user1_addcamera',hasAuth, user1.user1_addcamera);

router.get('/user1_showdevice',hasAuth, user1.user1_showdevice);
router.get('/user1_editdevice/:data_id',hasAuth, user1.user1_editdevice);
router.post('/user1_edit_device/:data_id/edit_device',hasAuth, user1.edit_device);
router.post('/user1_showdevice/:data_id/delete_device',hasAuth,user1.delete_device);
router.post('/user1_device_status',hasAuth,user1.edit_device_status);

router.post('/user1_addcamera_add',hasAuth,user1.user1_addcamera_add);
router.get('/user1_edit_cctv/:data_id',hasAuth, user1.user1_edit_cctv);
router.post('/user1_edit_cctv', hasAuth,user1.user1_edit_cctv_update);
router.post('/user1_delete_cctv', hasAuth,user1.delete_cctv);

router.get('/user1_show_cctv/:data_id',hasAuth, user1.user1_show_cctv);


//user2
router.get('/user2_home',hasAuth, user2.user2_show);
router.get('/user2_signup',hasAuth, user2.user2_showsignup);
router.get('/user2_showlog',hasAuth, user2.user2_showlog);
router.get('/user2_showemail',hasAuth, user2.user2_showemail);
router.post('/user2_signup',hasAuth, user2.user2_signup);
router.get('/user2_addcamera', hasAuth,user2.user2_addcamera);

router.get('/user2_adddevice',hasAuth, user2.user2_adddevice);
router.post('/user2_adddevice_add',hasAuth, user2.user2_adddevice_add);


router.get('/user2_showdevice',hasAuth, user2.user2_showdevice);
router.get('/user2_editdevice/:data_id',hasAuth, user2.user2_editdevice);
router.post('/user2_edit_device/:data_id/edit_device',hasAuth, user2.edit_device);
router.post('/user2_showdevice/:data_id/delete_device',hasAuth,user2.delete_device);
router.post('/user2_device_status',hasAuth,user2.edit_device_status);
//router.post('/user2_showemail/:data_id/delete_email',user2.delete_email);

router.post('/user2_addcamera_add',hasAuth,user2.user2_addcamera_add);
router.get('/user2_edit_cctv/:data_id',hasAuth, user2.user2_edit_cctv);
router.post('/user2_edit_cctv',hasAuth, user2.user2_edit_cctv_update);
router.post('/user2_delete_cctv',hasAuth, user2.delete_cctv);

router.post('/user2_cctv_status', hasAuth,user2.user2_cctv_status);


//user3
router.get('/user3_home', hasAuth,user3.user3_show);
router.get('/user3_signup',hasAuth, user3.user3_showsignup);
router.get('/user3_showlog',hasAuth, user3.user3_showlog);
router.get('/user3_showemail',hasAuth, user3.user3_showemail);
router.post('/user3_showemail/:data_id/delete_email',hasAuth,user3.delete_email);
router.post('/user3_showlog/:data_id/delete_log',hasAuth,user3.delete_log);
router.post('/user3_signup', hasAuth,user3.user3_signup);
router.get('/user3_addcamera', hasAuth,user3.user3_addcamera);
router.post('/user3_home/record_cctv',hasAuth,user3.record_cctv1);

router.get('/user3_edit_email/:data_id',hasAuth, user3.user3_edit_email);
router.post('/user3_edit_email/:data_id/edit_email',hasAuth,user3.edit_email);

router.get('/user3_edit_log/:data_id',hasAuth, user3.user3_edit_log);
router.post('/user3_edit_log/:data_id/edit_log', hasAuth,user3.edit_log);

router.get('/user3_addplace',hasAuth, user3.user3_addplace);
router.post('/user3_addplace_add', hasAuth,user3.user3_addplace_add);
router.post('/user3_addplace/:data_id/delete_place',hasAuth,user3.delete_place);
router.post('/user3_edit_place/:data_id/edit_place',hasAuth, user3.edit_place);

router.get('/user3_showdevice',hasAuth, user3.user3_showdevice);
router.get('/user3_editdevice/:data_id',hasAuth, user3.user3_editdevice);
router.post('/user3_edit_device/:data_id/edit_device', hasAuth,user3.edit_device);
router.post('/user3_showdevice/:data_id/delete_device',hasAuth,user3.delete_device);
router.post('/user3_device_status',hasAuth,user3.edit_device_status);
router.get('/user3_adddevice',hasAuth, user3.user3_adddevice);
router.post('/user3_adddevice_add',hasAuth, user3.user3_adddevice_add);



router.post('/user3_addcamera_add',hasAuth,user3.user3_addcamera_add);
router.get('/user3_edit_cctv/:data_id',hasAuth, user3.user3_edit_cctv);
router.post('/user3_edit_cctv',hasAuth, user3.user3_edit_cctv_update);
router.post('/user3_delete_cctv',hasAuth, user3.delete_cctv);


router.post('/user3_cctv_status',hasAuth, user3.user3_cctv_status);
//admin/user4
// router.get('/admin_home',admin.admin_show);
router.get('/admin_signup', hasAuth,admin.admin_showsignup);

router.get('/admin_addcamera', hasAuth,admin.admin_addcamera);

router.get('/admin_showlog', hasAuth,admin.admin_showlog);
router.get('/admin_showemail',hasAuth, admin.admin_showemail);
router.get('/admin_edit_email/:data_id',hasAuth, admin.admin_edit_email);
router.get('/admin_edit_log/:data_id',hasAuth, admin.admin_edit_log);

router.get('/admin_adddevice',hasAuth, admin.admin_adddevice);
router.post('/admin_adddevice_add',hasAuth, admin.admin_adddevice_add);

router.get('/admin_addplace',hasAuth, admin.admin_addplace);
router.post('/admin_addplace_add', hasAuth,admin.admin_addplace_add);
router.post('/admin_addplace/:data_id/delete_place',hasAuth,admin.delete_place);
router.post('/admin_edit_place/:data_id/edit_place', hasAuth,admin.edit_place);
//router.get('/admin_edit_log', admin.admin_edit_log);
router.post('/admin_edit_email/:data_id/edit_email',hasAuth, admin.edit_email);
router.post('/admin_edit_log/:data_id/edit_log', hasAuth,admin.edit_log);
router.post('/admin_signup',hasAuth, admin.admin_signup);
router.post('/admin_showemail/:data_id/delete_email',hasAuth,admin.delete_email);
router.post('/admin_showlog/:data_id/delete_log',hasAuth,admin.delete_log);
router.post('/admin_home/record_cctv',hasAuth,admin.record_cctv1);


router.get('/admin_showdevice', hasAuth,admin.admin_showdevice);
router.get('/admin_editdevice/:data_id',hasAuth, admin.admin_editdevice);
router.post('/admin_edit_device/:data_id/edit_device',hasAuth, admin.edit_device);
router.post('/admin_showdevice/:data_id/delete_device',hasAuth,admin.delete_device);
router.post('/admin_device_status',hasAuth,admin.edit_device_status);

router.post('/admin_addcamera_add',hasAuth,admin.admin_addcamera_add);
router.get('/admin_edit_cctv/:data_id',hasAuth, admin.admin_edit_cctv);
router.post('/admin_edit_cctv',hasAuth, admin.admin_edit_cctv_update);
router.post('/admin_delete_cctv',hasAuth, admin.delete_cctv);


router.post('/admin_cctv_status', hasAuth,admin.admin_cctv_status);
// router.post('/admin_home/:data_id/delete_email',home.delete_email);



router.get('/show_home',hasAuth,admin.admin_show);






//api
router.post('/mobile/api/data_person',api.data_person);
router.get('/mobile/api/data_person',api.data_person);


router.post('/mobile/api/check_login',api.check_login);
router.get('/mobile/api/check_login',api.check_login);


router.post('/mobile/api/login',api.login);
router.get('/mobile/api/login',api.login);


router.post('/mobile/api/Showlog',api.Showlog);
router.get('/mobile/api/Showlog',api.Showlog);

router.post('/mobile/api/Showemail',api.Showemail);
router.get('/mobile/api/Showemail',api.Showemail);

router.post('/mobile/api/Signup',api.Signup);
router.get('/mobile/api/Signup',api.Signup);

router.post('/mobile/api/Showplace',api.Showplace);
router.get('/mobile/api/Showplace',api.Showplace);

router.post('/mobile/api/edit_place',api.edit_place);
router.get('/mobile/api/edit_place',api.edit_place);


router.post('/mobile/api/edit_email',api.edit_email);
router.get('/mobile/api/edit_email',api.edit_email);


router.post('/mobile/api/delete_log',api.delete_log);
router.get('/mobile/api/delete_log',api.delete_log);

router.post('/mobile/api/delete_place',api.delete_place);
router.get('/mobile/api/delete_place',api.delete_place);

router.post('/mobile/api/delete_email',api.delete_email);
router.get('/mobile/api/delete_email',api.delete_email);



router.post('/mobile/api/edit_log',api.edit_log);
router.get('/mobile/api/edit_log',api.edit_log);


router.post('/mobile/api/Showdevice',api.Showdevice);
router.get('/mobile/api/Showdevice',api.Showdevice);

router.post('/mobile/api/admin_adddevice_add',api.admin_adddevice_add);
router.get('/mobile/api/admin_adddevice_add',api.admin_adddevice_add);


router.post('/mobile/api/admin_addcamera_add',api.admin_addcamera_add);
router.get('/mobile/api/admin_addcamera_add',api.admin_addcamera_add);


router.post('/mobile/api/Showcctv',api.Showcctv);
router.get('/mobile/api/Showcctv',api.Showcctv);


router.post('/mobile/api/edit_device',api.edit_device);
router.get('/mobile/api/edit_device',api.edit_device);


router.post('/mobile/api/delete_device',api.delete_device);
router.get('/mobile/api/delete_device',api.delete_device);


router.post('/mobile/api/admin_edit_cctv_update',api.admin_edit_cctv_update);
router.get('/mobile/api/admin_edit_cctv_update',api.admin_edit_cctv_update);


router.post('/mobile/api/delete_cctv',api.delete_cctv);
router.get('/mobile/api/delete_cctv',api.delete_cctv);

router.post('/mobile/api/cctv_status',api.cctv_status);
router.get('/mobile/api/cctv_status',api.cctv_status);


router.post('/mobile/api/showcctv_forplace',api.showcctv_forplace);
router.get('/mobile/api/showcctv_forplace',api.showcctv_forplace);


router.post('/mobile/api/addplace_add',api.addplace_add);
router.get('/mobile/api/addplace_add',api.addplace_add);


router.post('/mobile/api/showcctv_forsoldier',api.showcctv_forsoldier);
router.get('/mobile/api/showcctv_forsoldier',api.showcctv_forsoldier);

//http_chirpstack
router.post('/chirpstack/api/http',api2.http_integration);
router.get('/chirpstack/api/http',api2.http_integration);

//cctv
router.post('/cctv_alert',home.cctv_alert);
router.post("/upload", multer.single('file'),home.upload);
module.exports = router;


///home/guy/myapp/public/images