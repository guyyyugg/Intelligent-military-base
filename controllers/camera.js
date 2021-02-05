const models = require('../models')
const {Howl, Howler} = require('howler');
var player = require('play-sound')(opts = {})
exports.camera_show = function(req, res, next) {
	res.render('camera/CCTV1', { title: 'Express'});
}
exports.camera_show1 = function(req, res, next) {
	res.render('camera/CCTV2', { title: 'Express'});
}
exports.camera_show2 = function(req, res, next) {
	res.render('camera/webcam1', { title: 'Express'});
}
exports.camera_show3 = function(req, res, next) {
	res.render('camera/webcam2', { title: 'Express'});
}
