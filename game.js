var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [], userGeneratedPattern = [];
var level = 0, start = false;

$(document).keydown(function () {
    if (start === false) {
        $("#level-title").text("Level " + level);
        nextSequence();
        start = true;    
    }
});

$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userGeneratedPattern.push(userChosenColor);

    playSound(userChosenColor); 
    animateClick(userChosenColor);
    checkAnswer(userGeneratedPattern.length - 1);
});

function checkAnswer(currentLevel)
{
    if (gamePattern[currentLevel] === userGeneratedPattern[currentLevel]){
        if (userGeneratedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game over, press any key to restart");

        setTimeout(function () {
            $("body").removeClass("game-over")
        }, 200);

        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    start = false;
}

function nextSequence() {
    userGeneratedPattern = [];
    level++;
    $("#level-title").text("level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animateClick(color) {
    $("#" + color).addClass("pressed");
    setTimeout(function () {
        $("#" + color).removeClass("pressed");
    }, 100);
}

