function check_add_device(x,x1,x2){
  let email = x;
  let rank = x1;
  let place = x2;
  let device_eui = $("#device_eui").val();
  let position = $("#position").val();
  let latitude = $("#latitude").val();
  let longitude = $("#longitude").val();
  $.ajax({
      url: `${window.location.origin}/user1_adddevice_add`,
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
              window.location.href = "/user1_adddevice";
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





  function check_edit_device(x,x1,x2,x3){
    //console.log('ggggggggggggggggg')
  
    let email = x;
    let device_eui = $("#device_eui").val();
    let position = $("#position").val();
    let latitude = $("#latitude").val();
    let longitude = $("#longitude").val();
    let rank = x1;
    let place = x3;
    $.ajax({
        url: `${window.location.origin}/user1_edit_device/:data_id/edit_device`,
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
                window.location.href = "/user1_showdevice";
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
              url: `${window.location.origin}/user1_showdevice/:data_id/delete_device`,
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
                      window.location.href = "/user1_showdevice";
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
      url: `${window.location.origin}/user1_device_status`,
      method: "POST",
      data: {id:x1,status:status1},
  
      success: function(data) {
              console.log('login success')               
              Swal.fire({
                  icon: 'success',
                  title: 'UPDATE success',
                })
              setTimeout(function(){
              window.location.href = "/user1_showdevice";
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







  function check_add_cctv(x,y,z){
    let email = x;
    let rank = y;
    let place = z;
    let name = $("#name").val();
    let ip_port = $("#ip_port").val();
    let user = $("#user").val();
    let password = $("#password").val();
    let position = $("#position").val();
    let latitude = $("#latitude").val();
    let longitude = $("#longitude").val();
    $.ajax({
        url: `${window.location.origin}/user1_addcamera_add`,
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
  


  function check_edit_cctv(id,x,y,z){
    let email = x;
    let rank = y;
    let place = z;
    let name = $("#name").val();
    let ip_port = $("#ip_port").val();
    let user = $("#user").val();
    let password = $("#password").val();
    let position = $("#position").val();
    let latitude = $("#latitude").val();
    let longitude = $("#longitude").val();
    $.ajax({
        url: `${window.location.origin}/user1_edit_cctv`,
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
                url: `${window.location.origin}/user1_delete_cctv`,
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