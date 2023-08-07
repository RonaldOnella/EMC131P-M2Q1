export default class endScene extends Phaser.Scene {
    constructor(){
        super('endScene');
    }

    init(data){
            console.log('init',data),
            this.score = data.score;
        }

        preload(){
            this.load.image('backg', './assets/background.png')
    
        }

    create(){

        this.cameras.main.fadeIn(1000, 0, 0, 0)
        let bkg = this.add.image(400,350,'backg')
        this.add.text(255,220, 'Star Points:' + this.score +'', {fontSize: '40px', fontStyle: 'bold', fill: '#ffffff' })
        this.add.text(125,150, ' You got bombed! ', {fontSize: '60px', fontStyle: 'bold', fill: '#ffffff' });
        let main = this.add.text(100, 320, 'Main Menu', {fontSize: '40px', fill: '#ff0033'});
        main.setInteractive({useHandCursor:true});
        main.on('pointerdown', ()=> this.menuButton());
        let restart = this.add.text(400,320,'Restart Game', {fontSize:'40px', fill:'#ff0033'});
        restart.setInteractive({useHandCursor:true});
        restart.on('pointerdown',() => this.restartButton());


    }

    menuButton(){
        console.log("Loading Main Menu...");
        this.scene.start('menuScene');
    }

    restartButton(){
        console.log("Restarting...");
        this.scene.start('gameScene');
        
    }

   
        
    }
