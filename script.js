function refreshButton() {
    location.reload();
}

audio = new Audio('gamemusic.mp3')
audiogo = new Audio('gameover.mp3')


const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const drawCloud = (x, y) => {
    ctx.beginPath();
    ctx.arc(x, y, 60, Math.PI * 0.5, Math.PI * 1.5);
    ctx.arc(x + 70, y - 60, 70, Math.PI * 1, Math.PI * 1.85);
    ctx.arc(x + 152, y - 45, 50, Math.PI * 1.37, Math.PI * 1.91);
    ctx.arc(x + 200, y, 60, Math.PI * 1.5, Math.PI * 0.5);
    ctx.moveTo(x + 200, y + 60);
    ctx.lineTo(x, y + 60);
    ctx.strokeStyle = '#ffff';
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.fillStyle = '#8ED6FF';
    ctx.fill()
}

//filling walls
function drawWalls() {
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, canvas.width, 150);
    ctx.fillRect(0, canvas.height-150, canvas.width, 150);
}

class runner {
    constructor(x,y,size) {
        this.x = x;
        this.y = y;
        this.size = size;
        }
        fill() {
            ctx.fillStyle = "red"
            ctx.fillRect(this.x,this.y,this.size,this.size);
        }
}

//draw initial runner
var flag = 0;
var box = new runner(75,canvas.height-200,50)
box.fill();

document.body.onkeydown = function(e){
    if(e.key == ' ' && flag == 0){
        flag=1
        box.y = 150
    }
    else if(e.key == ' ' && flag == 1) {
        flag=0
        box.y = canvas.height-200
    }
}

class obstacle {
    constructor(x,y,length,width,dx){
        this.x = x;
        this.y = y;
        this.length = length;
        this.width = width;
        this.dx = dx
    }
}

var bottomObstacle = new obstacle(canvas.width-75,canvas.height-150,75,150,Math.random() * (6) + 4)
var topObstacle = new obstacle(canvas.width-75,0,75,150,Math.random() * (6) + 4)
function drawObstacle(obj) {
    ctx.fillStyle = "aliceblue";
    ctx.fillRect(obj.x,obj.y,obj.length,obj.width);
}




function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawWalls();
    drawCloud(100,450);
    drawCloud(700,500);
    drawCloud(1300,350);
    box.fill()
    drawObstacle(bottomObstacle);
    drawObstacle(topObstacle); 


    if(bottomObstacle.x <= -(Math.random() * (150) + 150)) {
        bottomObstacle.x = canvas.width-75
        if(bottomObstacle.dx <= 20) {
            bottomObstacle.dx++
        } else {
            bottomObstacle.dx = Math.random() * (20) + 10;
        }
    }
    if(topObstacle.x <= -(Math.random() * (150) + 150)) {
        topObstacle.x = canvas.width-75
        if(topObstacle.dx <= 20) {
            topObstacle.dx++;
        } else {
            topObstacle.dx = Math.random() * (20) + 10
        }
    }

    //obstacles moving left
    bottomObstacle.x -= bottomObstacle.dx;
    topObstacle.x -= topObstacle.dx;

    

    var myReq = requestAnimationFrame(animate);
    if(end) {
        cancelAnimationFrame(myReq);
        audiogo.play();
            setTimeout(() => {
                audio.pause();
                audiogo.pause(); 
            }, 1000);
    } else {
        audio.play();
    }
}
animate();
var gameOver = document.querySelector('.gameOver');
var score = 0;
var end = 0;
    setInterval(() => {
        if((box.x >= bottomObstacle.x+7) && (box.x <= bottomObstacle.x + 68) && (box.y == canvas.height-200)) {
            gameOver.style.visibility = 'visible'
            end = 1;
        } else if((box.x >= topObstacle.x+7) && (box.x <= topObstacle.x + 68) && (box.y == 150)){
            gameOver.style.visibility = 'visible'
            end = 1;
        } else {
            score++;
            updateScore(score)
        }
    }, 100);

    function updateScore(score) {
        document.querySelector('#scoreCont').innerHTML = "YOUR SCORE: " + score;
    }