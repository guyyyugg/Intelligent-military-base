function play() {
  var audio = new Audio('https://firebasestorage.googleapis.com/v0/b/adad-aaf50.appspot.com/o/sound.mp3?alt=media&token=f1fc2f6c-c781-4551-9129-e439866f647b');
  audio.play();
	setTimeout(function () {
       window.location.href = "/home"; //will redirect to your blog page (an ex: blog.html)
    	}, 5000);
    }
