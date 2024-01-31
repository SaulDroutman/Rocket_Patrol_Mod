
class Play extends Phaser.Scene {
    constructor() {
      super("playScene")
    }


    
    create() {

      this.backgroundMusic = this.sound.add('background_music');
      this.backgroundMusic.loop = true; 
      this.backgroundMusic.play();
      console.log('Play:create: highscore: %d',highScore)

//add starfield
this.base = this.add.tileSprite(0, 0, 640, 480, 'base').setOrigin(0, 0)
this.planets = this.add.tileSprite(0, 0, 640, 480, 'planets').setOrigin(0, 0)
this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0)

// green UI background
this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0)

// white borders
this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0)   

//add player 
this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0)

//add spacechips

this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0)
this.ship02 = new Spaceship2(this, game.config.width + borderUISize*3, borderUISize*4 + borderPadding*2, 'spaceship2', 0, 50).setOrigin(0,0)
this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0)

//binding controls
keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

//initilize score
this.p1Score = 0

// display score
let scoreConfig = {
    fontFamily: 'Courier',
    fontSize: '28px',
    backgroundColor: '#F3B141',
    color: '#843605',
    align: 'right',
    padding: {
      top: 5,
      bottom: 5,
    },
    fixedWidth: 100
  }

this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig)
//this.scoreRight = this.add.text(( game.config.height+borderPadding)/2 , borderUISize + borderPadding*2, "high score: " +highScore)
// GAME OVER flag
this.gameOver = false

// 60-second play clock
scoreConfig.fixedWidth = 0
//his.clock = this.time.delayedCall(game.settings.gameTimer
this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
    this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5)
    this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5)
    this.gameOver = true
}, null, this)

this.clockRight = this.add.text(( game.config.height+borderPadding), borderUISize + borderPadding*2,((game.settings.gameTimer-(game.settings.gameTimer*this.clock.getProgress().toString().substr(0, 4)))/1000) , scoreConfig)
}

    update() {

      //this.clockRight = this.add.text(game.config.width, borderUISize + borderPadding*2, this.clock.getProgress().toString().substr(0, 4))
        //console.log((game.settings.gameTimer-(game.settings.gameTimer*this.clock.getProgress().toString().substr(0, 4)))/1000)
        //highscore at end of game
        if(this.gameOver){
          if(highScore < this.p1Score){
            console.log("new high score")
            highScore =this.p1Score
            this.add.text(( game.config.width)/2 , (game.config.height/2 )+ 128, "NEW HIGH SCORE! : " +highScore,this.scoreConfig).setOrigin(0.5)
          }
        }
          // check key input for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)) {
            this.backgroundMusic.stop();
            this.scene.restart()
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.backgroundMusic.stop();
            this.scene.start("menuScene")
          }
        //planet scrolling parallax
        this.base.tilePositionX -= .2 
        this.starfield.tilePositionX -= 4
        

        if(!this.gameOver) {               
            this.p1Rocket.update()        
            this.ship01.update()           
            this.ship02.update()
            this.ship03.update()
        } 

         // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship03)   
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset() 
            this.shipExplode(this.ship02)   
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset()   
            this.shipExplode(this.ship01)   
        }

        this.clockRight.text=((game.settings.gameTimer-(game.settings.gameTimer*this.clock.getProgress().toString().substr(0, 4)))/1000)

        if(keyLEFT.isDown && this.p1Rocket.x >= borderUISize + this.p1Rocket.width){
          this.planets.tilePositionX -= 3
      } 
      if (keyRIGHT.isDown && this.p1Rocket.x <=game.config.width - borderUISize - this.p1Rocket.width){
        this.planets.tilePositionX += 3
      }

      }

      checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
          rocket.x + rocket.width > ship.x && 
          rocket.y < ship.y + ship.height &&
          rocket.height + rocket.y > ship. y) {
          return true
        } else {
          return false
        }
      }

      shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode')             // play explode animation
        boom.on('animationcomplete', () => {   // callback after anim completes
          ship.reset()                         // reset ship position
          ship.alpha = 1                       // make ship visible again
          boom.destroy()                       // remove explosion sprite
        })
        this.num= 1+Math.floor((Math.random()*100) %5 )
        console.log("playing explosion: %d",this.num)
        this.sound.play('sfx-explosion'+this.num)
        this.p1Score += ship.points
        this.scoreLeft.text = this.p1Score             
      }

      

     

  }