(function() {

    var serviceUrl = document.querySelector('#service-url');
    var socket = io.connect(serviceUrl.dataset.protocol + '://' + serviceUrl.textContent.trim() + ':' + serviceUrl.dataset.port);

    var voteMapping = {
        '1': 'red',
        '2': 'yellow',
        '3': 'green'
    };

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
        ticker.classList.add(voteMapping[data.vote]);

        var smileyHolder = document.createElement('span');
        smileyHolder.textContent = data.smiley;
        smileyHolder.classList.add('smiley');
        ticker.appendChild(smileyHolder);

        setTimeout(function() {
            ticker.classList.remove('red');
            ticker.classList.remove('yellow');
            ticker.classList.remove('green');
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
