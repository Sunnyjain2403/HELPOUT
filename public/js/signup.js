//const { get } = require("../../../scems");

let form = document.querySelector('form')

document.querySelector('form').addEventListener("submit", function (e) {
  $("#submit").attr('disabled', true)
  e.preventDefault();
  let formdata = new FormData(form)



  $.post("/signup",
    {
      email: formdata.get('email'),
      username: formdata.get('username'),
      dateofbirth: formdata.get('dateofbirth'),
      bio: formdata.get('bio'),
      password: formdata.get('password'),
      confirmpassword: formdata.get('confirmpassword')
    },
    function (data, status) {


      if (data.errors.length) {
        $('#error').html('</div><div class="alert alert-danger" role="alert">'
          + data.errors[0].msg +
          '</div>');
        $("#submit").attr('disabled', false)
      }
      else {

        $('#error').html('</div><div class="alert alert-success" role="alert">'
          + "user successfully registered!!!!now you can login" +
          '</div>');

      }

    });





});