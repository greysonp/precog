window.onload = function() {
    // Set the log level
    cutie.Log.setLogLevel(cutie.Log.VERBOSE);

    // Kick-off the game
    cutie.start('title', {
        'scaleType': cutie.ScaleType.LETTERBOX
    });
}