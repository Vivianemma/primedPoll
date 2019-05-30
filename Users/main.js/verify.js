function _(str) {
    return document.querySelector(str);
}
// Login User
 verify =_("#verify");

if (verify) {
    verify.addEventListener('submit', function (e) {
        e.preventDefault();

        const token = _("#token").value

        const userData = {
            verifycode: token
        }
        const verifyUrl ="http://13.59.91.161:8000/api/register/verify";

        axios.post(verifyUrl, userData).then(function (response) {

            console.log(response.data)

            const token = response.data.token
              
            localStorage.setItem('primepoll_token', token);

            setTimeout(function () {
                location.replace("complete-registration.html");
            }, 2000);
        }).catch(function (err) {

            console.log(err.response)
        })
    })
}