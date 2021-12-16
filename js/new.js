class costObject {
   constructor(desc, date, cat, amount, balance)    {
       this.desc = desc;
       this.date = date;
       this.cat = cat;
       this.amount = amount;
       this.balance = balance;
   }
}

const attributes = new Map();
var balance = 0;
var counter = 0;
var num = 1;

function embeddedElement(id)  {
    var amount;
    var elem = document.getElementById(id);
    var value = elem.value;
    var x = elem.parentElement.id;
    if(id == "amount") document.getElementById(x).innerHTML = value + " €";
    else document.getElementById(x).innerHTML = value;
    attributes.set(id, value);   
    if(attributes.size == 4) {
        amount = attributes.get("amount");
        balance -= amount;
        document.getElementById("tdBalance" + num).innerHTML = balance + " €";
        saveObject(new costObject(attributes.get("desc"), attributes.get("date"), attributes.get("cat"), amount, balance));
        attributes.clear();
        counter=-1;
        num++;
        newRow();
    }
    counter++;
    
}
function newRow()   {
    var text = "<td id='tdDesc" + num + "'><input id='desc' type='desc' onchange='embeddedElement(\"desc\")' value='' autofocus></th>"+
    "<td id='tdDate" + num + "'><input type='date' id='date' onchange='embeddedElement(\"date\")' value=''></td>"+
    "<td id='tdCat" + num + "'><input type='text' id='cat' onchange='embeddedElement(\"cat\")' value=''></td>"+
    "<td id='tdAmount" + num + "'><input type='number' id='amount' onchange='embeddedElement(\"amount\")' value=''></td>"+
    "<td id='tdBalance" + num + "'></td>";
    const tr = document.createElement('tr');
    tr.id = "tr"+ num;
    tr.innerHTML=text;
    document.getElementById('tbody').appendChild(tr);
    document.getElementById("desc").focus();
}

function showObject(elem)    { 
    console.log(elem);
    var text = "<td id='tdDesc" + num + "'>" + elem.desc + "</th>"+
    "<td id='tdDate" + num + "'>" + elem.date + "</td>"+
    "<td id='tdCat" + num + "'>" + elem.cat + "</td>"+
    "<td id='tdAmount" + num + "'>" + elem.amount + " €" + "</td>"+
    "<td id='tdBalance" + num + "'>" + elem.balance + " €" + "</td>";
    const tr = document.createElement('tr');
    tr.id = "tr" + num;
    tr.innerHTML=text;
    document.getElementById('tbody').appendChild(tr);
    num++;
}
function saveObject(Element)   {
    localStorage.setItem("Kostenelement "+ num, JSON.stringify(Element));
}

function getObjects()   {
    var i;       
    for(i = 1; i < localStorage.length+1; i++)    {
        var elem = JSON.parse(localStorage.getItem("Kostenelement " + i));
        showObject(elem);
        if(i == localStorage.length) {
            balance = elem.balance;
        }
    }
    newRow();
}

/*
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      navigator.serviceWorker
        .register("/serviceWorker.js")
        .then(res => console.log("service worker registered"))
        .catch(err => console.log("service worker not registered", err));
    });
}
*/
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/serviceWorker.js').then(function(registration) {
      // registration worked
      console.log('Registration succeeded.');
      /*
      document.getElementById("").onclick = function() {
        registration.update();
        console.log("Service Worker updated")
      }
      */
    }).catch(function(error) {
      // registration failed
      console.log('Registration failed with ' + error);
    });
  };
  
  
  