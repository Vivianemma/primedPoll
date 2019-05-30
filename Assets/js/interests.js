var app_link = "https://polledapp.herokuapp.com";
const token = localStorage.getItem("goaltoken");
$(document).ready(function () {
    console.log("js");

    // Adding an interest
    $("#newInterest").on('submit', function (e) {
        e.preventDefault();
        $(".invisible-body").show();
        const newInterest = $('#inputInterest').val();
        console.log(newInterest);
        var settings = {
            "url": app_link + "/api/admin/create/interest",
            "method": "POST",
            "headers": {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            "data": {
                "interest": newInterest,
            },
        };
        $.ajax(settings).done(function (response) {
            if (response) {
                console.log(response);
                location.reload();
            }
        }).fail(function (err) {
            console.log(err);
        });
    });

    // Viewing all interests
    console.log("wtf")
    $(".invisible-body").show();
    var settings = {
        "url": app_link + "/api/admin/show/all/interest",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/x-www-form-urlencoded"
        },
    };
    $.ajax(settings).done(function (response) {
        if (response) {
            console.log(response)
            var interest = response.data.interest;
            if (response.data.success) {
                $(".invisible-body").hide();
                for (var i = 0; i < interest.length; i++) {
                    let interestId = response.data.interest[i].id;
                    //   $("#interest_box").
                    //   append("<div id='interest"+interest[i].id+
                    //     "' data-getinterestid='"+interest[i].id+"' class='cat_data interest interest_sty text-center col-4 col-sm-3 col-md-4 col-lg-3 mx-3 my-2 '><span class='interest-words' id='cat_data'><i id='check"+interest[i].id+
                    //     "' class='fa fa-check check_interest' aria-hidden='true'></i>"+interest[i].intrest+"</span></div>");
                    $("#interests-body").prepend(
                        `<tr>
                    <td>${interest[i].id}</td>
                    <td class="interest-name" id="reflect${interest[i].id}">${interest[i].interest}</td>
                    <td class="interest-numbers">3,046</td>
                    <td></td>
                    <td><button class="btn btn-secondary col-6 outer-edit-button"
                    data-interestid="${interest[i].id}" data-interestname="${interest[i].interest}">Edit</button>
                    </td>
                    <td>
                    <button class="btn btn-danger col-6 outer-delete-button"
                    data-interestid="${interest[i].id}">Delete</button>
                    </td>
                    </tr>
                    <option id="interest${interest[i].id}">$    q
                    
              `
                    )
                }

            }

        }
    }).fail(function (err) {
        console.log(err);
        $(".invisible-body").hide();
    });

    //   Edit an interest
    $("#editInterestForm").on('submit', function (e) {
        e.preventDefault();
        $(".invisible-body").show();
        const interestId = $('#edit_interest_id').val();
        const editInterest = $('#editInterestInput').val();

        console.log(interestId);
        var settings = {
            "url": app_link + `/api/admin/edit/interest/${interestId}`,
            "method": "PUT",
            "timeout": 0,
            "headers": {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            "data": {
                "interest": editInterest,
            },
        };
        $.ajax(settings).done(function (response) {
            if (response) {
                console.log(response);
                var interest = response.data.data.interest;
                $(".invisible-body").hide();
                $("#editInterestModal").modal('toggle');
                $("#reflect" + interestId).html(interest);
            }
        }).fail(function (err) {
            console.log(err);
            $(".invisible-body").hide();
        });
    });

    //Dom Manipulation
    $(document).on('click', '.outer-edit-button', function () {
        console.log("click");
        let interest_id = $(this).data("interestid");
        let interest_name = $(this).data("interestname");
        console.log(interest_name);
        $("#editInterestInput").attr("placeholder", interest_name)
        $("#edit_interest_id").val(interest_id);
        $("#editInterestModal").modal();
    });
});
// Delete an interest
    $(document).on('click', '#del-interest', function(e){
    e.preventDefault();
    let interestId = $("#delete_interest_id").val();
    console.log("clicked");
    $(".invisible-body").show();
    console.log(interestId)
    var settings = {
        "url": app_link + `/api/admin/delete/interest/${interestId}`,
        "method": "DELETE",
        "timeout": 0,
        "headers": {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/x-www-form-urlencoded"
        },
    };
    $.ajax(settings).done(function (response) {
        console.log("waiting for response...")
        console.log(response)
        location.reload();
    }).fail(function (err) {
        console.log(err);
    });
})
$(document).on('click', '.outer-delete-button', function () {
    console.log("click")
    let interest_id = $(this).data("interestid");
    $("#delete_interest_id").val(interest_id);
    $("#deleteInterestModal").modal();
});

