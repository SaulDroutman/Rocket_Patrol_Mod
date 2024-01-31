class Spaceship extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame)
        //add to scene display and update
        scene.add.existing(this)

        this.points = pointValue
        this.moveSpeed = game.settings.spaceshipSpeed
        this.speed=false
        
    }

    update(){
        
        this.x -= this.moveSpeed

        if(this.x<0-this.width){
            this.reset()
        }


    }

   reset(){
    this.x = game.config.width
   }

}