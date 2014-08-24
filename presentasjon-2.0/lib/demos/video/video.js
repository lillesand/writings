(function () {
    window.video = {
        initCamera: initCamera
    };

    var cameraInit = false;
    function initCamera(opts) {
        if (cameraInit) return;
        cameraInit = true;
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        window.URL = window.URL || window.webkitURL;

        var videos = document.querySelectorAll('.webcam');
        navigator.getUserMedia({video: true}, gotStream, noStream);

        function gotStream(stream) {
            for (var i = 0; i < videos.length; ++i) {
                var video = videos[i];
                if (window.URL) {
                    video.src = window.URL.createObjectURL(stream);
                }

                video.onerror = function (e) {
                    stream.stop();
                };
            }

            stream.onended = noStream;
            opts.success();
        }

        function noStream(e) {
            console.error("No stream", e);
        }
    }

})();