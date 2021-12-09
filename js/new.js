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
var i = 1;

function embeddedElement(id)  {
    var desc, date, cat, amount;
    var value = document.getElementById(id).value;
    var x = document.getElementById(id).parentElement.id;
    document.getElementById(x).innerHTML = value;
    console.log(value);
    console.log(counter);
    if(counter == 0) desc = value;
    else if(counter == 1) date = value;
    else if(counter == 2) cat = value;
    else if(counter == 3) {
        amount = value;
        balance -= value;
        document.getElementById("tdBalance").innerHTML = balance
        costObjects.push(new costObject(desc, date, cat, amount, balance))
        counter=-1;
        newRow();
    }
    counter++;
    
}
function newRow()   {
    var text = "<td id='tdDesc" + i + "'><input id='desc' type='desc' onchange='embeddedElement('desc')' value=''></th>"+
    "<td id='tdDate" + i + "'><input type='date' id='date' onchange='embeddedElement('date')' value=''></td>"+
    "<td id='tdCat" + i + "'><input type='text' id='cat' onchange='embeddedElement('cat')' value=''></td>"+
    "<td id='tdAmount " + i + "'><input type='number' id='amount' onchange='embeddedElement('amount')' value=''></td>"+
    "<td id='tdBalance" + i + "'></td>";
    console.log(text);
    const tr = document.createElement('tr');
    tr.id = "tr"+i;
    tr.innerHTML=text;
    document.getElementById('tbody').appendChild(tr);
    i++;
}



//document.addEventListener("")

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
  
  
  