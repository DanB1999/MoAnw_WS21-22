if (ons.platform.isAndroid()) {
    const inputItems = document.querySelectorAll('.input-items');
    for (i = 0; i < inputItems.length; i++) {
      inputItems[i].hasAttribute('modifier') ?
        inputItems[i].setAttribute('modifier', inputItems[i].getAttribute('modifier') + ' nodivider') :
        inputItems[i].setAttribute('modifier', 'nodivider');
    }
  }
  var searchInput = document.getElementById('search-input');
  var updateInputs = function (event) {
    searchInput.value = event.target.value;
    document.getElementById('name-display').innerHTML = event.target.value !== '' ? `Hello ${event.target.value}!` : 'Hello anonymous!';
  }
  //searchInput.addEventListener('input', updateInputs);



// Standort abfragen 
var target = document.getElementById('target');
var watchId;




  
  document.getElementById('model-switch').addEventListener('change', function (event) {
    if (event.value) {
        console.log("worked");
        if ('geolocation' in navigator) {
              navigator.geolocation.getCurrentPosition(function (location) {
                appendLocation(location, 'fetched');
              });
              watchId = navigator.geolocation.watchPosition(appendLocation);
            
          } else {
            target.innerText = 'Geolocation API not supported.';
          }

    } else {
        target.innerHTML="";
    }
  });

  function appendLocation(location, verb) {
    verb = verb || 'updated';
    //Google Geocoding API angfragen:
    //"https://maps.googleapis.com/maps/api/geocode/json?latlng="+location.coords.latitude+","+location.coords.longitude+"&key=API_KEY"
    //var newLocation = document.createElement('p');
    target.innerHTML = 'Location ' + verb + ': ' + location.coords.latitude + ', ' + location.coords.longitude + '';
    //target.appendChild(newLocation);
  }