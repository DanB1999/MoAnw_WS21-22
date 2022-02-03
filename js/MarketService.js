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


window.fn.pushPage = function (page, anim) {
    if (anim) {
      document.getElementById('appNavigator').pushPage(page.id, { data: { title: page.title }, animation: anim });
    } else {
      document.getElementById('appNavigator').pushPage(page.id, { data: { title: page.title } });
    }
  };


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

// Meine Märkte 
const markets= [
    {
        "name": "Rewe Center Rodgau",
        "address": "Feldstraße 46, 63110 Rodgau Dudenhofen",

    },
    {
        "name": "Rewe Center Frankfurt",
        "address": "Mainzer Landstraße 330-360, 65933 Frankfurt am Main"
    },
    {
        "name": "Rewe Center Langen",
        "address": "Kurt-Schumacher-Ring 4, 63329 Egelsbach"
    },
]
document.getElementById("markets-page").addEventListener("load", function() {
    loadMarkets();
}) 



function loadMarkets()  {
    markets.forEach(elem =>{
        loadMarkets(elem);
    })
}

function loadMarkets(elem)  {
    var cardElement = "<ons-card><img src='https://monaca.io/img/logos/download_image_onsenui_01.png' alt='Onsen UI' style='width: 100%''>"+
    "<div class='name'>" + elem.name + "</div><div class='content'><ons-list><ons-list-item>" + elem.address + "</ons-list-item></ons-list></div></ons-card>"
    
    const listItem = document.createElement('ons-list-item');
    listItem.innerHTML=cardElement;
    document.getElementById('ons-list').appendChild(listItem);
}

 /*  this.querySelector('ons-toolbar div.center').textContent = this.data.title;
  var toolbarButton = ons.platform.isAndroid() ? ons.createElement(`<ons-icon icon="md-more-vert"></ons-icon>`) : ons.createElement(`<span>More</span>`);
  var infoButton = document.getElementById('info-button');
  infoButton.appendChild(toolbarButton);
  var toastDialog = document.getElementById('toast-dialog');
  toastDialog.parentNode.removeChild(toastDialog);
  document.getElementById('dialogs-page').appendChild(toastDialog);
  var timeoutID = 0;
  window.fn.showDialog = function (id) {
    var elem = document.getElementById(id);
    if (id === 'popover-dialog') {
      elem.show(infoButton);
    } else {
      elem.show();
      if (id === 'modal-dialog') {
        clearTimeout(timeoutID);
        timeoutID = setTimeout(function() { fn.hideDialog(id) }, 2000);
      }
    }
  };
  window.fn.hideDialog = function (id) {
    document.getElementById(id).hide();
  };
  const moreOptions = document.querySelectorAll('.more-options');
  if (!ons.platform.isAndroid()) {
    document.getElementById('watHmmSure-dialog').setAttribute('modifier', 'rowfooter');
    for (option of moreOptions) {
      option.hasAttribute('modifier') ?
        option.setAttribute('modifier', option.getAttribute('modifier') + ' longdivider') :
        option.setAttribute('modifier', 'longdivider');
    }
  } else {
    for (option of moreOptions) {
      option.hasAttribute('modifier') ?
        option.setAttribute('modifier', option.getAttribute('modifier') + ' nodivider') :
        option.setAttribute('modifier', 'nodivider');
    }
  }
};
document.getElementById('appNavigator').topPage.onDestroy = function () {
  var toastDialog = document.getElementById('toast-dialog');
  toastDialog.parentNode.removeChild(toastDialog);
  document.querySelector('#dialogs-page .page__content').appendChild(toastDialog); */