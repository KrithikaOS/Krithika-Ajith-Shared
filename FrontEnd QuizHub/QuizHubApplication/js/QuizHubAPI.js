function openSignUpPage() {
    window.location = "/QuizHubApplication/html/SignUpPage.html";
}

function openLoginPage() {
    window.location = "/QuizHubApplication/html/LoginPage.html";
}

function addUser() {

    var details, statusCode;
    var url = "http://localhost:8080/api/user/signup";
    var response = makeAjaxRequest(url, {
        method: 'POST',
        request: {
            id: document.getElementById('userId').value,
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            company: document.getElementById('company').value
        },
        async: true
    }, function(details, statusCode) {
        if (statusCode === 200) {
            loginUser(document.getElementById('email').value, document.getElementById('password').value);
        }
        if (statusCode === 302) {
            location.replace("http://localhost:8080/api/app/dashboard");
        }
    });

}

/* function loginUserFromForm() {

    var details, statusCode;
    var url = "http://localhost:8080/api/user/login";

    var response = makeAjaxRequest(url, {
        method: 'POST',
        request: {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        },
        async: true
    }, function(details, statusCode) {
        if (statusCode === 200) {
            location.replace("http://localhost:8080/api/app/dashboard");
        }
    });

} */


function loginUser(emailNew, passwordNew) {

    var details, statusCode, password, email;
    if (arguments.length == 2) {
        email = emailNew;
        password = passwordNew;
    } else {
        email = document.getElementById('email').value;
        password = document.getElementById('password').value;
    }
    var url = "http://localhost:8080/api/user/login";
    var response = makeAjaxRequest(url, {
        method: 'POST',
        request: {
            email: email,
            password: password
        },
        async: true
    }, function(details, statusCode) {
        if (statusCode === 200) {
            location.replace("http://localhost:8080/api/app/dashboard");
        }
        if (statusCode === 302) {
            location.replace("http://localhost:8080/api/app/dashboard");
        }
    });

}


function makeAjaxRequest(url, payload, callback) {

    if (!url)
        throw new Error("Invalid url to make ajax request");

    if (!payload)
        throw new Error("Invalid details");
    var http = new XMLHttpRequest();
    method = payload.method;
    if (typeof(payload.request) == "string") {
        url += payload.request;
    }

    if (method == "GET") {
        http.open(method, url, payload.async);
        http.send();
    } else {
        http.open("POST", url, payload.async);
        http.setRequestHeader("Content-Type", "application/json");
        http.send(JSON.stringify(payload.request));
    }
    http.onreadystatechange = function() { // Call a function when the
        // state changes.
        if (http.readyState == 4 && http.status == 200) {
            callback(this.responseText, http.status);
        }

        if (http.readyState == 4 && http.status == 409) {
            callback(JSON.parse(this.responseText));
        }


    }
}