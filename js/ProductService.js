console.log("ProductService.js")

const products = [
    {
        "id": 1,
        "name": "Red Bull Energy",
        "size": "0.25 l",
        "type": "koffeinhaltige Getränke",
        "price": "1.19 €"
    },
    {
        "id": 2,
        "name": "Rockstar Energy",
        "size": "0.5 l",
        "type": "koffeinhaltige Getränke",
        "price": "1.79 €"
    },
    {
        "id": 3,
        "name": "Effect Energy",
        "size": "0.33 l",
        "type": "koffeinhaltige Getränke",
        "price": "0.99 €"
    },
    {
        "id": 4,
        "name": "28Black Energy",
        "size": "0.33 l",
        "type": "koffeinhaltige Getränke",
        "price": "1.49 €"
    }
]
function getProducts() {
    return products
}
function getProduct(name) {
    products.forEach(element => {
        if(element.name == name) {
            //document.getEl
        }
    })
}
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
      nameInput.value = event.target.value;
      searchInput.value = event.target.value;
      document.getElementById('name-display').innerHTML = event.target.value !== '' ? `Hello ${event.target.value}!` : 'Hello anonymous!';
    }
    nameInput.addEventListener('input', updateInputs);
    searchInput.addEventListener('input', updateInputs);
    
    
