(function() {
    var scene = new cutie.Scene();

     scene.init = function(preloaded) {
        // Declare pairs of button texts and scene names
        var titleText = new createjs.Text('precog', '36px Arial', '#000000');
        titleText.x = cutie.WIDTH/2 - titleText.getMeasuredWidth()/2;
        titleText.y = 40;
        return titleText;
    }

    cutie.registerScene(scene, 'game');
})();