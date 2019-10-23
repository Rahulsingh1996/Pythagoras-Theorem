(function() {
  function buildQuiz() {
   
    const output = [];

    
    myQuestions.forEach((currentQuestion, questionNumber) => {
     
      const answers = [];

      for (letter in currentQuestion.answers) {
    
        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join("")} </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        // if answer is wrong or blank
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");
  const myQuestions = [
    {
      question: "The hypotenuse of a right angled triangle is opposite to the",
      answers: {
        a: "Acute angle",
        b: "Right angle",
        c: "Obtuse angle",
        d: "None of these"
      },
      correctAnswer: "b"
    },
    {
      question: "The length of the hypotenuse of a right triangle is 32 inches and the length of one of the legs is 18 inches. What is the length, to the nearest tenth of an inch, of the other leg of the triangle?",
      answers: {
        a: "36.7 inches",
        b: "28.4 inches",
        c: "26.5 inches",
        d: "25.4 inches"
      },
      correctAnswer: "c"
    },
    {
      question: "Two sides of a triangle measure 10 inches and 6 inches. Which of the following choices for the length of the third side will make the triangle a right triangle?",
      answers: {
        a: "7 inches",
        b: "4 inches",
        c: "8 inches",
        d: "9 inches"
      },
      correctAnswer: "c"
    }
  ];

  // display quiz right away
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})()