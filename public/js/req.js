$(document).ready(function () {
  $("[data-toggle=offcanvas]").click(function () {
    $(this).toggleClass("visible-xs text-center");
    $(this)
      .find("i")
      .toggleClass("glyphicon-chevron-right glyphicon-chevron-left");
    $(".row-offcanvas").toggleClass("active");
    $("#lg-menu").toggleClass("hidden-xs").toggleClass("visible-xs");
    $("#xs-menu").toggleClass("visible-xs").toggleClass("hidden-xs");
    $("#btnShow").toggle();
  });
});

//signup

//like
function toggling(x) {
  x.classList.toggle("blue");

  $.post("/toggle", { tweetid: x.id }, function (data, status) {});
}

//follow
function follow(e) {
  var user = e.id;
  $.post(
    "/follow",
    {
      user: user,
    },
    function (data, status) {}
  );
  console.log(e.innerHTML);
  if (e.innerHTML == "follow") {
    e.innerHTML = "unfollow";
  } else {
    e.innerHTML = "follow";
  }
}

function profile(e) {
  const username = e.innerHTML;
  $.get("'/profile/'+username", function (data, status) {});
}

//post
$(document).ready(function () {
  $("#postbutton").click(function () {
    $.post(
      "/tweet",
      {
        tweet: $("#post").val(),
        anonymous: false,
      },
      function (data, status) {}
    );
    $("#post").val("");
  });
});

$(document).ready(function () {
  $("#postbuttonprivate").click(function () {
    $.post(
      "/tweet",
      {
        tweet: $("#post").val(),
        anonymous: true,
      },
      function (data, status) {}
    );
    $("#post").val("");
  });
});

//search
$(document).ready(function () {
  $("#searchbutton").click(function () {
    $("#userpanel").css("display", "block");
    $("#search").empty();

    $.post(
      "/search",
      {
        searchstring: $("#searchstring").val(),
      },
      function (data, status) {
        data.result1.forEach((element) => {
          $("#search").append(
            '<div class="user"><a href="profile/' +
              element.username +
              '"><small>' +
              element.username +
              '</small></a></div><span><button  id="' +
              element.username +
              '" onclick="follow(this)" class="followbutton"  >unfollow</button></span></div>'
          );
        });
        data.result2.forEach((element) => {
          $("#search").append(
            '<div class="user"><a href="profile/' +
              element.username +
              '"><small>' +
              element.username +
              '</small></a></div><div><button  id="' +
              element.username +
              '"  onclick="follow(this)" class="followbutton"  >follow</button></div>'
          );
        });
      }
    );
  });
});

//comment
$(document).ready(function () {
  $(".commentbutton").on("click", function (e) {
    const tweetid = e.currentTarget.id;
    const y = "#" + tweetid + "commentinput";
    const comment = $(y).val();

    $.post(
      "/comment",
      {
        comment: comment,
        tweetid: tweetid,
      },
      function (data, status) {}
    );
    $(y).val("");
  });
});
