/*
 -declare variables:
  .array of question objects, each object has 4 properties: name, question, options, answer
  .intervalID
  .time=120 (time remaining: 2 minutes)
  .correctNum=0
  .incorrectNum=0
  .unansweredNum=0

 -count function

 -when user clicks Start button:
  .in elementId "game", replace Start button with below:
   ..display "Time Remaining: 02:00"
   ..display questions in form
   ..display Done button
  .start interval to run count function every 1 second 

 -When user clicks Done button or when time runs out, game over:
  .clear interval
  .get user's selection and calculate the result:
   ..if no selection, unansweredNum++
   ..if there is a selection, compare with the question's answer
     ...if correct, correctNum++
     ...else, incorrectNum++
  .in elementId "game", replace everything with below:
   ..display "All Done!"
   ..display correctNum, incorrectNum and unansweredNum
*/

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
var time = 120;
var correctNum = 0;
var incorrectNum = 0;
var unansweredNum = 0;


function count() {
    time--;
    var currentTime = timeConverter(time);
    $("#time").text("Time Remaining: " + currentTime);

    if (time === 0) {
        gameOver();
    }
}


$("#start").click(function () {

    $("#start").remove();

    $("#time").text("Time Remaining: 02:00");

    for (var i = 0; i < questions.length; i++) {
        $("form").append("<label>" + questions[i].question + "</label><br>");

        for (var j = 0; j < questions[i].options.length; j++) {
            $("form").append("<label><input type='radio' name='" + questions[i].name + "' value='" +
                questions[i].options[j] + "'>" + questions[i].options[j] + "  </label>");
        }

        $("form").append("<br><br>");
    }

    $("#game").append("<button id='done'>Done</button>");
    $("#done").click(gameOver);

    intervalID = setInterval(count, 1000);

});


function gameOver() {

    clearInterval(intervalID);

    for (var i = 0; i < questions.length; i++) {
        var userValue = $("input[name='" + questions[i].name + "']:checked").val();

        if (!userValue) { 
            unansweredNum++; }
        else if (userValue === questions[i].answer) { 
            correctNum++; }
        else { 
            incorrectNum++; }
    }

    $("#game").html("<br><h2>All Done!<br><br>Correct Answers: " + correctNum +
        "<br>Incorrect Answers: " + incorrectNum + "<br>Unanswered: " + unansweredNum +
        "</h2>");
}


function timeConverter(t) {
    //  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
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



