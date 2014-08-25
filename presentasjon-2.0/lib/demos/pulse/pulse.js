(function() {

    var host = document.querySelector('#service-url').textContent;
    var socket = io.connect(host + ':80');

    var pulseElements = document.querySelectorAll('.live-pulse');

    socket.on('pulse', function (data) {
        for (var i = 0; i < pulseElements.length; ++i) {
            var pulseElement = pulseElements[i];

            pulseElement.textContent = data.pulse;
            pulseElement.parentNode.className = pulseText(data.pulse);
        }
    });

    util.onSection('pulse-useful', function() {
        document.querySelector('#pulse-overlay').style.display = 'block';
    });

    var hugeLivePulseElement = document.querySelector('#huge-live-pulse');
    util.section('huge-pulse', function(onSlide) {
        // For some reason this element leaks into the next slide, so we just hide it.
       if (onSlide) {
           hugeLivePulseElement.style.display = 'block';
       }
       else {
           hugeLivePulseElement.style.display = 'none';
       }

    });

    function pulseText(pulse) {
        var pulse = parseInt(pulse);
        if (isNaN(pulse)) {
            return '';
        }

        if (pulse < 75) {
            return 'low';
        }
        else if (pulse < 95) {
            return 'medium';
        }
        else if (pulse < 115) {
            return 'high';
        }
        else if (pulse < 135) {
            return 'overdrive';
        }
        else {
            return 'yikes';
        }
    }


})();
