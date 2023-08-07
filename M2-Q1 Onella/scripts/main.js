import menuScene from './scenes/Menu.js'
import gameScene from './scenes/Game.js'
import endScene from './scenes/End.js'
import cScene from './scenes/Credits.js'

let menu = new menuScene();
let gameS = new gameScene();
let end = new endScene();
let credits = new cScene();


let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    
};

let newgame = new Phaser.Game(config);
newgame.scene.add("menuScene", menu);
newgame.scene.add("gameScene", gameS);
newgame.scene.add("cScene", credits);
newgame.scene.add("endScene", end);

newgame.scene.start("menuScene")

