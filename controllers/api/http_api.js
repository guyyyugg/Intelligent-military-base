let models = require("../../models");
let bcrypt = require("bcrypt");
const passport = require('passport');
const myPassport = require('../../passport_setup')(passport);
let flash = require('connect-flash');
const {isEmpty} = require('lodash');
const { validateUser } = require('../../validators/signup');
var path = require('path');
const https = require('https')
const fs = require('fs')


global.count = 0;
global.count_num=0;




 async function updateOrCreate (deviceId, jsonData) {


    console.log(jsonData)
    var guy = jsonData['guy'];
    //let no2 = jsonData['NO2'];
    //let battery = jsonData['battery'];
    //let led = jsonData['led'];
    //let pressure = jsonData['pressure'];
    //let temperature = jsonData['temperature'];
    //let humidity = jsonData['humidity'];
    //var pm1 = jsonData['pm1_0'];
    //var pm2_5 = jsonData['pm2_5'];
    //var pm10 = jsonData['pm10_0'];
	var pir = jsonData['pir'];
    var camera0 = jsonData['camera0'];
    var camera1 = jsonData['camera1'];
    var camera2 = jsonData['camera2'];
    var camera3 = jsonData['camera3'];
    var camera4 = jsonData['camera4'];
    var camera5 = jsonData['camera5'];
    var camera6 = jsonData['camera6'];
    var camera7 = jsonData['camera7'];
    var camera8 = jsonData['camera8'];
    var camera9 = jsonData['camera9'];

    
    if (guy != undefined){
        if(guy == 'endder'){
            console.log('endder');
        //
        global.io.emit('end_send','send picture success');
        count=0;
        count_num=0;   
        }
        else if(guy == 'endsound'){
            console.log('endsound');
        global.io.emit('end_sendsound','send mac wifi success');
        count=0;
        count_num=0;
        }
        else if(guy == 'endwifi'){
            console.log('endwifi');
        global.io.emit('end_sendwifi','send sound success');
        count=0;
        count_num=0;
        }
        
    }
    if(camera0 != undefined && camera1 != undefined && camera2 != undefined && camera3 != undefined && camera4 != undefined && camera5 != undefined && camera6 != undefined&& camera7 != undefined && camera8 != undefined&& camera9 != undefined)
        {
            console.log('count',count);
            console.log('count_num',count_num);
            if(count == 0){
                console.log('camera have data');
                //var socket = io;
                models.Device.findOne({
                    where : {
                        device_eui : deviceId
                    }
                }).then(data =>{
                    global.io.emit('alert_one',data);
                    count = count+1;    
                    //console.log(data.email)
                })
                
                // socket.off();
            }
            count_num=0;
       
    }else{
        
        if(count_num == 9){
            console.log('count_num == 9');
            count = 0
            count_num=0
            console.log('re status countttttttttttttt')
        }
        else{
            console.log('count_num + 1');
            count_num =count_num +1
            
        }
    }

/*
    //console.log(camera9);
    if(camera0 && camera1 && camera2 && camera3 && camera4 && camera5 && camera6 && camera7 && camera8  && camera9 ){
        console.log('ssssssssssssssssssssssss')
    }*/
    var insertItem = {

        //id: 0,
        device_eui: deviceId,
        status : 0
    };

    var updateItem = {

        //id: 0,
        device_eui: deviceId,
        //deviceStatus: 1,
        //plans: "plans_id",

        //status:pir,
        //createdAt,

    };


    // First try to find the record
   const foundItem = await models.Device.findOne({where: { device_eui: deviceId }});
   if (!foundItem) {
        // Item not found, create a new one
        const item = await models.Device.create(insertItem)
        return  {item, created: true};
    }

    
    // Found an item, update it
    const item = await models.Device.update(updateItem, 
        {
            where: { device_eui: deviceId }
        });
    //console.log(updateItem);
    return {item, created: false};
    
}






exports.http_integration = function(req, res, next) {
	
if(!req.body.error){
   
   

   
    var deviceId = req.body.devEUI;
    //console.log(deviceId)

    //console.log("guy")
    
    //console.log(JSON.stringify(req.body.objectJSON))

    var stringify = JSON.parse(req.body.objectJSON);

    //var picture = stringify['picture'];
    //console.log(stringify);
    //var picture = JSON.parse(req.body.objectJSON)
    //var picture1 = jsonData['picture'];
    //var sensorEnable = stringify['isEnable'];

   
    //var no2 = stringify['NO2'];
    //var battery = stringify['battery'];
    //var led = stringify['led'];
    //var pressure = stringify['pressure'];
    //var temperature = stringify['temperature'];
    //var humidity = stringify['humidity'];

    



    //check in db


    

    //console.log(checkInDB(deviceId));



    updateOrCreate(deviceId,stringify);
   
/*
    if(checkInDB(deviceId)){
        console.log('Found!');
    }else{
        //insert
        //insertDB(deviceId,stringify);
        console.log('Not found!');
    }


  
*/

    //console.log(stringify);

    /*for (var i = 0; i < stringify.length; i++) {
        console.log(stringify[i]['NO2']);
    }*/


		res.status(200).json({success:true});
	}else{

		res.status(200).json({success:false});
	}

	/*if(req.url != '/uplink?event=up'){
		console.log(req.body);
		res.status(200).json({success:true});
	}else{

		res.status(200).json({success:true});
	}
*/
	

	


	//console.log(JSON.stringify(req.body));

	//if(req.body.applicationID >0)

		//console.log(req.body.objectJSON);

	//next();
	//res.send(req.body);    // echo the result back

}