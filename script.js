//display settings
let board;
let boardWidth=940;
let boardHeight=410;
let context;

//player settings
let playerWidth=70;
let playerHeight=121;
let playerX=50;
// let playerY=boardHeight-playerHeight;
let playerY=220;
let playerImg;
let player={
    x:playerX,
    y:playerY,
    width:playerWidth,
    height:playerHeight
}
//physics
let velocityY=0;
let gravity=0.2;

//lion settings
let lionImg;
let lionWidth=110;
let lionHeight=110;
let lionX=700;
// let lionY=boardHeight-lionHeight;
let lionY=240;
//generate lion 
let lionArray=[];
let lionSpeed=-3;

//game over
let gameover=false;

//score system
let score=0;

window.onload=function(){
    //display
    board=document.getElementById("board");
    board.height=boardHeight;
    board.width=boardWidth;
    context=board.getContext("2d");
    //player
    playerImg=new Image()
    playerImg.src="images/rabbit.png"
    playerImg.onload=function(){
        context.drawImage(playerImg,player.x,player.y,player.width,player.height)
    }
    //lion
    lionImg=new Image();
    lionImg.src="images/lion.png"
    requestAnimationFrame(update)
    setInterval(createLion,3000)
    document.addEventListener("keydown",movePlayer)
}
//update animation 
function update(){
    requestAnimationFrame(update)
    if(gameover){
        return;
    }
    context.clearRect(0,0,board.width,board.height)
    velocityY+=gravity;
    //create player object
    player.y=Math.min(player.y+velocityY,playerY);
    context.drawImage(playerImg,player.x,player.y,player.width,player.height)
    //create lion object
    for(let i=0;i<lionArray.length;i++){
        let lion=lionArray[i]
        lion.x+=lionSpeed
        context.drawImage(lion.img,lion.x,lion.y,lion.width,lion.height)
        if(onCollision(player,lion)){
            gameover=true;
            context.font="normal bold 70px Arial"
            context.fillStyle="red"
            context.textAlign="center"
            context.fillText("Game Over",boardWidth/2 , boardHeight/2)
        }
    }
    //display score
    score++;
    context.font="20px Arial"
    context.textAlign="left"
    context.fillText(score,5,20)
}

function movePlayer(e){
    if(gameover){
        return;
    }
    if(e.code=="Space" && player.y == playerY){
        velocityY=-10;
    }
}

function createLion(){
    if(gameover){
        return;
    }
    let lion={
        img:lionImg,
        x:lionX,
        y:lionY,
        width:lionWidth,
        height:lionHeight
    }
    lionArray.push(lion)
    if(lionArray.length>5){
        lionArray.shift()
    }
}

function onCollision(obj1,obj2){
    return obj1.x<obj2.x+obj2.width &&
           obj1.x+obj1.width>obj2.x &&
           obj1.y<obj2.y+obj2.height &&
           obj1.y+obj1.height>obj2.y
}

function restartGame(){
    location.reload();
}