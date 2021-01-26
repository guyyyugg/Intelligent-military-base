// var player = require('play-sound')(opts = {})
function check_data(){
    $("#check_data").on("click", function(event) {
        event.preventDefault();
        let email = $("#data_email").val();
        $.ajax({
            url: `${window.location.origin}/home/check_data`,
            method: "POST",
            data: {email: email},

            success: function(data) {
                    console.log('hellow success')                
                     Toast.fire({
                    icon: 'success',
                    title: data.msg
                    })
                    // setTimeout(function(){
                    // window.location.href = "/home";
                    // }
                    // ,3000)
                
            },
            error: function(err) {
                // player.play('/sound/sound.wav', function(err){
                // console.log(err);
                // })
                Toast.fire({
                    icon: 'error',
                    title: err.responseJSON.msg
                    
                 })
                var audio = new Audio('../sound/sound.wav');
                audio.play();
                console.log('err');
                // setTimeout(function(){
                //     window.location.href = "/home";
                //     }
                //     ,5000)
                 //console.log(err.responseJSON.msg);
            }
        })
    });
}
function check_login(){
    $("#check_login").on("click", function(event) {
        event.preventDefault();
        let email = $("#email").val();
        let password = $("#password").val();
        $.ajax({
            url: `${window.location.origin}/login`,
            method: "POST",
            data: {email: email,password:password},

            success: function(data) {
                    console.log('login success')                
                     Toast.fire({
                    icon: 'success',
                    title: 'LOGIN SUCCESS'
                    })
                    setTimeout(function(){
                    window.location.href = "/home";
                    }
                    ,2000)
                
            },
            error: function(err) {
                // player.play('/sound/sound.wav', function(err){
                // console.log(err);
                // })
                Toast.fire({
                    icon: 'error',
                    title: 'LOGIN FAIL'
                    
                 })
                console.log('err');
                 //console.log(err.responseJSON.msg);
            }
        })
    });
}

$(document).ready(function() {
    check_data();
    check_login();
});
