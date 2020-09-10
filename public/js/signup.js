
let form = document.querySelector('form')

document.querySelector('form').addEventListener("submit", function (e) {
  e.preventDefault();

  let formdata = new FormData(form)
  $.post("/signup",
    {
      email: formdata.get('email'),
      username: formdata.get('username'),
      dateofbirth: formdata.get('dateofbirth'),
      bio: formdata.get('bio'),
      password: formdata.get('password')

    },
    function (data, status) {


      if (data.errors.length) {
        $('#error').html('</div><div class="alert alert-danger" role="alert">'
          + data.errors[0].msg +
          '</div>');
      }



    });
  $('#error').html('</div><div class="alert alert-success" role="alert">'
    + "user successfully registered!!!!" +
    '</div>');
  window.location.href = "login"



});