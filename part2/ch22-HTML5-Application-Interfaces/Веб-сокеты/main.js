var socket = new WebSocket("ws://ws.example.com:1234/resource");
socket.onopen = function(e) { /* Соединение установлено. */ };
socket.onclose = function(e) { /* Соединение закрыто. */ };
socket.onerror = function(e) { /* Что-то пошло не так! */ };
socket.onmessage = function(e) {
    var message = e.data; /* Сервер послал сообщение. */
};

socket.send("Привет, сервер!");
