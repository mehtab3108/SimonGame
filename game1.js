alert("Remember the pattern as it comes");

var userClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var level = 0;


function nextSequence() {
  level++;
  var randomNumber = Math.floor((Math.random() * 4));
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  $("h1").text("Level " + level);
}


$(".btn").click(function() {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  console.log(userClickedPattern);
  checkSequence();
});

function playSound(name) {
  var audio = new Audio(name + ".mp3");
  audio.play();
}

function wrongAnswer() {
  $("h1").text("Game Over, Press any key to Restart");

  playSound("wrong");

  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
  $(document).keypress(function(){
      location.reload();
    });
}

function checkSequence() {
  if (JSON.stringify(gamePattern) === JSON.stringify(userClickedPattern)) {
    setTimeout(function() {
      nextSequence();
    }, 1000);
    userClickedPattern = [];
  }
  for (var i = 0; i < userClickedPattern.length; i++) {
    if (gamePattern[i] !== userClickedPattern[i]) {
      wrongAnswer();
    }
  }
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

$(document).one("keypress", function() {
  nextSequence();
  console.log("key is pressed");
});
