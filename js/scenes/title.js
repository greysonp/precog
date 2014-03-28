(function() {
    var scene = new cutie.Scene();

     scene.init = function(preloaded) {
        // Title text
        var titleText = new cutie.Text('precog.', '125px Arial', '#000000');
        titleText.x = cutie.WIDTH/2 - titleText.getMeasuredWidth()/2;
        titleText.y = 40;
        this.addChild(titleText);

        // Play button
        var playBtn = new cutie.Shape();
        playBtn.graphics.beginFill('#ffffff').drawRect(0, 0, 300, 200);
        playBtn.x = cutie.WIDTH/2 - 150;
        playBtn.y = 700 - 150;
        this.addChild(playBtn);
        var playText = new cutie.Text('play.', '100px Arial', '#000000');
        playText.x = cutie.WIDTH/2 - playText.getMeasuredWidth()/2;
        playText.y = 600;
        this.addChild(playText);
        playBtn.addEventListener('click', function() {
            cutie.setScene('game');
        });
    }

    cutie.registerScene(scene, 'title');
})();