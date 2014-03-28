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

    var enemies = [];
    var enemySpeed = 2;

    scene.init = function(preloaded) {
        // Init player
        player = new cutie.Shape();
        player.graphics.beginFill('#555555').drawRect(0, 0, 10, 10);
        player.width = 10;
        player.height = 10;
        player.speed = .5;
        player.x = cutie.WIDTH/2 - player.width/2;
        player.y = cutie.HEIGHT/4 - player.height/2;
        this.addChild(player);

        // Put color under joystick thing
        var joystickBkg = new cutie.Shape();
        joystickBkg.graphics.beginFill('#dddddd').drawRect(0, 0, cutie.WIDTH, cutie.HEIGHT/2);
        joystickBkg.y = cutie.HEIGHT/2;
        this.addChild(joystickBkg);

        // Add joystick
        player.addBehavior(new cutie.Behavior.JoystickMovement( {
            'speed': 15,
            'joystick': new cutie.Joystick({
                'position': { 'x': cutie.WIDTH/2, 'y': cutie.HEIGHT/4 * 3 },
                'baseDisk': { 'radius': 200, 'color': '#555555' },
                'pointerDisk': { 'radius': 80, 'color': '#333333' }
            })
        }));

        // Init game timer
        setInterval(spawnEnemy, 1000);
    }

    scene.tick = function() {
        for (var i = 0; i < enemies.length; i++) {
            enemies[i].x += enemies[i].vx;
            enemies[i].y += enemies[i].vy;
        }
    }

    function spawnEnemy() {
        console.log('spawn');
        e = new cutie.Shape();
        e.graphics.beginFill('#000000').drawRect(0, 0, 20, 20);

        var direction = Math.floor(Math.random() * 4);
        switch(direction) {
            case moveType.UP:
                e.x = Math.random() * cutie.WIDTH;
                e.y = cutie.HEIGHT/2 + 30;
                e.vx = 0;
                e.vy = -enemySpeed;
                break;

            case moveType.LEFT:
                e.x = cutie.WIDTH + 30;
                e.y = Math.random() * cutie.HEIGHT/2;
                e.vx = -enemySpeed;
                e.vy = 0;
                break;

            case moveType.DOWN:
                e.x = Math.random() * cutie.WIDTH;
                e.y = -30;
                e.vx = 0;
                e.vy = enemySpeed;
                break;

            case moveType.RIGHT:
                e.x = -30;
                e.y = Math.random() * cutie.HEIGHT/2;
                e.vx = enemySpeed;
                e.vy = 0;
                break;
        }
        
        cutie.getStage().addChild(e);
        cutie.getStage().setChildIndex(e, 0);
        enemies.push(e);
    }

    cutie.registerScene(scene, 'game');
})();