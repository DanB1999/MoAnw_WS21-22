class costObject {
   constructor(desc, date, cat, amount, balance)    {
       this.desc = desc;
       this.date = date;
       this.cat = cat;
       this.amount = amount;
       this.balance = balance;
   }
}

const costObjects = new Array;
const attributes = new Array;
var balance = 0;
var counter = 0;

function embeddedElement(id)  {
    var desc, date, cat, amount;
    var value = document.getElementById(id).value;
    var x = document.getElementById(id).parentElement.id;
    document.getElementById(x).innerHTML = value;
    attributes.push(value);
    if(value.typeof(Number)) balance -= value;
    counter++;
    if(counter = 0) desc = value;
    else if(counter = 1) date = value;
    else if(counter = 2) cat = value;
    else if(counter = 3) amount = value;
    else if(counter = 4)     {
        document.getElementById("tdBalance").innerHTML = balance
        costObjects.push(new costObject(desc, date, cat, amount, balance))
    }
}


document.addEventListener("")

function saveObject()   {

}



if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      navigator.serviceWorker
        .register("/serviceWorker.js")
        .then(res => console.log("service worker registered"))
        .catch(err => console.log("service worker not registered", err));
    });
}
  
  
  