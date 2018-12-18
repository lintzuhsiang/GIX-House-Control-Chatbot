/* This function checks and sets up the camera */
function OpenCamera() {
    dbRef = firebase.database().ref('/');
    if($('input#camera').val()=='Turn off camera'){
      TurnOffCamera();
    }
    else if($('input#camera').val()=='Open Camera'){
      TurnOnCamera();
    }
  }


function TurnOnCamera(){
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(handleUserMediaSuccess);
  }
    camera = true;
  dbRef.update({"camera":"on"});
   dbRef.on("value",moveEyeBall);
  dbRef.on("value",detectface);
//store image to firebase

// while(camera==true){
//   setInterval(function(){
//       // dbRef.on("value", detectface);
//     dbRef.on("value", moveEyeBall);
//   },500)
//   }

    var storageRef = storage.ref();
    // myURL = storageRef.child("new_image2.png");
    // myURL.getDownloadURL().then(function(url){
    // console.log("url",url);
    // imageObj = document.getElementById("myImage");
    // imageObj.style.width="550px";
    // imageObj.src = url;
    // imageObj.style.visibility = 'visible';

    // canvas = document.getElementById("mainCanvas");
    // canvas.style.width = "500px";
    // canvas.style.height="500px";
    // var context = canvas.getContext('2d');
    // var imageObj = new Image();
    //  imageObj.onload = function() {
    //     context.drawImage(imageObj, 400, 400);
    //   };
    //   imageObj.src = url;
// });
    // image2url(uploadURL)


    $('input#camera').val('Turn off camera')
    $('input#camera').off('click').on('click',TurnOffCamera)
}
function TurnOffCamera(){
  var track = mediaStream.getTracks()[0];
  track.stop();
  //video.src = "";
   // if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
   //     navigator.mediaDevices
   //    .getUserMedia({ video: true })
   //    .then(handleUserMediaRelease);
   //  }
  camera = false;
  // imageObj.style.visibility = 'hidden';

  dbRef.update({"camera":"off"})
    dbRef.update({"me":"off"})
    dbRef.update({"label":"off"})

  $('input#camera').off('click').on('click',TurnOnCamera)
  $('input#camera').val('Open Camera')
}

function image2url(callback){
  var canvas = document.getElementById("mainCanvas");
  var data = canvas.toDataURL();
  var commaIndex = data.indexOf(",");
  imgstring = data.substring(commaIndex+1,data.length);
    callback(imgstring)
}
function uploadURL(imgstring){
  console.log(imgstring.length)
   dbRef.update({"imageURL":imgstring});
}
var mediaStream = null;
/* This function initiates the camera video */
function handleUserMediaSuccess(stream) {
  var video = document.getElementById("myVideo");
  video.src = window.URL.createObjectURL(stream);
  //video.play();
  mediaStream = stream;
  /* We will capture an image twice every second */
    //window.setInterval(captureImageFromVideo, 500);
    window.setInterval("captureImageFromVideo(testBrightness)", 500);
}

function handleUserMediaRelease(stream){
  var video = document.getElementById("myVideo");
  var myURL = window.URL || window.webkitURL
  video.src = myURL.createObjectURL(stream);
  video.play();
  console.log("releaase called");
  var track = stream.getTracks()[0];
  track.stop();
}

function testBrightness(brightness) {
   var bright = document.getElementById("CanvasLight")
    bright.style.padding="20px";
    bright.style.textAlign = "center";
  if (brightness<100){
    bright.innerHTML="your camera are blocked."
  }else{bright.innerHTML=""}
}


/* This function captures the video */
function captureImageFromVideo(callback) {
  var canvas = document.getElementById("mainCanvas");
  var context = canvas.getContext("2d");
  var video = document.getElementById("myVideo");

  canvas.setAttribute("width", video.width);
  canvas.setAttribute("height", video.height);
  context.drawImage(video, 0, 0, video.width, video.height);

  // Here is how you would process the image to turn it into a grayscale image
  var dataObj = context.getImageData(0, 0, canvas.width, canvas.height);
  
  // Now data is a long, flat array containing the RGB values of each pixel
  var data = dataObj.data;
  // console.log(data[0],data[1],data[2])
  var colorSum=0;
  var avg = 0;
  for (var i = 0; i < data.length; i += 4) {
    var gray = 0.333 * (data[i] + data[i + 1] + data[i + 2]);

    // data[i] = gray;
    // data[i + 1] = gray;
    // data[i + 2] = gray;
  }
  for(var i=0;i<data.length;i+=4){
    //colorSum = colorSum + Math.floor((data[i]+data[i+1]+data[i+2])/3);
      colorSum = colorSum + Math.floor(gray);
  }
  var brightness = colorSum/(video.width*video.height) //Math.floor(colorSum/(video.width*video.height))
  context.putImageData(dataObj, 0, 0);
  callback(brightness)
}
