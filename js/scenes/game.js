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
    var intervalId = 0;


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

        // Collision groups
        // this.registerCollisionGroup('enemies');
        // this.registerCollisionGroup('player', {
        //     'collidesWith': [{
        //         'name': 'enemies',
        //         'handle': function(obj1, obj2, pt) {
        //             console.log('butt');
        //             cutie.getActiveScene().removeChild(obj2);
        //         }
        //     }]
        // });
        // this.addCollidable(player, {
        //     'groupName': 'player', 
        //     'collisionType': 'rectangle'
        // });

        // Init game timer
        intervalId = setInterval(spawnEnemy, 250);
    }

    scene.tick = function() {
        for (var i = enemies.length - 1; i >= 0; i--) {
            var e = enemies[i];
            e.x += e.vx;
            e.y += e.vy;
            if (e.x > cutie.WIDTH + 50 || e.x < -50 || e.y > cutie.HEIGHT/2 + 50 || e.y < -50) {
                cutie.getActiveScene().removeChild(e);
                enemies.splice(i, 1);
            }

            if (checkCollide(player.x, player.y, player.width, player.height, e.x, e.y, 20, 20)) {
                cutie.getActiveScene().removeChild(e);
                enemies.splice(i, 1);
                enemies = [];
                cutie.getActiveScene().removeAllChildren();
                clearInterval(intervalId);
                cutie.setScene('gameOver', {'reset': true});
                break;
            }
        }
    }

    scene.reset = function() {
        this.removeAllChildren();
        this.enemies = [];
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
        // cutie.getActiveScene().addCollidable(e, {
        //     'groupName': 'enemies', 
        //     'collisionType': 'rectangle'
        // });
        cutie.getActiveScene().addChild(e);
        cutie.getActiveScene().setChildIndex(e, 0);
        enemies.push(e);
    }

    function checkCollide(x, y, oWidth, oHeight, xTwo, yTwo, oTwoWidth, oTwoHeight) {
        if( x+oWidth < xTwo || x > xTwo+oTwoWidth ) return false;
        if( y+oHeight < yTwo || y > yTwo+oTwoHeight ) return false;

        return true;
}

    cutie.registerScene(scene, 'game');
})();