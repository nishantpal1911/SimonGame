// Global variables for storing progress
var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var clickListen = false;

// Keyboard button press listener on game restart
$(document).on('keypress',function(){
  if(level==0)
    nextSequence();
});

// Mouse button click listener which records user button clicks
$(".btn").on('click',function(){
  if(clickListen){
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    checkAnswer();
  }
});

// Checks last user button click with game sequence pattern
function checkAnswer(){
  var n = userClickedPattern.length;
  var userChosenColour = userClickedPattern[n-1];

  if(n>gamePattern.length || gamePattern[n-1]!=userChosenColour){
    gameOver();
  }
  else{
    playSound(userChosenColour);
    animatePress(userChosenColour);

    if(userClickedPattern.length == gamePattern.length){
      userClickedPattern = [];
      nextSequence();
    }
  }
}

// Plays sounds and effects for game-over page
function gameOver(){

  clickListen = false;
  playSound("wrong");
  $('body').addClass('game-over');

  var newHeading = 'Game-Over. Press any key to restart';
  if(level>5){
    newHeading = 'You reached Level ' + level + '!👏<br>' + newHeading;
  }
  $('h1').html(newHeading);

  setTimeout(function(){
    $('body').removeClass('game-over');
  },150);
  resetGame();
}

// Resets the game
function resetGame(){
  level=0;
  gamePattern = [];
  userClickedPattern = [];
}

// User click button animation
function animatePress(colour){

  $('#'+colour).addClass('pressed');

  setTimeout(function(){
    $('#'+colour).removeClass('pressed');
  },100);
}

// Randomly generates next colour in pattern and animates the button
function nextSequence(){

  clickListen = false;
  $('#level-title').text('Level ' + (++level));

  setTimeout(function(){
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(120).fadeIn(120);
    clickListen = true;
  },1000);
}

// Plays audio of the colour passed as parameter
function playSound(colour){
  new Audio('sounds/' + colour + '.mp3').play();
}
