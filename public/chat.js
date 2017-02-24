window.onload = function() {

    var messages = [];
    var socket = io.connect('http://localhost:3700');
    var message = document.getElementById("message");
    var sendButton = document.getElementById("send");
    var chatContent = document.getElementById("chat");
    var name = document.getElementById("name");

    socket.on('message', function (data) {
        if(data.message) {
            messages.push(data);
            var html = '';
            for(var i=0; i<messages.length; i++) {
                html += '<li><span>' + (messages[i].username ? messages[i].username : 'Server') + ':</span><p>' + messages[i].message + '</p></li>';
            }
            chatContent.innerHTML = html;
        } else {
            console.log("There is a problem:", data);
        }
    });

    sendButton.onclick = function() {
        if(name.value == "") {
            alert("Please type your name!");
        } else {
            var text = message.value;
            socket.emit('send', { message: text, username: name.value });
        }
    };

}