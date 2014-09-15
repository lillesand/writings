(function() {

    var talking = false;
    var timers;

    window.speechSynthesis.onvoiceschanged = function() {
        console.log('Available voices', window.speechSynthesis.getVoices().map(function(voice) { return voice.name; }));

        util.section('self-controlling', function(slide) {
            window.speechSynthesis.cancel(); // Cancel any ongoing speech
            talking = false;
            if (timers) {
                clearTimeout(timers.speech); // Cancel any pending speech
                clearTimeout(timers.navigation); // Cancel any ongoing slide change
            }


            if (!slide) return;

            var speechElement = slide.querySelector('.speech');

            if (speechElement) {
                var voice = getVoice(speechElement.dataset.voice);
                var delayBeforeTalking = speechElement.dataset.initialDelay || 1500;
                var delayBeforeChangingSlide = speechElement.dataset.navigationDelay || 1500;
                var sentence = speechElement.textContent;

                timers = scheduleSpeaking(voice, sentence, delayBeforeChangingSlide, delayBeforeTalking);
            }
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

        function scheduleSpeaking(voice, sentence, delayBeforeChangingSlide, delayBeforeTalking) {
            var speechTimer, navigationTimer;
            speechTimer = setTimeout(function () {
                talking = true;
                speak(voice, sentence, function () {
                    if (talking) {
                        // If you finished talking without being canceled (i.e. a new page loaded), navigate to the next slide
                        navigationTimer = setTimeout(function () {
                            Reveal.navigateDown();
                        }, delayBeforeChangingSlide);

                    }
                    talking = false;
                });
            }, delayBeforeTalking);

            return {
                speech: speechTimer,
                navigation: navigationTimer
            };
        }

        function getVoice(wanted) {
            return window.speechSynthesis.getVoices().filter(function (voice) {
                return voice.name == wanted;
            })[0];
        }
    };

})();