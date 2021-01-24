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
                    setTimeout(function(){
                    window.location.href = "/home";
                    }
                    ,3000)
                
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
                setTimeout(function(){
                    window.location.href = "/home";
                    }
                    ,5000)
                 //console.log(err.responseJSON.msg);
            }
        })
    });
}

$(document).ready(function() {
    check_data();
});
