function _(str) {
    return document.querySelector(str);
}

let signup = _("#signup");

if (signup) {
    signup.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = _("#ec_email").value;
        const checkbox = _("#ec_tccheckbox");
        const password = _("#ec_password").value;
        const confirm_password = _("#ec_confirm_password").value

        const userData = {
            email: email,
            checkbox: ec_tccheckbox,
            password: password ,
            password_confirmation: confirm_password 
        }
        const signupurl = "http://13.59.91.161:8000/api/register";

        axios.post(signupurl, userData).then(function (response) {

            console.log(response.data)
        
                setTimeout(function () {
                 location.replace("verification.html");
                }, 2000);

        }).catch(function (err) {
            console.log(err.response)
        })
    })
}