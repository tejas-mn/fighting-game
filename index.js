const canvas  = document.querySelector('canvas');
const cx = canvas.getContext('2d');
const gravity = 0.3

canvas.width = 1024;
canvas.height = 576;

cx.fillRect(0,0 , canvas.width , canvas.height);


class Sprite{
    //object destructuring makes passing argumnets look neat
    constructor({position , velocity , height=150 , width=55}){
        this.position = position;
        this.velocity = velocity;
        this.height = height;
        this.width = width;
    }

    draw(){
     cx.fillStyle= "red";
     cx.fillRect(this.position.x , this.position.y , 50 , 150);
    }

    //updates for each frame
    update(){
        this.draw()
        this.position.y+=this.velocity.y;
        this.position.x+=this.velocity.x;
        //to stop sprite cross canvas height
        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y=0 //stops the sprite
        }else{
            //sprite is pulled by gravity even if its velocity is 0
            this.velocity.y+=gravity
        }
        
    }

}

const player = new Sprite({
    position:{
        x:0,
        y:0
    },
    velocity:{
        x:0,
        y:0
    }
});

const enemy = new Sprite({
    position:{
        x:100,
        y:0
    },
    velocity:{
        x:0,
        y:0
    },
});

player.draw();
enemy.draw();

function animateCallback(){
    requestAnimationFrame(animateCallback);
    //console.log('animate');
    cx.fillStyle = 'black'
    cx.fillRect(0,0,canvas.width , canvas.height);
    player.update();
    enemy.update();
}

animateCallback();

addEventListener('keyup' , (event)=>{
    console.log(event.key);
    switch(event.key){
        case 'd' :  player.velocity.x = 0
                    break
        case 'a' : player.velocity.x = 0
                   break
    }
    // console.log(event.key);
});

addEventListener('keydown' , (event)=>{
    console.log(event.key);
    switch(event.key){
        
        case 'd' :  player.velocity.x = 10
                    break
        case 'a' : player.velocity.x = -10
                   break
    }
    // console.log(event.key);
});