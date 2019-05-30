function _(str) {
    return document.querySelector(str);
}
// Login User
let sign_in =_("#sign_in");

if (sign_in) {
    sign_in.addEventListener('submit', function (event) {
        event.preventDefault();

        const email = _("#ec_email").value;
        const pwd = _("#ec_password").value;

        const userData = {
            email: email,
            password: pwd
        }
        const sign_inUrl = "http://13.59.91.161:8000/api/login";

        axios.post(sign_inUrl, userData).then(function (response) {

            console.log(response.data)

            const token = 'Bearer ' + response.data.data.token;

            console.log(token)
              
            localStorage.setItem('primepoll_token', token);

            setTimeout(function () {
                location.replace("user-feed.html");
            }, 2000);

        }).catch(function (err) {
            console.log(err)
            console.log(err.response)
        })
    })
}