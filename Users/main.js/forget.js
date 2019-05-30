function _(str) {
    return document.querySelector(str);
}

let forget = _("#forget");
if (forget){
    forget.addEventListener('submit', function (event) {
        event.preventDefault();
        console.log(event)
        const email = _("#email").value;

        const userData = {
            email: email,
        }

        const forgetUrl = "http://13.59.91.161:8000/api/password/reset";

        axios.post(forgetUrl, userData).then(function (response) {

            console.log(response.data)


        }).catch(function (err) {
            console.log(err.response)
        })
    })
}