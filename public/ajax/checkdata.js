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
            }
        })
    });
}
function check_sensor_pir(){
    $("#check_sensor_pir").on("click", function(event) {
        event.preventDefault();
        let email = $("#data_email").val();
        $.ajax({
            url: `${window.location.origin}/home/check_sensor_pir`,
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
                    title: 'Found a bad person'
                    
                 })
                var audio = new Audio('../sound/sound.wav');
                audio.play();
                console.log('err');
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
              if(data.success){
                    console.log('login success')               
                    Swal.fire({
                        icon: 'success',
                        title: 'login success',
                      })
                    setTimeout(function(){
                    window.location.href = "/show_home";
                    }
                    ,2000)
                
            }else{
              Swal.fire({
                icon: 'error',
                title: 'Login fail',
                text: data.msg,
              })
            }
          },
            error: function(err) {
                Swal.fire({
                    icon: 'error',
                    title: 'login fail',
                    text: err.msg,
                  })
                console.log('err');
            }
        })
    });
}

function check_delete_email(x){
    console.log(x)
    Swal.fire({
        title: 'Are you sure?',
        text: "",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: `${window.location.origin}/admin_showemail/:data_id/delete_email`,
                method: "POST",
                data: {id: x},
    
                success: function(data) {
                        console.log('login success')               
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                          )
                        setTimeout(function(){
                        window.location.href = "/admin_showemail";
                        }
                        ,2000)
                    
                },
                error: function(err) {
                    Swal.fire({
                        icon: 'error',
                        title: 'login fail',
                        text: 'Something went wrong!',
                      })
                    console.log('err');
                }
            })
        }
      })
        
}

function check_delete_log(x){
    console.log(x)
    Swal.fire({
        title: 'Are you sure?',
        text: "",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: `${window.location.origin}/admin_showlog/:data_id/delete_log`,
                method: "POST",
                data: {id: x},
    
                success: function(data) {
                        console.log('login success')               
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                          )
                        setTimeout(function(){
                        window.location.href = "/admin_showlog";
                        }
                        ,2000)
                    
                },
                error: function(err) {
                    Swal.fire({
                        icon: 'error',
                        title: 'login fail',
                        text: 'Something went wrong!',
                      })
                    console.log('err');
                }
            })
        }
      })
        
}
function check_edit_email(x){
    //console.log('ggggggggggggggggg')
    let email = $("#email").val();
    let firstname = $("#firstname").val();
    let lastname = $("#lastname").val();
    let phonenumber = $("#phonenumber").val();
    let simnumber = $("#simnumber").val();
    let rank = $("#rank").val();
    let place = $("#place").val();
    $.ajax({
        url: `${window.location.origin}/admin_edit_email/:data_id/edit_email`,
        method: "POST",
        data: {email: email,firstname:firstname,lastname:lastname,phonenumber:phonenumber,simnumber:simnumber,rank: rank,place:place,id: x},

        success: function(data) {
          if(data.success){
            console.log('login success')               
                Swal.fire({
                    icon: 'success',
                    title: 'UPDATE success',
                  })
                setTimeout(function(){
                window.location.href = "/admin_showemail";
                }
                ,2000)
          }else{
            Swal.fire({
               icon: 'error',
               title: 'EDIT fail',
               text: data.msg,
             })
           }
                
            
        },
        error: function(err) {
            Swal.fire({
                icon: 'error',
                title: 'UPDATE fail',
                text: 'Something went wrong!',
              })
            console.log('err');
        }
    })
}

function check_edit_log(x){
    //console.log('ggggggggggggggggg')
    let email = $("#email").val();
    let updatedAt=$("#updatedAt").val();
    let log=$("#log").val();
    $.ajax({
        url: `${window.location.origin}/admin_edit_log/:data_id/edit_log`,
        method: "POST",
        data: {email: email,updatedAt:updatedAt,log:log,id: x},

        success: function(data) {
          if(data.success){
            console.log('login success')               
                Swal.fire({
                    icon: 'success',
                    title: 'UPDATE success',
                  })
                setTimeout(function(){
                window.location.href = "/admin_showlog";
                }
                ,2000)
          }else{
            Swal.fire({
               icon: 'error',
               title: 'EDIT fail',
               text: data.msg,
             })
           }
                
            
        },
        error: function(err) {
            Swal.fire({
                icon: 'error',
                title: 'UPDATE fail',
                text: 'Something went wrong!',
              })
            console.log('err');
        }
    })
}

function check_add_place(){
    Swal.fire({
        title: 'Submit your Base',
        input: 'text',
        showCancelButton: true,
        confirmButtonText: 'ADD',
        showLoaderOnConfirm: true,
        preConfirm: (value) => {
            if (!value) {
              Swal.showValidationMessage(
                'Your name is required'
              )
            }
          }
      }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
        url: `${window.location.origin}/admin_addplace_add`,
        method: "POST",
        data: {place: result.value},

        success: function(data) {
                console.log('login success')               
                Swal.fire({
                    icon: 'success',
                    title: 'ADD success',
                  })
                setTimeout(function(){
                window.location.href = "/admin_addplace";
                }
                ,2000)
            },
        error: function(err) {
            Swal.fire({
                icon: 'error',
                title: 'ADD fail',
                text: 'Something went wrong!',
              })
            console.log('err');
        }
    })
  }
    })
    }

    function check_delete_place(x){
        //console.log(x)
        Swal.fire({
            title: 'Are you sure?',
            text: "",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: `${window.location.origin}/admin_addplace/:data_id/delete_place`,
                    method: "POST",
                    data: {id: x},
                    
                    success: function(data) {
                      if(data.success){
                        console.log('login success')               
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                              )
                            setTimeout(function(){
                            window.location.href = "/admin_addplace";
                            }
                            ,2000)
                      }else{
                        Swal.fire({
                           icon: 'error',
                           title: 'Delete fail',
                           text: data.msg,
                         })
                       }
                            
                        
                    },
                    error: function(err) {
                        Swal.fire({
                            icon: 'error',
                            title: 'login fail',
                            text: 'Something went wrong!',
                          })
                        console.log('err');
                    }
                })
            }
          })
            
    }
function check_edit_place(x,x1){
        //console.log(x)
        //console.log(x1)
        Swal.fire({
            title: 'EDIT  Place',
            input: 'text',
            inputValue:x1,
            
            showCancelButton: true,
            confirmButtonText: 'UPDATE',
            showLoaderOnConfirm: true,
            preConfirm: (value) => {
                if (!value) {
                  Swal.showValidationMessage(
                    'Your name is required'
                  )
                }
              }
          }).then((result) => {
            if (result.isConfirmed) {
            $.ajax({
            
            url: `${window.location.origin}/admin_edit_place/:data_id/edit_place`,
            method: "POST",
            data: {place: result.value,id:x},
            
            success: function(data) {
              if(data.success){
              }
                    console.log('login success')               
                    Swal.fire({
                        icon: 'success',
                        title: 'UPDATE success',
                      })
                    setTimeout(function(){
                    window.location.href = "/admin_addplace";
                    }
                    ,2000)
            },
            error: function(err) {
                Swal.fire({
                    icon: 'error',
                    title: 'UPDATE fail',
                    text: 'Something went wrong!',
                  })
                console.log('err');
            }
        })
    }
        })
    }



    function check_add_device(x,x1){
      let email = x;
      let rank = x1;
      let place = $("#place").val();;
      let device_eui = $("#device_eui").val();
      let position = $("#position").val();
      let latitude = $("#latitude").val();
      let longitude = $("#longitude").val();
      $.ajax({
          url: `${window.location.origin}/admin_adddevice_add`,
          method: "POST",
          data: {email: email,longitude:longitude,latitude:latitude,rank: rank,position:position,device_eui:device_eui,place:place},
  
          success: function(data) {
            if(data.success){
              console.log('login success')               
                  Swal.fire({
                      icon: 'success',
                      title: 'ADD success',
                    })
                  setTimeout(function(){
                  window.location.href = "/admin_showdevice";
                  }
                  ,2000)
            }else{
              Swal.fire({
                icon: 'error',
                title: 'ADD fail',
                text: data.msg,
              })
            }
                  
              
          },
          error: function(err) {
              Swal.fire({
                  icon: 'error',
                  title: 'ADD fail',
                  text: 'Something went wrong!',
                })
              console.log('err');
          }
      })
  }
  

  function check_edit_device(x,x1,x2){
    let email = x;
    let device_eui = $("#device_eui").val();
    let position = $("#position").val();
    let latitude = $("#latitude").val();
    let longitude = $("#longitude").val();
    let rank = x1;
    let place = $("#place").val();;
    $.ajax({
        url: `${window.location.origin}/admin_edit_device/:data_id/edit_device`,
        method: "POST",
        data: {email: email,device_eui:device_eui,position:position,latitude:latitude,longitude:longitude,rank: rank,id: x2,place:place},

        success: function(data) {
          if(data.success){
            console.log('login success')               
                Swal.fire({
                    icon: 'success',
                    title: 'UPDATE success',
                  })
                setTimeout(function(){
                window.location.href = "/admin_showdevice";
                }
                ,2000)
          }else{
            Swal.fire({
              icon: 'error',
              title: 'EDIT fail',
              text: data.msg,
            })
          }
                
            
        },
        error: function(err) {
            Swal.fire({
                icon: 'error',
                title: 'UPDATE fail',
                text: 'Something went wrong!',
              })
            console.log('err');
        }
    })
}

function check_delete_device(x){
  console.log(x)
  Swal.fire({
      title: 'Are you sure?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
          $.ajax({
              url: `${window.location.origin}/admin_showdevice/:data_id/delete_device`,
              method: "POST",
              data: {id: x},
  
              success: function(data) {
                      console.log('login success')               
                      Swal.fire(
                          'Deleted!',
                          'Your file has been deleted.',
                          'success'
                        )
                      setTimeout(function(){
                      window.location.href = "/admin_showdevice";
                      }
                      ,2000)
                  
              },
              error: function(err) {
                  Swal.fire({
                      icon: 'error',
                      title: 'login fail',
                      text: 'Something went wrong!',
                    })
                  console.log('err');
              }
          })
      }
    })
}


function check_device_status(x1,status){
  let x;
  if(status == 0){
    x=1;
  }
  else if(status == 1){
    x=0;
  }
  let status1 = x;
  $.ajax({
      url: `${window.location.origin}/admin_device_status`,
      method: "POST",
      data: {id:x1,status:status1},

      success: function(data) {
              console.log('login success')               
              Swal.fire({
                  icon: 'success',
                  title: 'UPDATE success',
                })
              setTimeout(function(){
              window.location.href = "/admin_showdevice";
              }
              ,2000)
          
      },
      error: function(err) {
          Swal.fire({
              icon: 'error',
              title: 'UPDATE fail',
              text: 'Something went wrong!',
            })
          console.log('err');
      }
  })
}

function check_add_cctv(x,y){
  let email = x;
  let rank = y;
  let place = $("#place").val();
  let name = $("#name").val();
  let ip_port = $("#ip_port").val();
  let user = $("#user").val();
  let password = $("#password").val();
  let position = $("#position").val();
  let latitude = $("#latitude").val();
  let longitude = $("#longitude").val();
  $.ajax({
      url: `${window.location.origin}/admin_addcamera_add`,
      method: "POST",
      data: {email:email,name:name,ip_port:ip_port,user:user,password:password,position:position,latitude:latitude,longitude:longitude,rank:rank,place:place},

      success: function(data) {
        if(data.success){
          console.log('login success')               
              Swal.fire({
                  icon: 'success',
                  title: 'ADD success',
                })
              setTimeout(function(){
              window.location.href = "/show_home";
              }
              ,2000)
        }else{
          Swal.fire({
            icon: 'error',
            title: 'ADD fail',
            text: data.msg,
          })
        }  
      },
      error: function(err) {
          Swal.fire({
              icon: 'error',
              title: 'ADD fail',
              text: 'Something went wrong!',
            })
          console.log('err');
      }
  })
}

function check_edit_cctv(id,x,y){
  let email = x;
  let rank = y;
  let place = $("#place").val();;
  let name = $("#name").val();
  let ip_port = $("#ip_port").val();
  let user = $("#user").val();
  let password = $("#password").val();
  let position = $("#position").val();
  let latitude = $("#latitude").val();
  let longitude = $("#longitude").val();
  $.ajax({
      url: `${window.location.origin}/admin_edit_cctv`,
      method: "POST",
      data: {email:email,name:name,ip_port:ip_port,user:user,password:password,position:position,latitude:latitude,longitude:longitude,rank:rank,place:place,id:id},

      success: function(data) {
        if(data.success){
          console.log('login success')               
              Swal.fire({
                  icon: 'success',
                  title: 'UPDATE success',
                })
              setTimeout(function(){
              window.location.href = "/show_home";
              }
              ,2000)
        }else{
          Swal.fire({
             icon: 'error',
             title: 'EDIT fail',
             text: data.msg,
           })
         }
              
          
      },
      error: function(err) {
          Swal.fire({
              icon: 'error',
              title: 'UPDATE fail',
              text: 'Something went wrong!',
            })
          console.log('err');
      }
  })
}


function check_delete_cctv(x){
  //console.log(x)
  Swal.fire({
      title: 'Are you sure?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
          $.ajax({
              url: `${window.location.origin}/admin_delete_cctv`,
              method: "POST",
              data: {id: x},
  
              success: function(data) {
                      console.log('login success')               
                      Swal.fire(
                          'Deleted!',
                          'Your file has been deleted.',
                          'success'
                        )
                      setTimeout(function(){
                      window.location.href = "/show_home";
                      }
                      ,2000)
                  
              },
              error: function(err) {
                  Swal.fire({
                      icon: 'error',
                      title: 'login fail',
                      text: 'Something went wrong!',
                    })
                  console.log('err');
              }
          })
      }
    })
}

function cctv_update_status(x1,status){
  let x;
  if(status == 0){
    x=1;
  }
  else if(status == 1){
    x=0;
  }
  let status1 = x;
  $.ajax({
      url: `${window.location.origin}/admin_cctv_status`,
      method: "POST",
      data: {id:x1,status:status1},
  
      success: function(data) {
              console.log('change success')               
              Swal.fire({
                  icon: 'success',
                  title: 'UPDATE success',
                })
              setTimeout(function(){
              window.location.href = "/show_home";
              }
              ,2000)
          
      },
      error: function(err) {
          Swal.fire({
              icon: 'error',
              title: 'UPDATE fail',
              text: 'Something went wrong!',
            })
          console.log('err');
      }
  })
  }
$(document).ready(function() {
    check_data();
    check_login();
    check_sensor_pir();
});
