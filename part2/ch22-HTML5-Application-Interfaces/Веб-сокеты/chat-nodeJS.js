/*
    * Этот серверный сценарий на языке JavaScript предназначен для выполнения
    * под управлением NodeJS. Он играет роль сервера веб-сокетов, реализованного поверх
    * HTTP-сервера с использованием внешней библиотекиwebsocket, которую  можно найти
    * по адресу: https://github.com/miksago/node-websocket-server/. При обращении
    * к ресурсу "/" он возвращает HTML-файл клиента чата. В ответ на обращение к любому 
    * другому ресурсу возвращается код 404. Сообщения принимаются посредством протокола
    * веб-сокетов и просто рассылаются по всем активным соединениям.
*/
var http = require('http'); // Использовать HTTP-сервер в Node
var ws = require('websocket-server'); // Использовать внешнюю библиотеку
// Прочитать исходный файл с реализацией клиента чата. Используется ниже.
var clientui = require('fs').readFileSync("wschatclient.html");
// Создать HTTP-сервер 
var httpserver = new http.Server();
// Когда HTTP-сервер получит новый запрос, будет вызвана эта функция
httpserver.on("request", function (request, response) {
    // Если запрошен ресурс "/", отправить реализацию клиента чата.
    if (request.url === "/") { // Запрошена реализация клиента чата
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(clientui);
        response.end();
    }
    else { // В ответ на любой другой запрос отправить код 404 "Not Found"
        response.writeHead(404);
        response.end();
    }
});
// Обернуть HTTP-сервер сервером на основе веб-сокетов
var wsserver = ws.createServer({server: httpserver});
// Вызывать эту функцию при получении новых запросов на соединение
wsserver.on("connection", function(socket) {
    socket.send("Добро пожаловаь в чат."); // Приветствовать нового клиента 
    socket.on("message", function(msg) { // Принимать сообщения от клиента
        wsserver.broadcast(msg); // И рассылать их всем остальным
    });
});
// Запустить сервер на порту 8000. Запуск сервера на основе веб-сокетов
// приводит также к запуску HTTP-сервера. Для его использования подключайтесь
// по адресу http://localhost:8000/.
wsserver.listen(8000);
