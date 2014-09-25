(function() {

    var serviceUrl = document.querySelector('#service-url');
    var socket = io.connect(serviceUrl.dataset.protocol + '://' + serviceUrl.textContent.trim() + ':' + serviceUrl.dataset.port);

    var pulseElements = document.querySelectorAll('.live-pulse');

    var pulseCounter = 0;
    var pulseHistory = [
    ];

    socket.on('pulse', function (data) {
        pulseHistory.push([pulseCounter++, data.pulse]);
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


    (function() {

        var graphDiv = slide.querySelector('.graph');
        var graph = new Dygraph(graphDiv, pulseHistory, {
            labels: ['tid', 'pulse'],
            valueRange: [0, 180],
            legend: 'always',
            title: 'Pulse',
            showRoller: false,
            ylabel: 'BPM'
        });

        util.onSection('pulse-summary', function(slide) {
            var pulseHistory = [
                [1, 2],
                [2, 4],
                [3, 5],
                [4, 2],
                [5, 3],
                [6, 10]
            ];
        });

    })();


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
