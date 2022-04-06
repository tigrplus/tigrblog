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
                alert("Account successfully created");
                window.location.href = "/";  // redirect to home page
            }
            if (data.status == 409) {
                alert("Unfortunately, your username is taken. Please use another username");
            }

            if (data.status == 500) {
                alert("Please fill in the form correctly");
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

    if (document.getElementById("errorMsg").innerHTML == "") {
        document.getElementById("createuser").disabled = false;
    } else {
        document.getElementById("createuser").disabled = true;
    }
}

// function deleteArticle(id, title) {
//     var message = "Are you sure to delete article with title " + title + " ?";
//     var confirm_delete = confirm(message);

//     // value of confirm() function is True if user clicks on OK
//     if (confirm_delete == true) {
//         // use axios to call delete, with the article id to delete
//         var url = "/delete/" + id;
//         axios({
//             method: "POST",
//             url: url,
//         }).then(
//             (response) => {
//                 var data = response.data;
//                 if (data.redirect) {
//                     window.location.href = data.redirect;
//                 }
//             }
//         );
//     }
// }

function darkmode() {
    document.body.style.backgroundColor = 'black';
    document.body.style.color = 'white';
    var tigr = document.getElementById('tigr');
    var light_mode = document.getElementById('lightmode');
    var dark_mode = document.getElementById('darkmode');
    var log_in =  document.getElementById('login');
    var register =  document.getElementById('register');
    var userLoggedIn = document.getElementById("userLoggedIn");

    tigr.classList.remove('text-dark');
    light_mode.classList.remove('text-dark');
    dark_mode.classList.remove('text-dark');
    log_in.classList.remove('text-dark');
    register.classList.remove('text-dark');
    userLoggedIn.classList.remove('text-dark');

    tigr.classList.add('text-light');
    light_mode.classList.add('text-light');
    dark_mode.classList.add('text-light');
    log_in.classList.add('text-light');
    register.classList.add('text-light');
    userLoggedIn.classList.add('text-light');
    
}

function lightmode() {
    document.body.style.backgroundColor = 'white';
    document.body.style.color = 'black';
    var tigr = document.getElementById('tigr');
    var light_mode = document.getElementById('lightmode');
    var dark_mode = document.getElementById('darkmode');
    var log_in =  document.getElementById('login');
    var register =  document.getElementById('register');
    var userLoggedIn = document.getElementById("userLoggedIn");

    tigr.classList.remove('text-light');
    light_mode.classList.remove('text-light');
    dark_mode.classList.remove('text-light');
    log_in.classList.remove('text-light');
    register.classList.remove('text-light');
    userLoggedIn.classList.remove('text-light');
    
    tigr.classList.add('text-dark');
    light_mode.classList.add('text-dark');
    dark_mode.classList.add('text-dark');
    log_in.classList.add('text-dark');
    register.classList.add('text-dark');
    userLoggedIn.classList.add('text-dark');
}

function logindarkmode() {
    document.body.style.backgroundColor = 'black';
    document.body.style.color = 'white';
    var tigr = document.getElementById('tigr');
    var light_mode = document.getElementById('lightmode');
    var dark_mode = document.getElementById('darkmode');
    var logout = document.getElementById("logout");
    var userLoggedIn = document.getElementById("userLoggedIn");
    
    tigr.classList.remove('text-dark');
    light_mode.classList.remove('text-dark');
    dark_mode.classList.remove('text-dark');
    logout.classList.remove("text-dark");
    userLoggedIn.classList.remove('text-dark');
    
    tigr.classList.add('text-light');
    light_mode.classList.add('text-light');
    dark_mode.classList.add('text-light');
    logout.classList.add('text-light');
    userLoggedIn.classList.add('text-light');

}

function loginlightmode() {
    document.body.style.backgroundColor = 'white';
    document.body.style.color = 'black';
    var tigr = document.getElementById('tigr');
    var light_mode = document.getElementById('lightmode');
    var dark_mode = document.getElementById('darkmode');  
    var logout = document.getElementById('logout');
    var userLoggedIn = document.getElementById("userLoggedIn");

    tigr.classList.remove('text-light');
    light_mode.classList.remove('text-light');
    dark_mode.classList.remove('text-light');
    logout.classList.remove("text-light");
    userLoggedIn.classList.remove('text-light');

    tigr.classList.add('text-dark');
    light_mode.classList.add('text-dark');
    dark_mode.classList.add('text-dark');
    logout.classList.add("text-dark");
    userLoggedIn.classList.add('text-dark');
}
