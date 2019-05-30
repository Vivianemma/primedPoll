function _(str) {
    return document.querySelector(str);
}

viewInterestget();

    function viewInterestget() {
    
        const viewgoalsUrl = "http://13.59.91.161:8000/api/interest";
    
        const token = localStorage.getItem("primepoll_token");
    
        const options = {
            headers: {
                Authorization: token,
            }
        }
        axios.get(viewgoalsUrl, options).then(function (response) {
            
            const interest = response.data
             console.log(response.data)
            for (var i = 0; i < interest.length; i++) {
                let interestId = response.data[i].id;

                _("#view").innerHTML += `
                    <a class="nav-link " href="index.html">
                        <span>${interest[i].title}</span>
                    </a>
                `;

            }

        }).catch(function(err){
            console.log(err)
        });
    }    