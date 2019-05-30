$(document).ready(function () {
    var app_link = "https://polledapp.herokuapp.com";
    console.log("js")
    // $("#email").hide();
    $("#adminLogin").on('submit', function (e) {
        e.preventDefault();
        const adminEmail = $("#email").val();
        const adminPwd = $("#password").val();

        //Remove 
        $("#email, #password").css('border-bottom-color', 'black');

        $("#admin_email_err, #admin_pwd_err, #admin_not_found").html("");

        //Show Loader
        $(".invisible-body").show();
        var settings = {
            "url": app_link + "/api/admin/access/login",
            "method": "POST",
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            "data": {
                "email": adminEmail,
                "password": adminPwd,
            },
        };
        $.ajax(settings).done(function (response) {

            if (response) {
                console.log(response)
                const token = response.data.token;
                localStorage.setItem('goaltoken', response.data.token);
                console.log(token);
                $(".invisible-body").hide();
                window.open("index.html", "_self");
            }
        }).fail(function (err) {
            if (err) {
                console.log(err);
                $(".invisible-body").hide();
                if (err.status === 404) {
                    $("#admin_not_found").html(err.responseJSON.message);
                }
                if (err.status === 422) {
                    if (err.responseJSON.email) {
                        $("#admin_email_err").html(err.responseJSON.email[0]);
                        $("#email").css('border-bottom-color', 'tomato');
                    }
                    if (err.responseJSON.password) {
                        $("#admin_pwd_err").html(err.responseJSON.password[0]);
                        $("#password").css('border-bottom-color', 'tomato');
                    }

                }
            }
        });
    });
});