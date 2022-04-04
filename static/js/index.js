function createArticle() {
    var title = document.getElementById("title").value;
    var body = document.getElementById("body").value;

    axios({
        method: "POST",
        url: "/article/create",
        data: {
            title: title,
            body: body,
        },
        headers: {
            "Content-Type": "application/json",
        }
    }).then(
        (response) => {
            var data = response.data;
            if (data.redirect) {
                // redirect exists, then set the URL to the redirect
                window.location.href = data.redirect;
            }

            if (data.status == 500) {
                alert(data.error);
                window.location.href = "/";  // redirect to home page
            }
        },
    )
}

function createUser() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    console.log(username)
    console.log(username)

    axios({
        method: "POST",
        url: "/register",
        data: {
            username: username,
            password: password,
        },
        headers: {
            "Content-Type": "application/json",
        }
    }).then(
        (response) => {
            var data = response.data;

            console.log(data)

            if (data.status == 200) {
                console.log(data.message)
                alert("Account has been made")
                window.location.href = "/";
            }

            if (data.status == 500) {
                alert(data.error);
                window.location.href = "/";  // redirect to home page
            }
        },
    )
}

function deleteArticle(id, title) {
    var message = "Are you sure to delete article with title " + title + " ?";
    var confirm_delete = confirm(message);

    // value of confirm() function is True if user clicks on OK
    if (confirm_delete == true) {
        // use axios to call delete, with the article id to delete
        var url = "/article/delete/" + id;
        axios({
            method: "POST",
            url: url,
        }).then(
            (response) => {
                var data = response.data;
                if (data.redirect) {
                    window.location.href = data.redirect;
                }
            }
        );
    }
}
