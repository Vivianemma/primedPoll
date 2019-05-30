

function _(str) {
    return document.querySelector(str);
}


//view interest

oneInterestget();

function oneInterestget() {

    const viewpollUrl = "http://13.59.91.161:8000/api/poll";

    const token = localStorage.getItem("primepoll_token");

    const options = {
        headers: {
            Authorization: token,
        }
    }
    axios.get(viewpollUrl, options).then(function (response) {
        
        const poll = response.data

         console.log(response.data)
        for (var i = 0; i <poll.length; i++) {
            let interestId = response.data[i].id;

            _("#poll-card").innerHTML += `
            <div class="mb-3">
                  <div class="col-11 ml-1">
                    <img src="../Assets/images/avatars/0.jpg" style="width:40px;" class="mt-3" id="user-image">
                    <span class="mt-5 ml-2 card-name">Sierra Brooks</span>
                    <a href="#"
                      class="card-post__category badge badge-pill badge-info mt-3 ec_poll-interest">Fiction</a>
                  </div>
                  <div class="col-10 ec_poll-question mt-2">
                    <span class="ec_med-text ">${poll[i].question}</span>
                  </div>
                  <div class="ec_poll-answers mt-2 col-11" id="option_box${poll[i].options}">
                    
                  </div>
                  <div class="col-11 ec_poll-misc mt-3">
                  <span class="text-muted col-12">${poll[i].updated_at}</span>
                  <button type="submit" class="btn brand-bg text-white float-right mr-4"${poll[i].votes_count}</button>
                </div>

              </div>
            </div>
          </div>
            `;
            for (var j = 0; j < poll[i].options.length; j++) {

                _(`#option_box${poll[i].options}`).innerHTML += `

                <div class="custom-control custom-radio">
                    <input type="radio" id="poll2option1" name="polloption" class="custom-control-input">
                    <label class="custom-control-label" for="poll2option1">${options[j].option}</label>
                </div>

                `;
            }
        }

    }).catch(function(err){
        console.log(err.response)
    });
}    
