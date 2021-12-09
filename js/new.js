function embeddedElement(id)  {
    console.log(document.getElementById(id).parentElement)
    //var x = document.getElementById(id).parentElement.innerHTML
    //x = document.getElementById(id).value;
}



if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      navigator.serviceWorker
        .register("/serviceWorker.js")
        .then(res => console.log("service worker registered"))
        .catch(err => console.log("service worker not registered", err));
    });
}
  
  
  