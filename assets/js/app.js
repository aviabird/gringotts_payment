// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "phoenix_html"

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

// import socket from "./socket"

document.getElementById("pay").onclick = function() {myFunction()};
function myFunction() {
  console.log('payment called');
}

// Create a Stripe client
var stripe = Stripe('pk_test_xx96UepEgmX12vaKbpJp1p70');

// Create an instance of Elements
var elements = stripe.elements();

// Custom styling can be passed to options when creating an Element.
// (Note that this demo uses a wider set of styles than the guide below.)
var style = {
  base: {
    color: '#32325d',
    lineHeight: '18px',
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    fontSmoothing: 'antialiased',
    fontSize: '16px',
    '::placeholder': {
      color: '#aab7c4'
    }
  },
  invalid: {
    color: '#fa755a',
    iconColor: '#fa755a'
  }
};

// Create an instance of the card Element
var card = elements.create('card', {style: style});

// Add an instance of the card Element into the `card-element` <div>
card.mount('#card-element');

// Handle real-time validation errors from the card Element.
card.addEventListener('change', function(event) {
  var displayError = document.getElementById('card-errors');
  if (event.error) {
    displayError.textContent = event.error.message;
  } else {
    displayError.textContent = '';
  }
});

// Handle form submission
var form = document.getElementById('payment-form');
var csrf = document.getElementById('csrf-token').value;

form.addEventListener('submit', function(event) {
  event.preventDefault();
  const url_purchase = 'http://0.0.0.0:4000/purchase'

  stripe.createToken(card).then(function(result) {
    console.log('card-result', result);
    console.log('csrf', csrf);
    // header.append("X-CSRF-TOKEN", csrf)
    if (result.error) {
      // Inform the user if there was an error
      var errorElement = document.getElementById('card-errors');
      errorElement.textContent = result.error.message;
    } else {
        let fetchData = {
          method: 'POST',
          body: JSON.stringify(result.token),
          headers: new Headers({
            'X-CSRF-Token': csrf,
            'Content-Type': 'application/json'
          }),
          mode: 'cors',
        }
        console.log('header', fetchData.headers.get('X-CSRF-Token'));
        fetch(url_purchase, fetchData)
        .then((data) => {
        });
    }
  });
});
