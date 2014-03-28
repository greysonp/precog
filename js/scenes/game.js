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

        // Init game timer
        setInterval(spawnEnemy, 100);

        // Determine movement
        cutie.getStage().on('stagemousedown', updateMovement);
        cutie.getStage().on('stagemousedown', function() {
            moving = moveType.NONE;
        });
        cutie.getStage().on('stagemousemove', updateMovement);
    }

    scene.tick = function() {
        switch(moving) {
            case moveType.RIGHT:
                player.x +=  player.speed;
                break;
            case moveType.LEFT:
                player.x -=  player.speed;
                break;
            case moveType.UP:
                player.y -=  player.speed;
                break;
            case moveType.DOWN:
                player.y +=  player.speed;
                break;
        }
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