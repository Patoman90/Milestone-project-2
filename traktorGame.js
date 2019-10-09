//Setting the canvas variable and getting it by the DOM getElement method using ID.
var canvas = document.getElementById("myCanvas");

//Setting the canvas to a 2d context.
var ctx = canvas.getContext("2d");

//setting the canvas width and height attributes.
let screenWidth = 1200;
let screenHeight = 500;
let width = 65;
var isGameLive = true;

//Game character prototype class.
class GameCharacter{
    constructor(x,y,width,height,speed){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.maxSpeed = 4;
    }
    moveHorizontally(){
        this.x += this.speed;
        
    }

    moveVertically(){
        if(this.y > screenHeight - 100 || this.y < 10)
        { this.speed = -this.speed;
        }
        
        
        
        this.y += this.speed;
    }
}

//The player's character.
var Player = new GameCharacter(-50, 300, width, width,0)


//Enemies.
var enemies = [ 

//First enemy.
new GameCharacter(75, 50, width, width,2),

//Second enemy.
new GameCharacter(220, 150, width, width,6),

//Third enemy.
new GameCharacter(450, screenHeight - 100, width, width,5),

//Fourth enemy.
new GameCharacter(600, 100, width, width,4),

//Fifth enemy
new GameCharacter(800, screenHeight - 150, width, width,3),
];

//Goal.
var Goal = new GameCharacter(screenWidth -170, 300, width, width,0)

//Sprites I made.
var sprites = {};

//Load sprites

var loadSprites = function() {

    //Background.
    sprites.Background = new Image();
    sprites.Background.src = "assets/Field photo.jpg";
    
    //starting image (facing right)
    sprites.Player = new Image();
    sprites.Player.src = "assets/Tractor move right 1-1.png.png";

    //next image (facing right)
    //sprites.player = new Image();
    //sprites.player.src = "assets/Tractor move right 1-2.png.png";

    //next image (facing right)
    //sprites.player = new Image();
    //sprites.player.src = "assets/Tractor move right 1-3.png.png";

    //next image (facing right)
    //sprites.player = new Image();
    //sprites.player.src = "assets/Tractor move right 1-4.png.png";

    //last image if gameover (facing right)
    //sprites.player = new Image();
    //sprites.player.src = "assets/Tractor burn right 1-9.png.png";
    

     //starting image (facing left)
     //sprites.player = new Image();
     //sprites.player.src = "assets/Tractor move left 1-5.png.png";
 
     //next image (facing left)
     //sprites.player = new Image();
     //sprites.player.src = "assets/Tractor move left 1-6.png.png";
 
     //next image (facing left)
     //sprites.player = new Image();
     //sprites.player.src = "assets/Tractor move left 1-7.png.png";
 
     //next image (facing left)
     //sprites.player = new Image();
     //sprites.player.src = "assets/Tractor move left 1-8.png.png";

     //last image if gameover (facing left)
     //sprites.player = new Image();
     //sprites.player.src = "assets/Tractor burn left 1-10.png.png";

     //Enemy sprite A
     sprites.enemies = new Image();
    sprites.enemies.src = "assets/Enemy 2-1.png.png";

     //Enemy sprite B
     //sprites.enemies = new Image();
     //sprites.enemies.src = "assets/Enemy 2-2.png.png";

     //Goal sprite 
     sprites.Goal = new Image();
     sprites.Goal.src = "assets/Goal-1.png.png";
}



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

        // ctx.clearRect(0, 0, screenWidth,
        // screenHeight);

         //Draw Screen background 
         ctx.beginPath();
         ctx.fillStyle = "#ff6";
         ctx.fillRect(0, 0, screenWidth, screenHeight);
         //Draw background image.
         ctx.drawImage(sprites.Background,0,0,canvas.width,canvas.height);

         //Draw player.
         ctx.drawImage(sprites.Player, Player.x, Player.y);
         
        //Draw goal.
        ctx.drawImage(sprites.Goal, Goal.x, Goal.y);

        //Draw enemies.
        enemies.forEach(function(element) {
        ctx.drawImage(sprites.enemies, element.x, element.y,
            );
            });

            

}

//Update function to update the game.

var update = function() {

    if(checkCollisions(Player, Goal)){
    endGameLogic("You survived!");
    }

    Player.moveHorizontally();

    enemies.forEach(function(element) {
        if(checkCollisions(Player, element)){
            endGameLogic("You got abudcted!");
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

if (isGameLive) {
    window.requestAnimationFrame(step);
}
    
}
//Load sprites is called.
loadSprites();
//Step is called
step();