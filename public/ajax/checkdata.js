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

    //             setTimeout(function(){
				// 	window.location.href = "/";
				// }
    //             ,2000)
                
            },
            error: function(err) {
                // player.play('/sound/sound.wav', function(err){
                // console.log(err);
                // })
                var audio = new Audio('../sound/sound.wav');
                audio.play();
                console.log('err');
     //            Toast.fire({
					// icon: 'error',
     //                title: err.responseJSON.msg
                    
     //             })

                 //console.log(err.responseJSON.msg);
                 
                //alert("Your email or password entered is incorrect. Please try again!");
            }
        })
    });
}

$(document).ready(function() {
    check_data();
});
