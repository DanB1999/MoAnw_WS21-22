const container = document.querySelector(".container");
/*
const coffees = [
  {
    name: "Perspiciatis",
    image: "images/coffee1.jpg"
  },
  {
    name: "Voluptatem",
    image: "images/coffee2.jpg"
  },
  {
    name: "Explicabo",
    image: "images/coffee3.jpg"
  },
  {
    name: "Rchitecto",
    image: "images/coffee4.jpg"
  },
  {
    name: " Beatae",
    image: "images/coffee5.jpg"
  },
  {
    name: " Vitae",
    image: "images/coffee6.jpg"
  },
  {
    name: "Inventore",
    image: "images/coffee7.jpg"
  },
  {
    name: "Veritatis",
    image: "images/coffee8.jpg"
  },
  {
    name: "Accusantium",
    image: "images/coffee9.jpg"
  }
];
const showCoffees = () => {
  let output = "";
  coffees.forEach(
    ({ name, image }) =>
      (output += `
              <div class="card">
                <img class="card--avatar" src=${image} />
                <h1 class="card--title">${name}</h1>
                <a class="card--link" href="#">Taste</a>
              </div>
              `)
  );
  container.innerHTML = output;
};
*/
function getUserMedia(options, successCallback, failureCallback) {
  var api = navigator.getUserMedia || navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia || navigator.msGetUserMedia;
  if (api) {
    return api.bind(navigator)(options, successCallback, failureCallback);
  }
}

var theStream;

function getStream() {
  if (!navigator.getUserMedia && !navigator.webkitGetUserMedia &&
    !navigator.mozGetUserMedia && !navigator.msGetUserMedia) {
    alert('User Media API not supported.');
    return;
  }
  
  var constraints = {
    video: true
  };

  getUserMedia(constraints, function (stream) {
    var mediaControl = document.querySelector('video');
    if ('srcObject' in mediaControl) {
      mediaControl.srcObject = stream;
    } else if (navigator.mozGetUserMedia) {
      mediaControl.mozSrcObject = stream;
    } else {
      mediaControl.src = (window.URL || window.webkitURL).createObjectURL(stream);
    }
    theStream = stream;
  }, function (err) {
    alert('Error: ' + err);
  });
}

function takePhoto() {
  if (!('ImageCapture' in window)) {
    alert('ImageCapture is not available');
    return;
  }
  
  if (!theStream) {
    alert('Grab the video stream first!');
    return;
  }
  
  var theImageCapturer = new ImageCapture(theStream.getVideoTracks()[0]);
  theImageCapturer.takePhoto()
    .then(blob => {
      
      var theImageTag = document.getElementById("imageTag");
      theImageTag.src = URL.createObjectURL(blob);
      
      console.log(blob);

      imgData = getBase64Image(blob);
      localStorage.setItem("picture", imgData); 
      console.log(imgData);

      }
    ).catch(err => alert('Error: ' + err));

    
    
    
}
function loadPicture()  {
  var dataImage = localStorage.getItem('picture');
  document.getElementById('tableBanner').src = "data:image/png;base64," + dataImage;;
}


function getBase64Image(img) {
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;

  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);

  var dataURL = canvas.toDataURL("image/png");

  return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}
function getBase64Im(blob) {
  var base64data;
  var reader = new FileReader();
  reader.readAsDataURL(blob); 
  var base64data = reader.result;               
  console.log(base64data);
return base64data;
}




//document.addEventListener("DOMContentLoaded", showPicture);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err));
  });
}


