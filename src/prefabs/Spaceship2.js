class Spaceship2 extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame)
        //add to scene display and update
        scene.add.existing(this)

        this.points = pointValue
        this.moveSpeed = game.settings.spaceshipSpeed +2
        this.speed=false
        
    }

    update(){
        
        this.x -= this.moveSpeed
        if((Math.floor(Math.random()*100)%2)==0){
            this.y-=1+Math.floor((Math.random()*100) %9 )
        }
        else{
            this.y+=1+Math.floor((Math.random()*100) %9 )
        }

        

        if(this.x<0-this.width){
            this.reset()
        }


    }

   reset(){
    this.x = game.config.width
    this.y=borderUISize*5 + borderPadding*2
   }

}