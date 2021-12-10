class costObject {
   constructor(desc, date, cat, amount, balance)    {
       this.desc = desc;
       this.date = date;
       this.cat = cat;
       this.amount = amount;
       this.balance = balance;
   }
}

const attributes = new Array;
var balance = 0;
var counter = 0;
var i = 1;
newRow();

function embeddedElement(id)  {
    var desc, date, cat, amount;
    var value = document.getElementById(id).value;
    var x = document.getElementById(id).parentElement.id;
    document.getElementById(x).innerHTML = value;
    attributes.push(value)   
    
    if(counter == 3) {
        amount = value;
        balance -= amount;
        document.getElementById("tdBalance"+i).innerHTML = balance;
        saveObject(new costObject(attributes[0], attributes[1], attributes[2], amount, balance));
        attributes = [];
        counter=-1;
        newRow();
    }
    counter++;
    
}
function newRow()   {
    i++;
    var text = "<td id='tdDesc" + i + "'><input id='desc' type='desc' onchange='embeddedElement(\"desc\")' value=''></th>"+
    "<td id='tdDate" + i + "'><input type='date' id='date' onchange='embeddedElement(\"date\")' value=''></td>"+
    "<td id='tdCat" + i + "'><input type='text' id='cat' onchange='embeddedElement(\"cat\")' value=''></td>"+
    "<td id='tdAmount" + i + "'><input type='number' id='amount' onchange='embeddedElement(\"amount\")' value=''></td>"+
    "<td id='tdBalance" + i + "'></td>";
    const tr = document.createElement('tr');
    tr.id = "tr"+i;
    tr.innerHTML=text;
    document.getElementById('tbody').appendChild(tr);
}

function showObjects(elem)    { 
    var text = "<td id='tdDesc" + i + "'>" + elem.desc + "</th>"+
    "<td id='tdDate" + i + "'>" + elem.date + "</td>"+
    "<td id='tdCat" + i + "'>" + elem.cat + "</td>"+
    "<td id='tdAmount" + i + "'>" + elem.amount + "</td>"+
    "<td id='tdBalance" + i + "'>" + elem.balance + "</td>";
    const tr = document.createElement('tr');
    tr.id = "tr"+i;
    tr.innerHTML=text;
    document.getElementById('tbody').appendChild(tr);
    i++;
}
function saveObject(Element)   {
    var i = 0;
    localStorage.setItem("Kostenelement "+ i, Element);
    console.log(Element);
    i++;
}

//document.addEventListener("")



if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      navigator.serviceWorker
        .register("/serviceWorker.js")
        .then(res => console.log("service worker registered"))
        .catch(err => console.log("service worker not registered", err));
    });
}
  
  
  