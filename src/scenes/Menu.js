class Menu extends Phaser.Scene {
    constructor() {
      super("menuScene")
    }
    init(){
    
      console.log('Menu:init: highscore: %d',highScore)
      this.rotation=0
      this.roto=true

    }
    
    preload(){
        this.load.image('rocket', 'assets/img/rocket.png' )
        this.load.image('menu', 'assets/img/Menu.png' )
        this.load.image('title', 'assets/img/Title.png' )
        this.load.image('spaceship', 'assets/img/spaceship.png' )
        this.load.image('base', 'assets/img/Base.png' )
        this.load.image('starfield', 'assets/img/Saul_starfield.png' )
        this.load.image('planets', 'assets/img/Planets.png' )
        this.load.audio('sfx-select', './assets/sounds/sfx-select.wav')
        this.load.audio('sfx-explosion1', './assets/sounds/sfx-explosion-1.wav')
        this.load.audio('sfx-explosion2', './assets/sounds/sfx-explosion-2.wav')
        this.load.audio('sfx-explosion3', './assets/sounds/sfx-explosion-3.wav')
        this.load.audio('sfx-explosion4', './assets/sounds/sfx-explosion-4.wav')
        this.load.audio('sfx-explosion5', './assets/sounds/sfx-explosion-5.wav')
        this.load.audio('sfx-shot', './assets/sounds/sfx-shot.wav')
        this.load.audio('background_music', 'assets/sounds/Song.wav');


        this.load.spritesheet('explosion', 'assets/img/explosion.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        })
    }
    create() {
      

        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        })
        // display score
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
             top: 5,
              bottom: 5,
            },
            fixedWidth: 0
         }

            // show menu text
            /*
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Use ←→ arrows to move & (F) to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#000';
        menuConfig.color = '#FFFFFF';
        this.add.text(game.config.width/2, game.config.height/2 + 4* borderUISize + 2 * borderPadding, 'High score:' + highScore, menuConfig).setOrigin(0.5);
         */

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        
        this.add.sprite(640,480, 'menu').setOrigin(1, 1)
        this.title=this.add.sprite(640,480, 'title').setOrigin(1, 1)
        this.add.text(game.config.width/2+120, game.config.height/2 + 4* borderUISize + 2 * borderPadding +50, 'High score: ' + highScore,{fontFamily:'Yamaha EBM7 Bold',fontSize: '18px',}).setOrigin(0.5);

    }

    update() {
  
      if ((this.rotation%100)==0 ){
        this.roto=!this.roto
      }
      if(this.roto){
        this.title.rotation += 0.001;
        this.rotation ++
  
      }
      else{
        this.title.rotation -= 0.001;
        this.rotation ++ 
      }

     
    //console.log('Menu:init: highscore: %d',Stats.highScore)
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000    
          }
          this.sound.play('sfx-select')
          this.scene.start('playScene')    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 45000    
          }
          this.sound.play('sfx-select')
          this.scene.start('playScene')    
        }
      }
  }