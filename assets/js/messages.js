var loc = window.location.href;
var url = new URL(loc);
var success = url.searchParams.get("success");
var error = url.searchParams.get("error");

var newurl = window.location.toString();
newurl = newurl.substring(0, newurl.indexOf("?"));

switch(success) {
    case "Login":
        swal("Success", "Successfully Logged In", "success")
        .then(function() { 
            window.history.replaceState({}, document.title, newurl);
        });
        break;

    case "Logout":
        swal("Success", "Successfully Logged Out", "success")
        .then(function() { 
            window.history.replaceState({}, document.title, newurl);
        });
        break;

    case "Signup":
        swal("Signup Successful", "Please Login", "success")
        .then(function() { 
            window.history.replaceState({}, document.title, newurl);
        });
        break;

    case "JournalPaperAdded":
        swal("Success", "Journal Paper Details Added Successfully", "success")
        .then(function() { 
            window.history.replaceState({}, document.title, newurl);
        });
        break;

    case "ConferencePaperAdded":
        swal("Success", "Conference Paper Details Added Successfully", "success")
        .then(function() { 
            window.history.replaceState({}, document.title, newurl);
        });
        break;

    case "PatentAdded":
        swal("Success", "Patent Details Added Successfully", "success")
        .then(function() { 
            window.history.replaceState({}, document.title, newurl);
        });
        break;

    case "ProjectAdded":
        swal("Success", "Project Details Added Successfully", "success")
        .then(function() { 
            window.history.replaceState({}, document.title, newurl);
        });
        break;
}

switch(error) {
    case "NoUserFound":
        swal("Error", "No User Found", "error")
        .then(function() { 
            window.history.replaceState({}, document.title, newurl);
        });
        break;

    case "WrongPassword":
        swal("Error", "Incorrect Password. Please Try Again !", "error")
        .then(function() { 
            window.history.replaceState({}, document.title, newurl);
        });
        break;

    case "UserExists":
        swal("Error", "User Already Exists", "error")
        .then(function() { 
            window.history.replaceState({}, document.title, newurl);
        });
        break;

    case "JournalPaperExists":
        swal("Error", "Journal Paper Already Exists", "error")
        .then(function() { 
            window.history.replaceState({}, document.title, newurl);
        });
        break;

    case "ConferencePaperExists":
        swal("Error", "Conference Paper Already Exists", "error")
        .then(function() { 
            window.history.replaceState({}, document.title, newurl);
        });
        break;

    case "PatentExists":
        swal("Error", "Patent Already Exists", "error")
        .then(function() { 
            window.history.replaceState({}, document.title, newurl);
        });
        break;

    case "ProjectExists":
        swal("Error", "Project Already Exists", "error")
        .then(function() { 
            window.history.replaceState({}, document.title, newurl);
        });
        break;
}