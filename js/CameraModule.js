const container = document.querySelector(".container");
/*
const images = [
  
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
function show(value) {
  if(value=="Camera")  {
    document.getElementById(value).hidden = false;
    document.getElementById("Location").hidden = true;
    document.getElementById("Files").hidden = true;
    document.getElementById("Settings").hidden = true;
  }
  else if(value=="Location") {
    document.getElementById(value).hidden = false;
    document.getElementById("Camera").hidden = true;
    document.getElementById("Files").hidden = true;
    document.getElementById("Settings").hidden = true;
  }
  else if(value=="Files")  {
    document.getElementById(value).hidden = false;
    document.getElementById("Camera").hidden = true;
    document.getElementById("Location").hidden = true;
    document.getElementById("Settings").hidden = true;
  }
  else if(value=="Settings")  {
    document.getElementById(value).hidden = false;
    document.getElementById("Camera").hidden = true;
    document.getElementById("Location").hidden = true;
    document.getElementById("Files").hidden = true;
  }
  console.log("works" + value);
}

function getUserMedia(options, successCallback, failureCallback) {
  var api = navigator.getUserMedia || navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia || navigator.msGetUserMedia;
  if (api) {
    return api.bind(navigator)(options, successCallback, failureCallback);
  }
}

var theStream;
var theRecorder;
var recordedChunks = [];

function getStream(type) {
  if (!navigator.getUserMedia && !navigator.webkitGetUserMedia &&
    !navigator.mozGetUserMedia && !navigator.msGetUserMedia) {
    alert('User Media API not supported.');
    return;
  }
  
  var constraints = {};
  constraints[type] = true;

  getUserMedia(constraints, function (stream) {
    var mediaControl = document.querySelector(type);
    if ('srcObject' in mediaControl) {
      mediaControl.srcObject = stream;
    } else if (navigator.mozGetUserMedia) {
      mediaControl.mozSrcObject = stream;
    } else {
      mediaControl.src = (window.URL || window.webkitURL).createObjectURL(stream);
    }
    if(type=='video') {
      theStream = stream;
    }
    mediaControl.play();
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
      theImageTag.src = URL.createObjectURL(blob, {autorevoke : false });
      document.getElementById("TakenPhoto").hidden = false;

      var reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = function() {
        var base64data = reader.result;
        console.log(base64data);
        localStorage.setItem(Date.now(),base64data);

      }
    })
    .catch(err => alert('Error: ' + err));
}

function loadPicture()  {
    for(i = 0; i<localStorage.length; i++)  {
        var base64 = localStorage.getItem(localStorage.key(i));
        document.getElementById('tableBanner').src = base64;;
    }
}
/*
function downloadImg()  {
  var theImageTag = document.getElementById("imageTag");
  var a = document.createElement(theImageTag.src);
  a.download = 'picture.jpg';
  a.href = window.URL.createObjectURL(theImageTag.src);
  a.click();
  }
  */
//######################Geoloction-Feature#############
var target1 = document.getElementById('target1');
var watchId;

function appendLocation(location, verb) {
  verb = verb || 'updated';
  var newLocation = document.createElement('p');
  newLocation.innerHTML = 'Location ' + verb + ': ' + location.coords.latitude + ', ' + location.coords.longitude + '';
  target1.appendChild(newLocation);
}

if ('geolocation' in navigator) {
  document.getElementById('askButton').addEventListener('click', function () {
    navigator.geolocation.getCurrentPosition(function (location) {
      appendLocation(location, 'fetched');
    });
    watchId = navigator.geolocation.watchPosition(appendLocation);
  });
} else {
    target.innerText = 'Geolocation API not supported.';
}
//########################Device Position##############
if ('DeviceOrientationEvent' in window) {
  window.addEventListener('deviceorientation', deviceOrientationHandler, false);
} else {
  document.getElementById('logoContainer').innerText = 'Device Orientation API not supported.';
}

function deviceOrientationHandler (eventData) {
  var tiltLR = eventData.gamma;
  var tiltFB = eventData.beta;
  var dir = eventData.alpha;
  
  document.getElementById("doTiltLR").innerHTML = Math.round(tiltLR);
  document.getElementById("doTiltFB").innerHTML = Math.round(tiltFB);
  document.getElementById("doDirection").innerHTML = Math.round(dir);

  var logo = document.getElementById("imgLogo");
  logo.style.webkitTransform = "rotate(" + tiltLR + "deg) rotate3d(1,0,0, " + (tiltFB * -1) + "deg)";
  logo.style.MozTransform = "rotate(" + tiltLR + "deg)";
  logo.style.transform = "rotate(" + tiltLR + "deg) rotate3d(1,0,0, " + (tiltFB * -1) + "deg)";
}

//document.addEventListener("DOMContentLoaded", showPicture);


//############################Storage Quotas#############################

if ('storage' in navigator && 'estimate' in navigator.storage) {
  navigator.storage.estimate()
    .then(estimate => {
      document.getElementById('usage').innerHTML = estimate.usage;
      document.getElementById('quota').innerHTML = estimate.quota;
      document.getElementById('percent').innerHTML = (estimate.usage * 100 / estimate.quota).toFixed(0);
    });
}

if ('storage' in navigator && 'persisted' in navigator.storage) {
  navigator.storage.persisted()
    .then(persisted => {
      document.getElementById('persisted').innerHTML = persisted ? 'persisted' : 'not persisted';
    });
}

function requestPersistence() {
  if ('storage' in navigator && 'persist' in navigator.storage) {
    navigator.storage.persist()
      .then(persisted => {
        document.getElementById('persisted').innerHTML = persisted ? 'persisted' : 'not persisted';
      });
  }
}
function getUserMedia(options, successCallback, failureCallback) {
  var api = navigator.getUserMedia || navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia || navigator.msGetUserMedia;
  if (api) {
    return api.bind(navigator)(options, successCallback, failureCallback);
  }
}
//###################Kontakte auslesen###############
function readContacts() {
  var api = (navigator.contacts || navigator.mozContacts);
    
  if (api && !!api.select) { // new Chrome API
    api.select(['name', 'email'], {multiple: true})
      .then(function (contacts) {
        consoleLog('Found ' + contacts.length + ' contacts.');
        if (contacts.length) {
          consoleLog('First contact: ' + contacts[0].name + ' (' + contacts[0].email + ')');
        }
      })
      .catch(function (err) {
        consoleLog('Fetching contacts failed: ' + err.name);
      });
      
  } else if (api && !!api.find) { // old Firefox OS API
    var criteria = {
      sortBy: 'familyName',
      sortOrder: 'ascending'
    };

    api.find(criteria)
      .then(function (contacts) {
        consoleLog('Found ' + contacts.length + ' contacts.');
        if (contacts.length) {
          consoleLog('First contact: ' + contacts[0].givenName[0] + ' ' + contacts[0].familyName[0]);
        }
      })
      .catch(function (err) {
        consoleLog('Fetching contacts failed: ' + err.name);
      });
      
  } else {
    consoleLog('Contacts API not supported.');
  }
}

function consoleLog(data) {
  var logElement = document.getElementById('log');
  logElement.innerHTML += data + '\n';
}

//###################Read File#######################
function getReadFile(reader, i) {
  return function () {
    var li = document.querySelector('[data-idx="' + i + '"]');

    li.innerHTML += 'File starts with "' + reader.result.substr(0, 25) + '"';
  }
}

function readFiles(files) {
  document.getElementById('count').innerHTML = files.length;

  var target = document.getElementById('target');
  target.innerHTML = '';

  var file;
  for (var i = 0; i < files.length; ++i) {
    var item = document.createElement('li');
    item.setAttribute('data-idx', i);
    var file = files[i];

    var reader = new FileReader();
    reader.addEventListener('load', getReadFile(reader, i));
    reader.readAsText(file);

    item.innerHTML = '' + file.name + ', ' + file.type + ', ' + file.size + ' bytes, last modified ' + file.lastModifiedDate + '';
    target.appendChild(item);
  };
  caches.open("dev-coffee-site-v1")
      .then(cache => {
        cache.add(file);
      })
      .catch(console.log)
}
/*
async function writeFile() {
  if (!window.chooseFileSystemEntries) {
    alert('Native File System API not supported');
    return;
  }
  
  const target = document.getElementById('target');
  target.innerHTML = 'Opening file handle...';
  
  const handle = await window.chooseFileSystemEntries({
    type: 'save-file',
  });
  
  const file = await handle.getFile()
  const writer = await handle.createWriter();
  await writer.write(0, 'Hello world from What Web Can Do!');
  await writer.close()
}
*/

//###########Local Notification#################
var $status = document.getElementById('status');

if ('Notification' in window) {
  $status.innerText = Notification.permission;
}

function requestPermission() {
  if (!('Notification' in window)) {
    alert('Notification API not supported!');
    return;
  }
  
  Notification.requestPermission(function (result) {
    $status.innerText = result;
  });
}

function nonPersistentNotification() {
  if (!('Notification' in window)) {
    alert('Notification API not supported!');
    return;
  }
  
  try {
    //var notification = new Notification("Hi there - non-persistent!");
    serviceWorkerRegistration.showNotification();
  } catch (err) {
    alert('Notification API error: ' + err);
  }
}

function persistentNotification() {
  if (!('Notification' in window) || !('ServiceWorkerRegistration' in window)) {
    alert('Persistent Notification API not supported!');
    return;
  }
  
  try {
    navigator.serviceWorker.getRegistration()
      .then((reg) => reg.showNotification("Hi there - persistent!"))
      .catch((err) => alert('Service Worker registration error: ' + err));
  } catch (err) {
    alert('Notification API error: ' + err);
  }
}
//############Permissions##################
if ('permissions' in navigator) {
  var logTarget = document.getElementById('logTarget');

  function handleChange(permissionName, newState) {
    var timeBadge = new Date().toTimeString().split(' ')[0];
    var newStateInfo = document.createElement('p');
    newStateInfo.innerHTML = '' + timeBadge + ' State of ' + permissionName + ' permission status changed to ' + newState + '.';
    logTarget.appendChild(newStateInfo);
  }

  function checkPermission(permissionName, descriptor) {
    try {
    navigator.permissions.query(Object.assign({name: permissionName}, descriptor))
      .then(function (permission) {
        document.getElementById(permissionName + '-status').innerHTML = permission.state;
        permission.addEventListener('change', function (e) {
          document.getElementById(permissionName + '-status').innerHTML = permission.state;
          handleChange(permissionName, permission.state);
        });
      });
    } catch (e) {
    }
  }

  checkPermission('geolocation');
  checkPermission('notifications');
  checkPermission('push', {userVisibleOnly: true});
  checkPermission('midi', {sysex: true});
  checkPermission('camera');
  checkPermission('microphone');
  checkPermission('background-sync');
  checkPermission('ambient-light-sensor');
  checkPermission('accelerometer');
  checkPermission('gyroscope');
  checkPermission('magnetometer');

  var noop = function () {};
  navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
  
  function requestGeolocation() {
    navigator.geolocation.getCurrentPosition(noop);
  }

  function requestNotifications() {
    Notification.requestPermission();
  }

  function requestPush() {
    navigator.serviceWorker.getRegistration()
      .then(function (serviceWorkerRegistration) {
        serviceWorkerRegistration.pushManager.subscribe();
      });
  }

  function requestMidi() {
    navigator.requestMIDIAccess({sysex: true});
  }
  
  function requestCamera() {
    navigator.getUserMedia({video: true}, noop, noop)
  }
  
  function requestMicrophone() {
    navigator.getUserMedia({audio: true}, noop, noop)
  }
}
//###########Service Worker##############
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err));
  });
}

