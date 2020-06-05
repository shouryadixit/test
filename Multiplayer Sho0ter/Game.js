class Game {
  constructor(){
   
  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();

    }

    car1 = createSprite(displayWidth/2-730,displayHeight/2);
   // car1.velocityX = 2
    car1.addAnimation("car1",sol_img);
    car2 = createSprite(displayWidth/2+730,displayHeight/2);
   // car2.velocityX = 2
    car2.addImage("car2",soldier2_img);
   // car3 = createSprite(1,500);
   // car3.addImage("car3",car3_img);
   // car4 = createSprite(1,700);
   // car4.addImage("car4",car4_img);
    cars = [car1, car2, car3, car4];

   
  }

  play(){
    
    form.hide();
    
    Player.getPlayerInfo();
    
   



    if(allPlayers !== undefined){

      background(rgb(198,135,103));

    
     image(back_img, 0, 0,displayWidth, displayHeight-100 );
     

     if (keyIsDown(RIGHT_ARROW) && player.index !== null){
     car1.addAnimation("car1",sol_img);
        car1.x = car1.x + 10 
       }

       if (keyIsDown(LEFT_ARROW) && player.index !== null){
        car1.addAnimation("car0",sol2_img);
        car1.x = car1.x - 10
       }
  

      //index of the array
      var index = 0;

      //x and y position of the cars
      var y = 175 ;
      var x;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        y = y + 200;
        //use data form the database to display the cars in y direction
        x = displayWidth - allPlayers[plr].distance;
       // cars[index-1].y = y;
        //cars[index-1].x = x;
       // console.log(index, player.index)
       
       
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          cars[index - 1].shapeColor = "red";
          camera.position.y = displayHeight/2;
          camera.position.x = cars[index-1].x;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

   
    if(player.distance > 3860){
      gameState = 2;
    }
    console.log(player.distance);
    drawSprites();
  }
 
  end(){
   
  }
}
