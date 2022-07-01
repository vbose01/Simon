
var colors = ["red", "blue", "green", "yellow"];

var level = 0;
var gamePattern = [];

var answerPattern = [];
var started = false;

$(document).keypress(function() {
  if(!started)
  {
    $("#level-title").text("Level "+level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function(event) {

  var userChosenColor = $(this).attr("id");
  answerPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  if(started)
  {
    checkAnswer(answerPattern.length - 1);
  }
});










//----------------------Functions-------------------------

function nextSequence()
{
  answerPattern = [];

  $("h1").text("Level " + level);

  var randNum = Math.floor(Math.random()*4);
  var chosenColor = colors[randNum];
  gamePattern.push(chosenColor);

  $("#"+chosenColor).fadeOut(100).fadeIn(100);

  playSound(chosenColor);

  level++;
}



function playSound(name)
{
  var btnSound = new Audio("sounds/" + name + ".mp3");
  btnSound.play();
}



function animatePress(currentButton)
{
  $("#" + currentButton).addClass("pressed");
  setTimeout(function() {
    $("#" + currentButton).removeClass("pressed");
  },100);
}



function checkAnswer(currLevel)
{
  if(gamePattern[currLevel] === answerPattern[currLevel])
  {
    if(answerPattern.length === gamePattern.length)
    {
      setTimeout(nextSequence,1000);
    }
  }
  else
  {
    started = false;
    level = 0;
    gamePattern = [];
    $("#level-title").text("Game Over, Press Any Key to Restart");

    var over = new Audio("sounds/wrong.mp3");
    over.play();

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    },200);
  }
}
