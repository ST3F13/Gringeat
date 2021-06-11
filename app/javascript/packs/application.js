// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")


// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)


// ----------------------------------------------------
// Note(lewagon): ABOVE IS RAILS DEFAULT CONFIGURATION
// WRITE YOUR OWN JS STARTING FROM HERE 👇
// ----------------------------------------------------

// External imports
import "bootstrap";

// Internal imports, e.g:

import { initCaroussel } from '../components/caroussel';

document.addEventListener('turbolinks:load', () => {
  initCaroussel();
});


function order_by_occurrence(arr) {
  var counts = {};
  arr.forEach(function (value) {
    if (!counts[value]) {
      counts[value] = 0;
    }
    counts[value]++;
  });
  return Object.keys(counts).sort(function (curKey, nextKey) {
    return counts[curKey] < counts[nextKey];
  });
}

function load_quagga() {
  if ($('#barcode-scanner').length > 0 && navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function') {

    var last_result = [];
    if (Quagga.initialized == undefined) {
      Quagga.onDetected(function (result) {
        var last_code = result.codeResult.code;
        last_result.push(last_code);

        if (last_result.length > 20) {
          const code = order_by_occurrence(last_result)[0];
          last_result = [];
          Quagga.stop();







          var xmlHttp = new XMLHttpRequest();
          xmlHttp.open("GET", `/product/${code}`, true); // false for synchronous request
          xmlHttp.send(null);
          console.log(code)
          window.location.href = `/product/${code}`;

        }
      });
    }

    Quagga.init({
      inputStream: {
        name: "Live",
        type: "LiveStream",
        numOfWorkers: 1,
        target: document.querySelector('#barcode-scanner')
      },
      decoder: {
        readers: ['ean_reader', 'ean_8_reader', 'code_39_reader', 'code_39_vin_reader', 'codabar_reader', 'upc_reader', 'upc_e_reader']
      }
    }, function (err) {
      if (err) { console.log(err); return }
      Quagga.initialized = true;
      Quagga.start();
    });

  }
};
$(document).on('turbolinks:load', load_quagga);



 import { initScanner } from '../plugins/init_scanner';

document.addEventListener('turbolinks:load', () => {
  // Call your functions here, e.g:
  // initSelect2(); 
  initScanner();
});


