const canvas  = document.querySelector('canvas');
const cx = canvas.getContext('2d');
const gravity = 0.7

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
        this.lastKey
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

const keys = {
    a:{
        pressed:false
    },
    d:{
        pressed:false
    },
    ArrowLeft:{
        pressed:false
    },
    ArrowRight:{
        pressed:false
    }
}

function animateCallback(){
    requestAnimationFrame(animateCallback);
    //console.log('animate');
    cx.fillStyle = 'black'
    cx.fillRect(0,0,canvas.width , canvas.height);
    player.update();
    enemy.update();
    
    player.velocity.x=0
    enemy.velocity.x=0

    //player  movement
    if(keys.a.pressed && player.lastKey=='a'){
        player.velocity.x=-5
    }else if(keys.d.pressed && player.lastKey=='d'){
        player.velocity.x=5
    }

    //enemy movement
    if(keys.ArrowLeft.pressed && enemy.lastKey=='ArrowLeft'){
        enemy.velocity.x=-5
    }else if(keys.ArrowRight.pressed && enemy.lastKey=='ArrowRight'){
        enemy.velocity.x=5
    }
}

animateCallback();

addEventListener('keyup' , (event)=>{
    console.log(event.key);
    switch(event.key){
        case 'd':   keys.d.pressed=false
                    break   
        case 'a':   keys.a.pressed=false
                    break     
    }

    switch(event.key){
        case 'ArrowRight':   
        keys.ArrowRight.pressed=false
        break   
        case 'ArrowLeft':   
        keys.ArrowLeft.pressed=false
        break     
    }
    // console.log(event.key);
});

addEventListener('keydown' , (event)=>{
    console.log(event.key);
    switch(event.key){
        case 'd':   
        keys.d.pressed=true
        player.lastKey = 'd'
        break    

        case 'a':   
        keys.a.pressed=true
        player.lastKey = 'a'
        break

        case 'w':   
        player.velocity.y = -20
        break

        case 'ArrowRight':   
        keys.ArrowRight.pressed=true
        enemy.lastKey = 'ArrowRight'
        break    

        case 'ArrowLeft':   
        keys.ArrowLeft.pressed=true
        enemy.lastKey = 'ArrowLeft'
        break

        case 'ArrowUp': 
        enemy.velocity.y = -20
        break

    }
    // console.log(event.key);
});