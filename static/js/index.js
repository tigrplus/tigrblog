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
    var name = document.getElementById("name").value;
    var password = document.getElementById("pass1").value;

    checkPass();
    
    axios({
        method: "POST",
        url: "/register",
        data: {
            username: username,
            name: name,
            password: password,
        },
        headers: {
            "Content-Type": "application/json",
        }
    }).then(
        (response) => {
            var data = response.data;
            if (data.status == 200) {
                alert("Account has been made");
            }

            if (data.status == 500) {
                alert(data.error);
                window.location.href = "/";  // redirect to home page
            }
        },
    )
}

function checkPass(){
    var pass1 = document.getElementById('pass1');
	var pass2 = document.getElementById('pass2');
	var message = document.getElementById('errorMsg');
		
	if(pass1.value.length < 5){
	    message.innerHTML = "You have to enter at least 5 digits!";
	   	return;
	}
	
    if(pass1.value.search(/[A-Z]/)==-1){
	    message.innerHTML = "Your password needs an uppercase letter!";
	    return
	}

	if(pass1.value == pass2.value){	
	    message.innerHTML = "";
	}else{
	    message.innerHTML = "Password doesn't match!";
	}
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
