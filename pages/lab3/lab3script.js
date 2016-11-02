var questionArray = [
    new Question("First long text for question with many important information. How are you?",
        ["first answer", "second answer", "correct answer", "forth answer"], 2),
    new Question("Second long text for question with many important information. How are you?",
        ["first answer", "correct answer", "third answer", "forth answer"], 1),
    new Question("Third long text for question with many important information. How are you?",
        ["first answer", "second answer", "third answer", "correct answer"], 3),
    new Question("Fourth long text for question with many important information. How are you?",
        ["correct answer", "second answer", "third answer", "forth answer"], 0),
    new Question("Fifth long text for question with many important information. How are you?",
        ["first answer", "second answer", "correct answer", "forth answer"], 2),
    new Question("Sixth long text for question with many important information. How are you?",
        ["first answer", "second answer", "third answer", "correct answer"], 3)];
var currentQuestion = -1;
var userAnswers = [];

var previousButton = document.querySelector(".controlButtonDiv .controlButton:first-child");
previousButton.addEventListener("click", previousButtonListener);
var nextButton = document.querySelector(".controlButtonDiv .controlButton:last-child");
nextButton.addEventListener("click", nextButtonLister);
var finishButton = document.querySelector(".finishButton");
finishButton.addEventListener("click", finishButtonListener);
var question = document.querySelector("form .question");
var answerOne = document.querySelector("form .firstAnswer");
var answerTwo = document.querySelector("form .secondAnswer");
var answerThree = document.querySelector("form .thirdAnswer");
var answerFour = document.querySelector("form .fourthAnswer");

displayQuestionInformation(questionArray[0]);

function nextButtonLister() {
    if(currentQuestion < questionArray.length - 1) {
        if(currentQuestion == 0) {
            previousButton.classList.remove("disableButton");
        }

        if(getUserAnswer() != -1) {
            userAnswers[currentQuestion] = getUserAnswer();
        }

        currentQuestion++;
        if(currentQuestion == questionArray.length - 1) {
            nextButton.classList.add("disableButton");
        }
        displayQuestionInformation(questionArray[currentQuestion]);
    }
}

function previousButtonListener() {
    if(currentQuestion > 0) {
        if (currentQuestion == questionArray.length - 1) {
            nextButton.classList.remove("disableButton");
        }

        if(getUserAnswer() != -1) {
            userAnswers[currentQuestion] = getUserAnswer();
        }

        currentQuestion--;
        if(currentQuestion == 0) {
            previousButton.classList.add("disableButton");
        }
        displayQuestionInformation(questionArray[currentQuestion]);
    }
}

function finishButtonListener() {
    if(getUserAnswer() != -1) {
        userAnswers[currentQuestion] = getUserAnswer();
    }

    var testForm = document.forms.testForm;
    testForm.classList.add("hiddenBlock");

    var resultArea = document.querySelector(".resultArea");

    var resultTable = document.querySelector(".resultTable");
    var elementsArray = resultTable.children;
    for(var i = elementsArray.length - 1; i >= 1; i--) {
        resultTable.removeChild(elementsArray[i]);
    }
    var fragment = document.createDocumentFragment();
    for(var i = 0; i < questionArray.length; i++) {
        var tr = document.createElement('tr');

        var questionID = document.createElement('td');
        questionID.innerHTML = i + 1;
        tr.appendChild(questionID);
        var userAnswer = document.createElement('td');
        userAnswer.innerHTML = questionArray[i].answerArray[userAnswers[i]];
        tr.appendChild(userAnswer);
        var correctAnswer = document.createElement('td');
        correctAnswer.innerHTML = questionArray[i].getCorrectAnswer();
        tr.appendChild(correctAnswer);

        fragment.appendChild(tr);
    }
    resultTable.appendChild(fragment);

    var resultLine = document.querySelector(".resultLine");
    var correctAnswersCount = 0;
    for (var i = 0; i < questionArray.length; i++) {
        if(questionArray[i].correctAnswer == userAnswers[i])
            correctAnswersCount++;
    }
    resultLine.innerHTML = "You have " + correctAnswersCount + " of " + questionArray.length + " correct answers.";

    resultArea.classList.remove("hiddenBlock");
}

function getUserAnswer() {
    var answersRadio = document.getElementsByName("question");
    for(var i = 0; i < answersRadio.length; i++) {
        if(answersRadio[i].checked) {
            return i;
        }
    }
    return -1;
}

function setUserAnswer(answerId) {
    var answersRadio = document.getElementsByName("question");
    answersRadio[answerId].checked = true;
}

function dropUserAnswer() {
    var answersRadio = document.getElementsByName("question");
    for(var i = 0; i < answersRadio.length; i++) {
        answersRadio[i].checked = false;
    }
}

function displayQuestionInformation(q) {
    var queString = "Question " + (questionArray.indexOf(q) + 1) + ": " + q.question;
    question.innerHTML = queString;
    answerOne.innerHTML = q.answerArray[0];
    answerTwo.innerHTML = q.answerArray[1];
    answerThree.innerHTML = q.answerArray[2];
    answerFour.innerHTML = q.answerArray[3];

    currentQuestion = questionArray.indexOf(q);

    dropUserAnswer();
    if(userAnswers[currentQuestion]) {
        setUserAnswer(userAnswers[currentQuestion]);
    }
}

function Question(question, answerArray, correctAnswer) {
    this.question = question;
    this.answerArray = answerArray;
    this.correctAnswer = correctAnswer;

    this.getCorrectAnswer = function () {
        return answerArray[correctAnswer];
    }
}