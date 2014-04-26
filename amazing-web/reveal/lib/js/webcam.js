$(document).ready(function() {

    navigator.getMedia = ( navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia);

    var $videos= $('video.webcam');
    navigator.getMedia(
        {
            video: true,
            audio: false
        },
        function(stream) {
            $videos.each(function(index, video) {
                var $video = $(video);
                if (navigator.mozGetUserMedia) {
                    $video.attr('mozSrcObject', stream);
                } else {
                    var vendorURL = window.URL || window.webkitURL;
                    $video.attr('src', vendorURL.createObjectURL(stream));
                }
            });
        },
        function(err) {
            console.log("An error occured! " + err);
        }
    );

});