export function cams() {
  const url = '/api/cams/purchase';

  var form2 = document.getElementById("camsform");
  form2.addEventListener('submit', function (e) {
    e.preventDefault();
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
      zip : zip ? zip.value : undefined,
      number : number ? number.value : undefined,
      month : month ? month.value : undefined,
      year : year ? year.value : undefined,
      verification_code : verification_code ? verification_code.value : undefined
    }
    console.log(params);
    doPayment(params);
  });

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
       console.log(data);
   });
 }
}
