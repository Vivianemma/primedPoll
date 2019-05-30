function _(str) {
        return document.querySelector(str);
    }
   
   
   //view interest
    oneGoalget();

    function oneGoalget() {
    
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

                _("#interest").innerHTML += `
                <div id="cat-id${interest[i].id}"
                class="interest cat_data text-center col-4 col-sm-3 col-md-4 col-lg-3 mx-3 my-2" onclick="myFunction(this)">
                <span class="interest-words" id="demo${interest[i].id}" >${interest[i].title}</span>
                </div>
                `;

            }

        }).catch(function(err){
            console.log(err)
        });
    }    


//add interest
let interest = [];

// var input = document.getElementById('#cat-id')
function myFunction(el){
   
    let id = Number(el.id.replace('cat-id', ''));
    
    if(interest.indexOf(id) === -1) {
         // add new item to interest array
        interest.push(id);
        $("#cat-id" + id).css('opacity', '0.5');
        $("#demo"+ id).prepend(`<i id="check${id}"
        "' class='fa fa-check check_interest' aria-hidden='true'></i>`);
    }else {
        interest.splice(interest.indexOf(id), 1)
        $("#cat-id" + id).css('opacity', '0.9');
        $("#check"+ id).remove();
        
    }

    if (interest.length >= 5) {
        $(".choose_more").hide();
        $(".complete_submit").show();
      }else{
        $(".choose_more").show();
        $(".complete_submit").hide();
      }  

    console.log(interest)
    
}



// complete-reg
   let complete =_("#complete_reg");

   if (complete){

        $("#proceed").on('click', function(e) {
            e.preventDefault();

                const firstName        = _("#firstName").value;
		        const lastName         = _("#lastName").value;
		        const phoneNumber      = _("#phoneNumber").value;
                const dob              = _("#dob").value;
                const interests         = interest.map(function(x) {
                                                return {
                                                    "interest_id": x
                                                }
                                            });

                // for (var a of interest){

                //     var obj = {};
                //     obj.interest_id = a;
                //     interests.push(obj);

                //     console.log(a);

                // }
                var a = 
                console.log(a);
            console.log(interest)
                const userData = {
                    "first_name": firstName,
                    "last_name":  lastName,
                    "phone" :     phoneNumber,
                    "dob":        dob,
                    "interests" :  interests
                }
                console.log(userData)
                const token = localStorage.getItem("primepoll_token");
            
                const options = {
                    headers: {
                        Authorization: token,
                    }
                }
                
                console.log(token)
            
                const completeurl = "http://13.59.91.161:8000/api/complete/registration";

                axios.put(completeurl, userData, options).then(function (response) {

                   

                    console.log(response.data)
        
        
                    setTimeout(function () {
                        location.replace("user-feed.html");
                    }, 2000);
        
                }).catch(function (err) {
                  console.log(err.response)

                })
        })
    }