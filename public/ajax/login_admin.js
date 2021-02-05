function admin_login(){
    $("#admin_login").on("click", function(event) {
        event.preventDefault();
        let email = $("#email").val();
        let password = $("#password").val();
        $.ajax({
            url: `${window.location.origin}/admin_login`,
            method: "POST",
            data: {email: email,password:password},

            success: function(data) {
                    console.log('login success')                
                     Toast.fire({
                    icon: 'success',
                    title: 'LOGIN SUCCESS'
                    })
                    setTimeout(function(){
                    window.location.href = "/admin_home";
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
    admin_login();
});
