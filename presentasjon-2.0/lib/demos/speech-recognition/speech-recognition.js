(function() {

    var started = false;
    var isVoiceSlide;
    var currentSlide;

    util.section('voice-command', function(slide) {
        isVoiceSlide = slide;
        // Start one time once we get to the right section.
        if (slide && !started) {

            // Let's define a command.
            var commands = {
                'hello': inSlide(function() { console.log('Hello world!'); }),
                'color :color': inSlide(function(color) {
                    var firstElement = currentSlide.querySelector('*');
                    window.ele = firstElement;
                    firstElement.style.color = color;
                }),
                'previous slide': inSlide(function() { Reveal.navigateUp(); }),
                'next slide': inSlide(function() { Reveal.navigateDown(); })
            };

            // Add our commands to annyang
            annyang.addCommands(commands);

            // Start listening.
            annyang.start();
            started = true;
        }

        if (slide) {
            currentSlide = slide;
        }
    });

    function inSlide(func) {
        return function() {
            if (!isVoiceSlide) return;
            return func.apply(this, arguments);
        }
    }

})();