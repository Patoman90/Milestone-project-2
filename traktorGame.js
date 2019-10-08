//Setting the canvas variable and getting it by the DOM getElement method using ID.
var canvas = document.getElementById("myCanvas");
//Setting the canvas to a 2d context.
var ctx = canvas.getContext("2d");
//setting the canvas width and height attributes.
let screenWidth = 1000;
let screenHeight = 500;
let width = 50;
var isGameLive = true;
//Game character prototype class.
class GameCharacter{
    constructor(x,y,width,height,color,speed){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.speed = speed;
        this.maxSpeed = 4;
    }
    moveHorizontally(){
        this.x += this.speed;
        
    }

    moveVertically(){
        if(this.y > screenHeight - 50 || this.y < 10)
        { this.speed = -this.speed;
        }
        
        
        
        this.y += this.speed;
    }
}




//Enemies.
var enemies = [ 

//First enemy.
new GameCharacter(75, 50, width, width, "rgb(255, 26, 26)",2),

//Second enemy.
new GameCharacter(220, 150, width, width, "rgb(255, 26, 26)",6),

//Third enemy.
new GameCharacter(450, screenHeight - 100, width, width, "rgb(255, 26, 26)",5),

//Fourth enemy.
new GameCharacter(600, 100, width, width, "rgb(255, 26, 26)",4),

//Fifth enemy
new GameCharacter(800, screenHeight - 150, width, width, "rgb(255, 26, 26)",3),
];

//Goal.
var Goal = new GameCharacter(screenWidth - 50, 250, width, width, "rgb(153, 0, 204)",0)

//Sprites I made.
var sprites = {};

//Load sprites

var loadSprites = function() {
    //starting image (facing right)
    sprites.player = new Image();
    sprites.player.src = "assets/Tractor move right 1-1.png.png";

    //next image (facing right)
    sprites.player = new Image();
    sprites.player.src = "assets/Tractor move right 1-2.png.png";

    //next image (facing right)
    sprites.player = new Image();
    sprites.player.src = "assets/Tractor move right 1-3.png.png";

    //next image (facing right)
    sprites.player = new Image();
    sprites.player.src = "assets/Tractor move right 1-4.png.png";

    //last image if gameover (facing right)
    sprites.player = new Image();
    sprites.player.src = "assets/Tractor burn right 1-9.png.png";

     //starting image (facing left)
     sprites.player = new Image();
     sprites.player.src = "assets/Tractor move left 1-5.png.png";
 
     //next image (facing left)
     sprites.player = new Image();
     sprites.player.src = "assets/Tractor move left 1-6.png.png";
 
     //next image (facing left)
     sprites.player = new Image();
     sprites.player.src = "assets/Tractor move left 1-7.png.png";
 
     //next image (facing left)
     sprites.player = new Image();
     sprites.player.src = "assets/Tractor move left 1-8.png.png";

     //last image if gameover (facing left)
     sprites.player = new Image();
     sprites.player.src = "assets/Tractor burn left 1-10.png.png";

     //Enemy sprite A
     sprites.enemies = new Image();
     sprites.enemies.src = "assets/Enemy 2-1.png.png";

     //Enemy sprite B
     sprites.enemies = new Image();
     sprites.enemies.src = "assets/Enemy 2-2.png.png";

     //Goal sprite 
     sprites.goal = new Image();
     sprites.goal.src = "assets/Goal-1.png.png";
}

//The player's character.
var Player = new GameCharacter(10, 250, width, width, "rgb(0,0,255)",0)

//PLayer controls

//Player moves right
document.onkeydown = function(event){
    let keyPressed = event.keyCode;
    if (keyPressed == 39){
        Player.speed = Player.maxSpeed;
    }

//Player moves left
    else if(keyPressed == 37){
        Player.speed = -Player.maxSpeed;
    }
};


document.onkeyup = function(event) {
    Player.speed = 0;
}

//Collision functions.
    var checkCollisions = function(rect1, rect2){
        var xOverlap = Math.abs(rect1.x - rect2.x)
        <= Math.max(rect1.width, rect2.width);

        var yOverlap = Math.abs(rect1.y - rect2.y)
        <= Math.max(rect1.height, rect2.height);

        return xOverlap && yOverlap;
    }
     
   

        
    


//Draw function.
var draw = function(){
    ctx.clearRect(0, 0, screenWidth,
         screenHeight);

         //Draw player.
         ctx.fillStyle = Player.color;
         ctx.fillRect(Player.x, Player.y,
            Player.width, Player.height);


        //Draw enemies.
            enemies.forEach(function(element) {
                ctx.fillStyle = element.color;
         ctx.fillRect(element.x, element.y,
            element.width, element.height);
            });

            //Draw goal.
            ctx.fillStyle = Goal.color;
            ctx.fillRect(Goal.x, Goal.y,
               Goal.width, Goal.height);

}

//Update function to update the game.

var update = function() {

    if(checkCollisions(Player, Goal)){
    endGameLogic("You survived!");
    }

    Player.moveHorizontally();

    enemies.forEach(function(element) {
        if(checkCollisions(Player, element)){
            endGameLogic("You lose!");
        }
      element.moveVertically (); 
     });
     enemies[0].moveVertically();

     
         
      
}

var endGameLogic = function(text) {
isGameLive = false;
alert(text);
window.location = "";
}


//Step function to put all the game events etc inside.
var step = function() {
    update();
    draw();
if(isGameLive){
    window.requestAnimationFrame(step);}

    
};
//Step is called
step();