// Validating Empty Field
function checkEmpty() {
    if (document.getElementsByName('tag').value == "" || document.getElementById('A').value == "" || document.getElementById('B').value == "" || document.getElementById('C').value == "" || document.getElementById('D').value == "" || document.getElementsByName('status').value == "" ||
        document.getElementById('description').value == "" || document.getElementById('correctAnswer').value == "") {
        alert("Fill All Fields !");
    } else {
        addQuestion();
        //  document.getElementById('form').submit();
        // alert("Form Submitted Successfully...");
    }
}
//Function To Display Popup
function openAddQuestionForm() {
    document.getElementById('question').style.display = "block";
}
//Function to Hide Popup
function cancelAddQuestionForm() {
    document.getElementById('question').style.display = "none";
}

function addQuestion() {
    var details, statusCode;
    var url = "http://localhost:8080/api/question/addQuestion";
    var response = makeAjaxRequest(url, {
        method: 'POST',
        request: {
            tag: document.getElementsByName('tag').value,
            status: document.getElementsByName('status').value,
            description: document.getElementById('description').value,
            option: {
                A: document.getElementById('A').value,
                B: document.getElementById('B').value,
                C: document.getElementById('C').value,
                D: document.getElementById('D').value
            },
            correctAns: document.getElementById('correctAnswer').value

        },
        async: true
    }, function(details, statusCode) {
        if (statusCode === 200) {
            alert("Question added successfully");
        }
        if (statusCode === 302) {
            location.replace("http://localhost:8080/api/app/dashboard");
        }
    });
}