let queNo = 0      //checks question Number
var score = 0      // keeps the score

//shuffles the questions in order to get random questions
let shuffledQuestions = questions.sort(function () {
  return Math.random() - 0.5
})


//starts the quiz
$('.start').on('click', start);

function start() {
  $('.ready').addClass('hide')
  $('#questionContainer').removeClass('hide')
  $('#quiz').addClass('hide')
  $('#progress').removeClass('hide')
  getNextQuestion()
}

//function to get the next question
function getNextQuestion() {
  document.body.classList.add('outer')
  let userAns = document.querySelector('button.active')
  if (userAns != null) {
    if (userAns.innerHTML === shuffledQuestions[queNo].answer) {
      score++
    }
  }

  queNo++
  if (queNo <= 5) {
    showQuestion(queNo)
  } else {
    document.getElementById('submit').classList.remove('hide')
    document.getElementById('next').disabled = true
  }
  const progressBar = document.getElementById('progress-bar')
  progressBar.style.width = `${((queNo - 1) / 5) * 100}%`
}

//function to display question
function showQuestion(count) {
  let question = document.getElementById('question')
  question.innerText = shuffledQuestions[count].question
  let choices = document.getElementById('answers')
  choices.innerHTML = `
            <button class="opt">${shuffledQuestions[count].choices[0]}</button>
            <button class="opt">${shuffledQuestions[count].choices[1]}</button>
            <button class="opt">${shuffledQuestions[count].choices[2]}</button>
            <button class="opt">${shuffledQuestions[count].choices[3]}</button>
    `
  activeClass()
}

//funtion to apply active class
function activeClass() {
  let choosenAnswer = document.querySelectorAll('#answers button')
  choosenAnswer.forEach((ans) => {
    ans.onclick = function () {
      choosenAnswer.forEach((ans) => {
        if (ans.classList.contains('active')) {
          ans.classList.remove('active')
        }
      })
      ans.classList.add('active')
    }
  })
}


//function to Display result in pie chart
function submit() {
  var data = [
    {
      x: 'Correct',
      value: score,
      normal: {
        fill: '#9966cc',
      }
    },
    {
      x: 'Wrong',
      value: 5 - score,
      normal: {
        fill: '#880085',
      }
    }
  ]

  // create the chart
  var chart = anychart.pie();
  chart.title("Result")
  //set data
  chart.data(data);
  // display the chart in the container
  chart.legend().position("top");
  chart.legend().itemsLayout("horizontal");
  chart.container('wrapper');
  chart.draw();
  document.getElementById('wrapper').classList.remove('hide')
  document.getElementById('questionContainer').classList.add('hide')
  document.getElementById('progress').classList.add('hide')
  document.getElementById("playagain").classList.remove("hide");
}

