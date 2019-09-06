var questions = [
    {
        name: "Ross",
        question: "How many times did Ross get married?",
        options: ["Four", "One", "Three", "None"],
        answer: "Three"
    },
    {
        name: "Phoebe",
        question: "Phoebe's brother let her name one of his triplets. What did she name her?",
        options: ["Josephine", "Chandler", "Katherine", "Emma"],
        answer: "Chandler"
    },
    {
        name: "Monica",
        question: "What did Monica make when she was trying to get over Richard?",
        options: ["Honey", "Jam", "A loud noise", "Candy"],
        answer: "Jam"
    },
    {
        name: "Joey",
        question: "What soap opera does Joey act on as 'Dr. Drake Remoray'?",
        options: ["All My Children", "General Hospital", "As the World Turns", "Days of Our Lives"],
        answer: "Days of Our Lives"
    },
    {
        name: "Rachel",
        question: "What was Rachel going to marry but left at the altar?",
        options: ["Barry", "Jim", "Ross", "George"],
        answer: "Barry"
    },
    {
        name: "Chandler",
        question: "What was the name of Chandler's annoying ex-girlfriend?",
        options: ["Lucy", "Pamela", "Janice", "Elizabeth"],
        answer: "Janice" 
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
        $("#game").html("<br><h2>Out of Time!</h2><br><br><p>The Correct Answer was: " + questions[index].answer +
            "</p>");
    } else if (userValue === questions[index].answer) { // if user is correct
        correctNum++;
        $("#game").html("<br><h2>Correct!</h2>");
    } else { // if user is wrong
        incorrectNum++;
        $("#game").html("<br><h2>Nope!</h2><br><br><p>The Correct Answer was: " + questions[index].answer +
            "</p>");
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
    $("#game").html("<br><h2>All done, here's how you did!</h2><p>Correct Answers: " + correctNum +
        "<br>Incorrect Answers: " + incorrectNum + "<br>Unanswered: " + unansweredNum +
        "</p><button id='start-over'>Start Over?</button>");

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



