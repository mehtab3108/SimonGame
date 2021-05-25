alert("Remember the pattern as it comes!");

var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;

$(document).one("keypress",function(){
  nextSequence();
});

function nextSequence(){
  var randomNumber=Math.floor((Math.random()*4));
  var randomChosenColour= buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level++;
  $("h1").text("Level "+level);
}

$(".btn").click(function(){
  var userChosenColour=this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkSequence();
});

function checkSequence(){
  if(JSON.stringify(gamePattern)===JSON.stringify(userClickedPattern)){
    setTimeout(function(){nextSequence();},1000);
    userClickedPattern=[];
  }
  for(var i=0;i<userClickedPattern.length;i++){
    if(gamePattern[i]!==userClickedPattern[i]){
      wrongAnswer();
    }
  }
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


function playSound(name){
  var audio=new Audio(name+".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("."+currentColour).addClass("pressed");
  setTimeout(function(){
    $("."+currentColour).removeClass("pressed");
  },100);
}
