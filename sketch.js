var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud
var cloudimage
var cacto
var jogando=2
var fim=3
var gamestate=jogando
var groupcacto
var gameover
var restart
var score=0
var gruponuvem
var contador=1
var die
var jump




function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadImage("trex_collided.png");
  cloudimage = loadImage("cloud.png")
  die=loadSound("die.mp3")
  jump=loadSound("jump.mp3")
  
  groundImage = loadImage("ground2.png");


  cacto1=loadImage("obstacle1.png")
  cacto2=loadImage("obstacle2.png")
  cacto3=loadImage("obstacle3.png")
  cacto4=loadImage("obstacle4.png")
  cacto5=loadImage("obstacle5.png")
  cacto6=loadImage("obstacle6.png")

  fimdejogo=loadImage("gameOver2.png")
  
  denovo=loadImage("restart.png")
  

 
  
}

function setup() {

  createCanvas(windowWidth,windowHeight)
  
  //crie um sprite de trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("morte", trex_collided);
  trex.scale = 0.5;
  
  //crie sprite ground (solo)
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = windowWidth;
  
  
  //crie um solo invisível
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;


  //gameover

  gameover=createSprite(windowWidth/2,100)
  gameover.addImage("fim", fimdejogo)
  

  //restart

  restart=createSprite(windowWidth/2,50)
  restart.addImage("recomecar", denovo)
  restart.scale=0.4
  restart.visible=false
  restart.depth=restart.depth+10



  groupcacto=createGroup()
  
  
  trex.setCollider("circle",0,-10,40);


  gruponuvem=createGroup()




}

function draw() {
  //definir cor do plano de fundo
  background(250);
   
  //estado de jogo

  text("pontos:"+score, windowWidth-100,50)

  


  if(gamestate==jogando){
          
    ground.velocityX = -(10+contador/100)
    
    
      if(touches.length>0&& trex.y >= 150) {
      trex.velocityY = -13;
      jump.play();

    }
    
    trex.velocityY = trex.velocityY + 0.8
       
    if (ground.x < 0){
      ground.x = ground.width/2;
    }

    contador++
    score=round(contador/10)
    
    gameover.visible=false
    
    //Gerar Nuvens
    spawnClouds()

    criarcactos()

    if(trex.isTouching(groupcacto)){

      trex.velocityY=0
      groupcacto.setVelocityXEach(0)
      die.play();

      




      gamestate=fim
  
    


  }
  }


  if(gamestate==fim){

    ground.velocityX=0
    groupcacto.velocityX=0
    cloud.velocityX=0
    trex.velocityX=0
    trex.changeAnimation("morte")

    
    gameover.visible=true

    

    restart.visible=true
   
    
    if(mousePressedOver(restart)||touches.length>0){

      restart.visible=false
      gameover.visble=false
      groupcacto.destroyEach();
      gruponuvem.destroyEach();
      ground.velocityX=-8
      trex.changeAnimation("running")

      contador=0
      score=0

      gamestate=jogando 

    }
  }
  
  //impedir que o trex caia
  trex.collide(invisibleGround);

  console.log(gamestate)

  drawSprites();

}

//função para gerar as nuvens
function spawnClouds(){
  
  if(frameCount%100==0){

  var y = random(30,100)
  cloud=createSprite(windowWidth,y,30,10)
  cloud.addImage("nuvem",cloudimage)
  cloud.velocityX=-(5+score/100)
  cloud.depth = trex.depth
  trex.depth = trex.depth+1
  cloud.lifetime=300
  gruponuvem.add(cloud)
  }

  
}


if(score>100){

if(frameCount%50==0){

  var y = random(30,100)
  cloud=createSprite(600,y,30,10)
  cloud.addImage("nuvem",cloudimage)
  cloud.velocityX=-(5+score/100)
  cloud.depth = trex.depth
  trex.depth = trex.depth+1
  cloud.lifetime=300
  gruponuvem.add(cloud)
  }
}









  function criarcactos(){
  
  if(contador%70==0){

  cacto=createSprite(windowWidth,160,30,10)
  cacto.scale=0.58
  cacto.velocityX=-(10+score/100)
  cacto.depth=ground.depth
  cacto.lifetime=600
    var r=(round(random(1,6)))
  
  switch(r){
    case 1:cacto.addImage(cacto1)
    break
    case 2:cacto.addImage(cacto2)
    break
    case 3:cacto.addImage(cacto3)
    break
    case 4:cacto.addImage(cacto4)
    break
    case 5:cacto.addImage(cacto5)
    break
    case 6:cacto.addImage(cacto6)
    break

    default:break
    
  }
    
  groupcacto.add(cacto)

}

if(score>100){
  
  if(contador%50==0){

    cacto=createSprite(windowWidth,160,30,10)
    cacto.scale=0.58
    cacto.velocityX=-(10+score/100)
    cacto.depth=ground.depth
    cacto.lifetime=600
      var r=(round(random(1,6)))
    
    switch(r){
      case 1:cacto.addImage(cacto1)
      break
      case 2:cacto.addImage(cacto2)
      break
      case 3:cacto.addImage(cacto3)
      break
      case 4:cacto.addImage(cacto4)
      break
      case 5:cacto.addImage(cacto5)
      break
      case 6:cacto.addImage(cacto6)
      break
  
      default:break
      
    }
  
      
    groupcacto.add(cacto)

  }
}






}