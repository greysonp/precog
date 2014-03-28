(function() {
    var scene = new cutie.Scene();

     scene.init = function(preloaded) {
        // Declare pairs of button texts and scene names
        var titleText = new createjs.Text('precog.', '125px Arial', '#000000');
        titleText.x = cutie.WIDTH/2 - titleText.getMeasuredWidth()/2;
        titleText.y = 40;
        this.addChild(titleText);

        var playText = new createjs.Text('play.', '100px Arial', '#000000');
        playText.x = cutie.WIDTH/2 - playText.getMeasuredWidth()/2;
        playText.y = 600;
        this.addChild(playText);
        playText.addEventListener('click', function() {
            cutie.setScene('game');
        });
    }

    cutie.registerScene(scene, 'title');
})();