export default class gameScene extends Phaser.Scene{

    constructor(){
        super("gameScene");
    }



    init(){
    
    }
    

    
    preload ()
    {
        this.load.image('Mountains', 'assets/background.jpg ');
        this.load.image('mainplatform', 'assets/mainplatform.png');
        this.load.image('ground', 'assets/platform.jpg  ');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
        this.load.audio('ambiance','assets/wind.wav');
        this.load.audio('ding','assets/ding.mp3');
    }
    
    create ()
    {
        this.n = 1
    
        this.collAudio = this.sound.add('ding');
        this.bckgrndAudio = this.sound.add('ambiance');
        let musicConfig = {
            mute: false,
            volume: 0.8,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
        this.bckgrndAudio.play(musicConfig);
        //  Background img
        this.add.image(400, 300, 'Mountains');
    
        //  The platforms group contains the ground and the 2 ledges we can jump on
        this.platforms = this.physics.add.staticGroup();
    
        //  Ground
        this.platforms.create(400, 568, 'mainplatform').setScale(2).refreshBody();
    
        //   ledges
        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground');
    
        // The player and its settings
        this.player = this.physics.add.sprite(100, 450, 'dude');
    
        //  Player physics properties.
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
    
        // player animations, turning, walking left and walking right.
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
    
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });
    
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
    
        //  Input Events
        this.cursors = this.input.keyboard.createCursorKeys();
    
        this.shiftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
    
    
        //  spawn stars
        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });
        
    
        this.stars.children.iterate((child) => {
    
            // star bounce
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    
        });
    
        this.bombs = this.physics.add.group();
    
        //  The score
        this.scoreText = this.add.text(650, 16, 'Stars: 0', { fontSize: '25px', fill: '#000' });
    
        //  Platform Collider
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.collider(this.bombs, this.platforms);
    
        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
        this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
       
        this.gameOver = false;
        this.score = 0
    }
    
    
    
    
    update ()
    {
        if (this.gameOver == true) {
            this.player.visible = false;
                this.scene.start('endScene', {score:this.score})
        }
    
        if (this.shiftKey.isDown){
            if (this.cursors.left.isDown)
            {
            this.player.setVelocityX(-300);
    
            this.player.anims.play('left', true);
            }
            else if (this.cursors.right.isDown)
            {   
            this.player.setVelocityX(300);
    
            this.player.anims.play('right', true);
            }
            else
            {
            this.player.setVelocityX(0);
    
            this.player.anims.play('turn');
            }
        }
    
        else if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-160);
    
            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(160);
    
            this.player.anims.play('right', true);
        }
    
        else
        {
            this.player.setVelocityX(0);
    
            this.player.anims.play('turn');
        }
    
        if (this.cursors.up.isDown && this.player.body.touching.down)
        {
            this.player.setVelocityY(-330);
        }
        
    }
    hitBomb (player, bomb)
        {
            this.physics.pause();
        
            this.player.setTint(0xff0000);
        
            this.player.anims.play('turn');
        
            this.gameOver = true;
        
        }
    
    collectStar (player, star)
    {
        this.collAudio.play();
        star.disableBody(true, true);
        
        //  Add and update the score
        this.score += 1;
        this.scoreText.setText('Stars: ' + this.score);
    
        //recolor sprite body on star collection
        this.cstars += 1;
        if (this.cstars == 1){
            this.player.setTint(0xff0000);
           
        }
        else if (this.cstars == 2){
            this.player.setTint(0xFFA500);
        }
            
        else if (this.cstars == 3) {
            this.player.setTint(0xffff00);
        }
        else if (this.cstars == 4) { 
            this.player.setTint(0x00ff00);
        }
        else if (this.cstars == 5) {
            this.player.setTint(0x0000ff);
        }
        else if (this.cstars == 6) {
            this.player.setTint(0x4b0082);
        }
        else {
            this.player.setTint(0xee82ee);
            this.cstars = 0 //reset cstars to 0
        }
    
        //resize sprite body on star collection
       
        if(this.score %5 ==0){
            
            this.player.setScale (this.n += 0.1)
            console.log(this.n)
            this.bomb = this.bombs.create(Phaser.Math.Between(50, 750), 16, 'bomb');
            this.bomb.setBounce(1);
            this.bomb.setCollideWorldBounds(true);
            this.bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            this.bomb.allowGravity = false;
        }
    
        if (this.stars.countActive(true) <12)
        {
            //  A new batch of stars to collect
            this.stars.create(Phaser.Math.RND.between(0, 700), Phaser.Math.RND.between(0, 500), 'star');
            
        }
    
    
        
    }

}


