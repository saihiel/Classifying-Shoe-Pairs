var buttonShoe1 = document.getElementById("shoe1");
var buttonShoe2 = document.getElementById("shoe2");
var buttonclassify = document.getElementById("classify");
var buttonReset = document.getElementById("reset");

(function() {
  // The width and height of the captured photo. We will set the
  // width to the value defined here, but the height will be
  // calculated based on the aspect ratio of the input stream.

  var width = 224;    // We will scale the photo width to this
  var height = 224;

  // |streaming| indicates whether or not we're currently streaming
  // video from the camera. Obviously, we start at false.

  var streaming = false;

  // The various HTML elements we need to configure or control. These
  // will be set by the startup() function.

  var video = null;
  var canvas1 = null;
  var canvas2 = null;

  function startup() {
    video = document.getElementById('video');
    canvas1 = document.getElementById('canvas1');
    canvas2 = document.getElementById('canvas2');
    buttonclassify.disabled=true;
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
    .then(function(stream) {
      video.style.cssText = "-moz-transform: scale(-1, 1); \
      -webkit-transform: scale(-1, 1); -o-transform: scale(-1, 1); \
      transform: scale(-1, 1); filter: FlipH;";
      video.srcObject = stream;
      video.play();
    })
    .catch(function(err) {
      console.log("An error occurred: " + err);
    });

    video.addEventListener('canplay', function(ev){
      if (!streaming) {
        // height = video.videoHeight / (video.videoWidth/width);
        //
        // // Firefox currently has a bug where the height can't be read from
        // // the video, so we will make assumptions if this happens.
        //
        // if (isNaN(height)) {
        //   height = width / (4/3);
        // }

        video.setAttribute('width', width);
        video.setAttribute('height', height);
        canvas1.setAttribute('width', width);
        canvas1.setAttribute('height', height);
        canvas2.setAttribute('width', width);
        canvas2.setAttribute('height', height);
        streaming = true;
      }
    }, false);
  buttonShoe1.addEventListener('click', function(ev){
      take_picture(canvas1, buttonShoe1, buttonShoe2);
      ev.preventDefault();
    }, false);
  buttonShoe2.addEventListener('click', function(ev){
    take_picture(canvas2, buttonShoe2, buttonShoe1);
    ev.preventDefault();
  }, false);
  buttonclassify.addEventListener('click', function(ev){
    classify();
    ev.preventDefault();
  }, false);
  buttonReset.addEventListener('click', function(ev){
    clearphoto(canvas1);
    clearphoto(canvas2);
    ev.preventDefault();
  }, false);
  clearphoto(canvas1);
  clearphoto(canvas2);
  }

  function classify(){
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "/classify");
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.send(JSON.stringify({ status: "classify" }));
      buttonShoe1.disabled = false;
      buttonShoe2.disabled = false;
      buttonclassify.disabled = true;
      xhr.onreadystatechange = function() {
          if (xhr.readyState == 4 && xhr.status == 200) {
              // alert(xhr.responseText);
            if (xhr.responseText=="1"){
              var main_txt = "Same Pair!";
              var txt = "We predict that the shoes come from the same pair!";
            }
            else{
              var main_txt = "Different Pairs!";
              var txt = "We predict that the shoes come from two different pairs!";
            }
            function JSalert(){
              swal(main_txt, txt, "success");
            }
            JSalert();
          }
      }
  }
    function clearphoto(canvas) {
    var context = canvas.getContext('2d');
    context.fillStyle = "#212121";
    // context.translate(-canvas.width, -canvas.height);
    canvas.width = width;
    canvas.height = height;
    // // translate context to center of canvas
    context.translate(canvas.width/2, canvas.height/2);
    // flip context horizontally
    context.scale(-1, 1);
    // context.drawImage(video, 0, 0, width, height);
    context.fillRect(-width/2, -height/2, width, height);
    buttonShoe1.disabled = false;
    buttonShoe2.disabled = false;
    buttonclassify.disabled = true;
  }

  // Capture a photo by fetching the current contents of the video
  // and drawing it into a canvas, then converting that to a PNG
  // format data URL. By drawing it on an offscreen canvas and then
  // drawing that to the screen, we can change its size and/or apply
  // other changes before drawing it.

  function take_picture(canvas, button_pressed, other_button) {
    var context = canvas.getContext('2d');
    if (width && height) {
      canvas.width = width;
      canvas.height = height;
      // // translate context to center of canvas
      context.translate(canvas.width/2, canvas.height/2);
      // flip context horizontally
      context.scale(-1, 1);
      // context.drawImage(video, 0, 0, width, height);
      context.drawImage(video, -width/2, -height/2, width, height);


      var data = canvas.toDataURL('image/png');
      // photo1.setAttribute('src', data);

      button_pressed.disabled = true;
      if (other_button.disabled){
          buttonclassify.disabled = false;
      }
      var xhr = new XMLHttpRequest();
      xhr.open("POST", '/receive_shoe');
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(JSON.stringify({ image: data }));

    } else {
      clearphoto(canvas);
    }

  }
  // Set up our event listener to run the startup process
  // once loading is complete.
  window.addEventListener('load', startup, false);
})();
// Fill the photo with an indication that none has been
// captured.
