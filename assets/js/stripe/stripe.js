(function(){
  "use strict";
  // url to purchase method
  const url_purchase = '/api/purchase';
  var stripe = Stripe('pk_test_xx96UepEgmX12vaKbpJp1p70');
  var elements = stripe.elements({
    // Stripe's examples are localized to specific languages, but if
    // you wish to have Elements automatically detect your user's locale,
    // use `locale: 'auto'` instead.
    locale: window.__exampleLocale
  });

  function registerElements(elements, exampleName) {
    var formClass = '.' + exampleName;
    var example = document.querySelector(formClass);
  
    var form = example.querySelector('form');
    var resetButton = example.querySelector('a.reset');
    var error = form.querySelector('.error');
    var errorMessage = error.querySelector('.message');
  
    function enableInputs() {
      Array.prototype.forEach.call(
        form.querySelectorAll(
          "input[type='text'], input[type='email'], input[type='tel']"
        ),
        function(input) {
          input.removeAttribute('disabled');
        }
      );
    }
  
    function disableInputs() {
      Array.prototype.forEach.call(
        form.querySelectorAll(
          "input[type='text'], input[type='email'], input[type='tel']"
        ),
        function(input) {
          input.setAttribute('disabled', 'true');
        }
      );
    }
  
    // Listen for errors from each Element, and show error messages in the UI.
    elements.forEach(function(element) {
      element.on('change', function(event) {
        if (event.error) {
          error.classList.add('visible');
          errorMessage.innerText = event.error.message;
        } else {
          error.classList.remove('visible');
        }
      });
    });

    function makePayment(token) {
      let fetchData = {
        method: 'POST',
        body: JSON.stringify(token),
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        mode: 'cors',
      }
  
      fetch(url_purchase, fetchData)
      .then(response => response.json()
        ).then((data) => {
          checkIfSuccess(data);
      });
    }
  
    function checkIfSuccess(data) {
      if (data.success === true) {
        example.classList.remove('submitting');
        example.classList.add('submitted');
      } else {
        example.classList.remove('submitting');
        error.classList.add('visible');
        errorMessage.innerText = data.data["error"]["message"];
        enableInputs();
      }
    }
  
    // Listen on the form's 'submit' handler...
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      // Show a loading screen...
      example.classList.add('submitting');
  
      // Disable all inputs.
      disableInputs();
  
      // Gather additional customer data we may have collected in our form.
      var name = form.querySelector('#' + exampleName + '-name');
      var address1 = form.querySelector('#' + exampleName + '-address');
      var city = form.querySelector('#' + exampleName + '-city');
      var state = form.querySelector('#' + exampleName + '-state');
      var zip = form.querySelector('#' + exampleName + '-zip');
      var additionalData = {
        name: name ? name.value : undefined,
        address_line1: address1 ? address1.value : undefined,
        address_city: city ? city.value : undefined,
        address_state: state ? state.value : undefined,
        address_zip: zip ? zip.value : undefined,
      };
  
      // Use Stripe.js to create a token. We only need to pass in one Element
      // from the Element group in order to create a token. We can also pass
      // in the additional customer data we collected in our form.
      stripe.createToken(elements[0], additionalData).then(function(result) {
        // Stop loading!
        // example.classList.remove('submitting');
  
        if (result.token) {
          // If we received a token, show the token ID.
          example.querySelector('.token').innerText = result.token.id;
          makePayment(result.token);
          // example.classList.add('submitted');
        } else {
          // Otherwise, un-disable inputs.
          enableInputs();
        }
      });
    });
  
    resetButton.addEventListener('click', function(e) {
      e.preventDefault();
      // Resetting the form (instead of setting the value to `''` for each input)
      // helps us clear webkit autofill styles.
      form.reset();
  
      // Clear each Element.
      elements.forEach(function(element) {
        element.clear();
      });
  
      // Reset error state as well.
      error.classList.remove('visible');
  
      // Resetting the form does not un-disable inputs, so we need to do it separately:
      enableInputs();
      example.classList.remove('submitted');
    });
  }

  /**
   * Card Element
   */
  var card = elements.create("card", {
    iconStyle: "solid",
    style: {
      base: {
        iconColor: "#fff",
        color: "#fff",
        fontWeight: 400,
        fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
        fontSize: "15px",
        fontSmoothing: "antialiased",

        "::placeholder": {
          color: "#BFAEF6"
        },
        ":-webkit-autofill": {
          color: "#fce883"
        }
      },
      invalid: {
        iconColor: "#FFC7EE",
        color: "#FFC7EE"
      }
    }
  });
  card.mount("#example5-card");
  registerElements([card], "example5");
})();
