(function() {
    var scene = new cutie.Scene();

    var player = {};
    var moveType = {
        'UP': 0,
        'RIGHT': 1,
        'DOWN': 2,
        'LEFT': 3,
        'NONE': 4
    }
    var moving = {};

     scene.init = function(preloaded) {
        // Init player
        player = new cutie.Shape();
        player.graphics.beginFill('#000000').drawRect(0, 0, 10, 10);
        player.width = 10;
        player.height = 10;
        player.speed = .5;
        player.x = cutie.WIDTH/2 - player.width/2;
        player.y = cutie.HEIGHT/2 - player.height/2;
        this.addChild(player);

        player.addBehavior(new cutie.Behavior.JoystickMovement( {
            'speed': 15,
            'joystick': new cutie.Joystick({
                'position': { 'x': cutie.WIDTH/2, 'y': cutie.HEIGHT/4 * 3 },
                'baseDisk': { 'radius': 200 },
                'pointerDisk': { 'radius': 50 }
            })
        }));

        // Init game timer
        setInterval(spawnEnemy, 100);
    }

    scene.tick = function() {

    }

    function updateMovement() {
        var stage = cutie.getStage();
        var midX = cutie.WIDTH/2;
        var midY = cutie.HEIGHT/2;
        var topY = cutie.HEIGHT/3;
        var bottomY = cutie.HEIGHT/3 * 2;
        if (stage.mouseX  > midX && stage.mouseY > topY && stage.mouseY < bottomY) {
            moving = moveType.RIGHT;
        }
        else if (stage.mouseX < midX && stage.mouseY > topY && stage.mouseY < bottomY) {
            moving = moveType.LEFT;
        }
        else if (stage.mouseY < midY) {
            moving = moveType.UP;
        }
        else {
            moving = moveType.DOWN;
        }
    }


    function spawnEnemy() {
        console.log('spawn');
    }

    cutie.registerScene(scene, 'game');
})();