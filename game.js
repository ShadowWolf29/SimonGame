var buttonColors =["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

//Funcion de animacion
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed")
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);  
};

//Funcion de sonido
function PlaySound(name)
{
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
};

//Funcion para generar la secuencia siguiente
function nextSequence(){
    //Limpiamos el contador de usuario cada vez que inicie la nueva secuencia
    userClickedPattern = [];

    var RandomNumber = Math.random() * 4;
    RandomNumber = Math.floor(RandomNumber);

    var RandomChosenColour = buttonColors[RandomNumber];
    gamePattern.push(RandomChosenColour);//Push es para ingresar el nueco dato al arreglo

    //Animacion al iniciar el juego
    $("#"+RandomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    PlaySound(RandomChosenColour);

    //cambia el h1 a el nivel
    $("#level-title").text("Level "+level)

    //se suma un nivel
    level++;
};

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
};

$(document).keydown(function(keyboard)
{
    if(keyboard.key == "a")
    {
        level = 0;
        gamePattern = [];
        userClickedPattern = [];
        nextSequence();
    }
})

//Cosas que pasan al apretar los botones
$(".btn").on("click", function(){
    var userChosenColour = $(this).attr("id");
    //Agregando el color escogido a el patron de colores de usuario
    userClickedPattern.push(userChosenColour);

    PlaySound(userChosenColour);
    animatePress(userChosenColour);
    
    //verificando la respuesta
    CheckAswer(userClickedPattern.length-1);
});

function CheckAswer(currentLevel){

    //compara uno a uno los patrones
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
    {

       if (userClickedPattern.length === gamePattern.length){

        //siguiente nivel
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }
    }
    else
    {
        //muestra mensaje de gameover
        PlaySound("wrong");
        $("body").addClass("game-over")
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);  
        var ActualLevel = (userClickedPattern.length)-1
        $("#level-title").text("Game Over, your score is "+ActualLevel+ ", Press A to Restart." )
        startOver();
    }
};
