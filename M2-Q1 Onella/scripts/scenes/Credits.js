export default class cScene extends Phaser.Scene {
    constructor(){
        super('cScene');
    }

    preload(){
        this.load.image('backg', './assets/background.png')

    }

    create(){
        this.cameras.main.fadeIn(1000, 0, 0, 0)
        let bkg = this.add.image(0,0,'backg')
        bkg.setDepth(-1);
        bkg.setOrigin(0);
        this.add.text(225,350, 'Ronald Onella', {fontSize: '40px'});
        this.add.text(150   ,250, 'Credits',{fontSize:'60px',stroke: '#fff', strokeThickness: 3,  fontStyle: 'bold', fill: '#0000FF'});
        this.add.text(225, 400, 'A223', {fontSize: '40px'});
        this.add.text(225, 450, 'EMC', {fontSize: '40px'});
        let back = this.add.text(100,50, 'BACK', {fontSize: '40px'});
        back.setInteractive({useHandCursor: true});
        back.on('pointerdown', () => this.backButton());
        
    }

    backButton(){
        console.log("Returning to Menu");
        this.cameras.main.fadeOut(1000, 0, 0, 0)
        this.scene.start('menuScene');
        

    }
}