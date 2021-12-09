function embeddedElement(id)  {
    var value = document.getElementById(id).innerHTML;
    var x = document.getElementById(id).parentElement.id;
    document.getElementById(x).innerHTML = value;
}



if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      navigator.serviceWorker
        .register("/serviceWorker.js")
        .then(res => console.log("service worker registered"))
        .catch(err => console.log("service worker not registered", err));
    });
}
  
  
  