$(document).ready(function(){
    $("#imagePollBtn").on('click', function(){

        $("#imagePollCollapse").show();
        $("#textPollCollapse").hide();
    });
    $("#textPollBtn").on('click', function () {
        $("#imagePollCollapse").hide();
        $("#textPollCollapse").show();
    });
});

function _(str) {
    return document.querySelector(str);
  }

  if(location.pathname == "/new-poll.html") {
    // check if there is a token
    const checkToken = !! localStorage.getItem("primepoll_token");
    
    }

  let section = _("#select");

if (section)    {
    const sectionurl = "http://13.59.91.161:8000/api/user/interest";

    const token = localStorage.getItem("primepoll_token");
    _("#selectCategory").innerHTML = `
      <option selected>Loading Interest....</option>
    `;
    const options = {
      headers: {
        Authorization: token,
      }
    }
    console.log(token)
        axios.get(sectionurl, options).then(function (response) {
        
        const userinterest = response.data;
        console.log(response.data)
        _("#selectCategory").innerHTML = `
            <option selected></option>
          `;
        for (var i = 0; i < userinterest.length; i++) {
          let userId = response.data[i].id;

          _("#selectCategory").innerHTML += `
          <option value = "${userinterest[i].interest.id}" selected>${userinterest[i].interest.title}</option>
          `;
      }


     }).catch(function (err) {
       console.log(err)
        console.log(err.response)
    })

}

//text poll

values = [];

 var input = document.getElementById("input");


function addFunction() {

  if (input.value == ""){
    return
  }
 

  
 var option_id = `option_${input.value}`;

document.getElementById("display").innerHTML += `
                      <div class=" mb-3  " id="${option_id}" >
                          
                          ${input.value}
                         
                          
                          <div class="" style="float:right;">
                            <button class="btn btn-outline-danger" id"button" type="button" onclick="removeOption('${option_id}', '${input.value}')">
                            <i class="far fa-window-close"></i>
                            </button>
                          </div> 
                      </div>   
`;  

  values.push(input.value);
  input.value = "",
  console.log(values) 
  
 

}


// delete value
function removeOption(id, input){

  console.log(id)

    var index = values.indexOf(input);
    
    console.log(index);
      values.splice(index, 1);
      document.getElementById(id).style.display = "none";
      console.log(values) 
   
}


// add new poll
let newPoll = _("#newPoll")

if (newPoll){
   newPoll.addEventListener('submit', function (event) {
    event.preventDefault();
   
    
    const selectCategory = _("#selectCategory").value;
    const pollQuestion = _("#pollQuestion").value;
    const option = values.map(function(x) {
      return {
          "option_id": x
      }
  });

  
     const userData ={
      question: pollQuestion,
      options: option
      
     }
     console.log(userData)

     const token = localStorage.getItem("primepoll_token");
  
     const options = {
       headers: {
           Authorization: token,
       }
     }

     const newPollurl = "http://13.59.91.161:8000/api/"+selectCategory+"/poll"

     console.log(newPollurl);

     axios.post(newPollurl, userData, options).then(function (response){

    //   setTimeout(function () {
    //     location.replace("user-feed.html");
    // }, 2000);

     }).catch(function (err) {
      console.log(err.response)
     })
})
}