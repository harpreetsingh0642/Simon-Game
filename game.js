var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var you=new Audio("sounds/you_can_do_it.mp3");

// nextSequence();
var started = false;
var level = 0;
$("body").keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
      $("h3").addClass("visible-h3");
    nextSequence();
    started = true;
  }
});

//sound when you click anywhere on site
$(".div-above-h1 , .div-below-h1 , .new-div , .div-below-btn").click(function(){
console.log(this);
you_sound();
});

//function called when you click on buttons
$(".btn").click(function() {
  console.log("button is clicked");
  console.log(this);
  var userChosenColour;
  userChosenColour = $(this).attr("id");
  playSound(userChosenColour);
  userClickedPattern.push(userChosenColour);
  //console.log(userChosenColour);
  animatePress(userChosenColour);
  console.log(userClickedPattern.length - 1);
  checkAnswer(userClickedPattern.length - 1);

});

//function which generates the sequence of the game
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomChosenColour;
  var randomNumber = Math.random();
  randomNumber = randomNumber * 4;
  randomNumber = Math.floor(randomNumber);
  randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).delay(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  animatePress(randomChosenColour);
}

//checking the pattern order pressed by user
function checkAnswer(currentLevel) {

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("correct");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");



    playSound("game_lose");
    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
      $("h3").removeClass("visible-h3");
    }, 4000);


    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}


//function for sound (except for you_can_do_it sound)
function playSound(name) {
  var aud = new Audio("sounds/" + name + ".mp3");
  aud.play();
}

//animation added to the buttons when prssed
function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");
  setTimeout(function() {
    $("." + currentColour).removeClass("pressed");
  }, 100);
}


// function for starting new game again
function startOver() {
  level = 0;
  started = false;
  gamePattern = [];
}


// sound function for you can do it
function you_sound()
{

  you.play();
}
