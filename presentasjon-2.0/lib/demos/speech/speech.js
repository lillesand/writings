(function() {

    var talking = false;
    var previousTimer;

    window.speechSynthesis.onvoiceschanged = function() {
        console.log('Available voices', window.speechSynthesis.getVoices().map(function(voice) { return voice.name; }));

        util.section('self-controlling', function(slide) {
            window.speechSynthesis.cancel(); // Cancel any ongoing speech
            clearTimeout(previousTimer); // Cancel any pending speech
            talking = false;
            if (!slide) return;

            var voice = getVoice(slide.querySelector('.speech').dataset.voice);

            var sentence = slide.querySelector('.speech').textContent;
            previousTimer = setTimeout(function() {
                talking = true;
                speak(voice, sentence, function() {
                    if (talking) {
                        // If you finished talking without being canceled (i.e. a new page loaded), navigate to the next slide
                        Reveal.navigateDown();
                    }
                    talking = false;
                });
            }, 1500);
        });

        function speak(voice, sentence, then) {
            var msg = new SpeechSynthesisUtterance(sentence);
            msg.voice = voice;
            msg.addEventListener('end', then);

            //IMPORTANT!! Do not remove: Logging the object out fixes some onend firing issues.
            console.log(msg);
            //placing the speak invocation inside a callback fixes ordering and onend issues.
            setTimeout(function () {
                window.speechSynthesis.speak(msg);
            }, 0);
        }

        function getVoice(wanted) {
            return window.speechSynthesis.getVoices().filter(function (voice) {
                return voice.name == wanted;
            })[0];
        }
    };

})();