console.log("ProductService.js")
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
    document.getElementById('model-switch').addEventListener('change', function (event) {
      if (event.value) {
        document.getElementById('switch-status').innerHTML = `&nbsp;(on)`;
        document.getElementById('enabled-label').innerHTML = `Enabled switch`;
        document.getElementById('disabled-switch').disabled = false;
      } else {
        document.getElementById('switch-status').innerHTML = `&nbsp;(off)`;
        document.getElementById('enabled-label').innerHTML = `Disabled switch`;
        document.getElementById('disabled-switch').disabled = true;
      }
    });
    
