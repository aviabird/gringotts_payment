(function(){
  "use strict";
  disableMessage();
  noLoading();
  const url = '/api/cams/purchase';
  var form2 = document.getElementById("camsform");
  var autoFill = document.getElementById("autofill");
  if (form2) {
    form2.addEventListener('submit', function (e) {
      e.preventDefault();
      disableForm();
      disableMessage();
      loading();
      
      var first_name = document.getElementById("customerFname");
      var last_name = document.getElementById("customerLname");
      var address1 = document.getElementById("customerAddress");
      var email = document.getElementById("customerEmail")
      var city = document.getElementById("customerCity");
      var phone = document.getElementById("customerPhone");
      var state = document.getElementById("customerState");
      var zip = document.getElementById("customerZip");
      var number = document.getElementById("ccNo");
      var month = document.getElementById("ccExpMM");
      var year = document.getElementById("ccExpYY");
      var verification_code = document.getElementById("ccCode");
      var params = {
        first_name: first_name ? first_name.value : undefined,
        last_name: last_name ? last_name.value : undefined,
        address1: address1 ? address1.value : undefined,
        email: email ? email.value : undefined,
        city: city ? city.value : undefined,
        phone: phone ? phone.value : undefined,
        state: state ? state.value : undefined,
        zip: zip ? zip.value : undefined,
        number: number ? number.value : undefined,
        month: month ? month.value : undefined,
        year: year ? year.value : undefined,
        verification_code: verification_code ? verification_code.value : undefined
      }
      doPayment(params);

    });
  }
  function doPayment(params) {
    let fetchData = {
      method: 'POST',
      body: JSON.stringify(params),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      mode: 'cors',
    }
    fetch(url, fetchData)
      .then(response => response.json()
      ).then((data) => {
        noLoading();
        showMessage(data);
        enableForm();
      });
  }
  function showMessage(data) {
    if (data.success) {
      document.getElementById("notify-success").style.display = "block";
      document.getElementById("success-msg").style.display = "block";
      document.getElementById("success-msg")
      .innerHTML = "Successful Purchase with Transaction ID:"+data.authorization;
    }
    else if (!data.success) {
      document.getElementById("notify-error").style.display = "block";
      document.getElementById("error-msg").style.display = "block";
      document.getElementById("error-msg").innerHTML = data.message;
    }
  }
  function loading() {
    var div = document.getElementById("spin");
    if (div.style.display == "none") {
      div.style.display = "block";
    }
    document.getElementById("stable").style.display = "none";
    document.getElementById("processing").style.display = "block";
  }
  function noLoading() {
    document.getElementById("spin").style.display = "none";
    document.getElementById("stable").style.display = "block";
    document.getElementById("processing").style.display = "none";
  }
  function disableMessage() {
    document.getElementById("notify-error").style.display = "none";
    document.getElementById("notify-success").style.display = "none";
    document.getElementById("processing").style.display = "none";
  }
  function disableForm() {
    form2.style.visibility = "hidden"
  }
  function enableForm() {
    form2.style.visibility = "visible"
    form2.reset();
  }
  if (autoFill) {
    autoFill.addEventListener('click', function (e) {
      document.getElementById("customerFname").value = "Gopal";
      document.getElementById("customerLname").value = "Shimpi";
      document.getElementById("customerAddress").value = "18,Vidya Apartment";
      document.getElementById("customerEmail").value = "gopal@aviabird.com"
      document.getElementById("customerCity").value = "Pune";
      document.getElementById("customerPhone").value = "9029370273";
      document.getElementById("customerState").value = "Maharashtra";
      document.getElementById("customerZip").value = "411033";
      document.getElementById("ccNo").value = "5431111111111111";
      document.getElementById("ccExpMM").value = "09";
      document.getElementById("ccExpYY").value = "2021";
      document.getElementById("ccCode").value = "123";
    });
  }
})();
