var questions = [
    {
        name: "married",
        question: "Where did Ross and Rachel get married?",
        options: ["Atlantic City", "Las Vegas"],
        answer: "Las Vegas"
    },
    {
        name: "penguin",
        question: "What is the name of Joey's stuffed penguin?",
        options: ["Alisha May", "Hugsy"],
        answer: "Hugsy"
    },
    {
        name: "middle name",
        question: "What is Chandler's middle name?",
        options: ["Marcel", "Muriel"],
        answer: "Muriel"
    }
];

var intervalID;
var time = 20;  // 20 seconds for answering each question
var correctNum = 0;
var incorrectNum = 0;
var unansweredNum = 0;
var index = 0;  // track which question to display


$("#start").click(displayQuestion);


function displayQuestion() {

    // remove all emlements inside elementId "game"
    $("#game").empty();

    // create new element to display time remaining
    var timeEle = $("<h2>");
    timeEle.text("Time Remaining: 00:20");

    // create new element to display a question and its options
    var formEle = $("<form>");

    formEle.append("<label>" + questions[index].question + "</label><br><br>");

    for (var j = 0; j < questions[index].options.length; j++) {
        formEle.append("<label><input type='radio' name='" + questions[index].name + "' value='" +
            questions[index].options[j] + "'>" + questions[index].options[j] + "  </label>");
    }

    // append new elements to elementId "game"
    $("#game").append(timeEle, formEle);

    // start counting down
    intervalID = setInterval(count, 1000);

    // if user selects an option, display result for the question
    $("input[name='" + questions[index].name + "']").click(displayResult);
}


// function count to update time remaining
function count() {

    time--;
    var currentTime = timeConverter(time);
    $("h2").text("Time Remaining: " + currentTime);

    // if time runs out, display result for the question
    if (time === 0) {
        displayResult();
    }
}


function displayResult() {

    // stop counting down
    clearInterval(intervalID);
    // reset time
    time = 20;

    // get user's selection
    var userValue = $("input[name='" + questions[index].name + "']:checked").val();

    if (!userValue) { // if user didn't select any option, which means time runs out
        unansweredNum++;
        $("#game").html("<br><h2>Out of Time!<br><br>Correct answer is: " + questions[index].answer +
            "</h2>");
    } else if (userValue === questions[index].answer) { // if user is correct
        correctNum++;
        $("#game").html("<br><h2>Correct!</h2>");
    } else { // if user is wrong
        incorrectNum++;
        $("#game").html("<br><h2>Nope!<br><br>Correct answer is: " + questions[index].answer +
            "</h2>");
    }

    // increase index to go to next question
    index++;

    if (index === questions.length) { // if no more question
        setTimeout(gameOver, 3000); // call gameOver function to display final result after 3 seconds
    } else { // if there are more questions
        setTimeout(displayQuestion, 3000); // display next question after 3 seconds
    }
}


function gameOver() {

    // display final result and "Start Over" button
    $("#game").html("<br><h2>All Done!<br><br>Correct Answers: " + correctNum +
        "<br>Incorrect Answers: " + incorrectNum + "<br>Unanswered: " + unansweredNum +
        "</h2><button id='start-over'>Start Over ?</button>");

    // if user clicks "Start Over" button, call startOver function
    $("#start-over").click(startOver);
}


function startOver() {

    // reset all variables
    correctNum = 0;
    incorrectNum = 0;
    unansweredNum = 0;
    index = 0;

    // display first question
    displayQuestion();
}


//  function that takes the current time in seconds and convert it to minutes and seconds (mm:ss)
function timeConverter(t) {

    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    if (minutes === 0) {
        minutes = "00";
    }

    else if (minutes < 10) {
        minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
}



