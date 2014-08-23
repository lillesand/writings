(function() {

    var host = document.querySelector('#service-url').textContent;
    var socket = io.connect(host + ':80');

    socket.on('message', function (data) {
        var messageElement = document.createElement('li');
        messageElement.textContent = data.message;

        var ul = document.querySelector('#feedback ul');
        ul.appendChild(messageElement);
    });

    socket.emit('consume');

    var ticker = document.querySelector('#feedback-ticker');
    socket.on('consumed', function(data) {
        ticker.textContent = data.message;

        setTimeout(function() {
            socket.emit('consume');
        }, 6000);
    });

    socket.on('consumed-empty', function() {
        ticker.textContent = '';

        setTimeout(function() {
            socket.emit('consume');
        }, 500);
    });

})();
