(function() {

    window.util = {
        maxInterval: maxInterval,
        section: section,
        onSection: onSection
    };

    var lastEvent = _now();
    var interval = 1000;
    function maxInterval(func) {
        return function() {
            if ((_now() - lastEvent) < interval) {
                // Ignore
                return;
            }

            lastEvent = _now();
            return func();
        }

    }

    function section(name, func) {
        Reveal.addEventListener('slidechanged', function(e) {
            if (e.currentSlide.dataset.state === name || e.currentSlide.parentElement.dataset.state === name) {
                func(e.currentSlide);
            }
            else {
                func(false);
            }
        });
    }

    function onSection(name, func) {
        Reveal.addEventListener('slidechanged', function(e) {
            if (e.currentSlide.dataset.state === name) {
                func(e.currentSlide);
            }
        });
    }

    function _now() {
        return new Date().getTime();
    }

})();