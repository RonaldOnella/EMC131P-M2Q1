export default class menuScene extends Phaser.Scene {
    constructor(){
        super('menuScene');
    }

    preload(){
        this.load.image('backg', './assets/background.png')

    }

    create(){
        this.cameras.main.fadeIn(1000, 0, 0, 0)
        this.add.image(500,400, 'backg');
        bkg.setDepth(-1);
        bkg.setOrigin(0);
        this.add.text(325,250, 'Game!',{fontSize:'60px',stroke: '#fff', strokeThickness: 3,  fontStyle: 'bold', fill: '#0000FF'});
        
        let start = this.add.text(125,400, 'Start Game', {fontSize: '40px'});
        start.setInteractive({useHandCursor: true});
        start.on('pointerdown', () => this.startButton());
       
        let cred = this.add.text(125,500, 'Credits', {fontSize: '40px'});
        cred.setInteractive({useHandCursor: true});
        cred.on('pointerdown', () => this.creditsButton());
    }

    startButton(){
        console.log("Game Start!");
        this.cameras.main.fadeOut(1000, 0, 0, 0)
        this.scene.start('gameScene');
    }

    creditsButton(){
        this.cameras.main.fadeOut(1000, 0, 0, 0)
        this.scene.start('cScene');
    }
}