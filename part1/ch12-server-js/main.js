// Вывести приветствие через одну секунду.
setTimeout(function() { console.log("Привет, Мир!"); }, 1000);

// ! Простой NodeJS HTTP-сервер, обслуживающий файлы в текущем каталоге
// и реализующий два специальных адреса URL для нужд тестирования.
// Подключение к серверу выполняется по адресу http://localhost:8000
// или http://127.0.0.1:8000
// Сначала необходимо загрузить используемые модули
var http = require('http'); // API HTTP-сервера
var fs = require('fs'); // Для работы с локальными файлами
var server = new http.Server(); // Создать новый HTTP-сервер
server.listen(8000); // Прослушивать порт 8000.
// Для регистрации обработчиков событий в Node используется метод "on()".
// Когда сервер получает новый запрос, для его обработки вызывается функция.
server.on("request", function (request, response) {
    // Выполнить разбор адреса URL
    var url = require('url').parse(request.url);
    // Специальный адрес URL, который вынуждает сервер выполнить задержку перед ответом.
    // Это может быть полезно для имитации работы с медленным сетевым подключением.
    if (url.pathname === "/test/delay") {
        // Величина задержки определяется из строки запроса
        // или устанавливается равной 2000 миллисекунд
        var delay = parseInt(url.query) || 2000;
        // Установить код состояния и заголовки ответа
        response.writeHead(200,{"Content-Type": "text/plain; charset=UTF-8"});
        // Начать отправку ответа немедленно
        response.write("Задержка на " + delay + " миллисекунд...");
        // А затем завершить другой функцией, которая будет вызвана позже.
        setTimeout(function() {
            response.write("готово.");
            response.end();
        }, delay);
    }
    // Если запрошен адрес "/test/mirror", отправить запрос обратно целиком.
    // Удобно, когда необходимо увидеть тело и заголовки запроса.
    else if (url.pathname === "/test/mirror") {
        // Код состояния и заголовки ответа
        response.writeHead(200,{"Content-Type": "text/plain; charset=UTF-8"});
        // Вставить в ответ тело запроса
        response.write(request.method + " " + request.url + " HTTP/" + request.httpVersion + "\r\n");
        // И заголовки запроса
        for(var h in request.headers) {
            response.write(h + ": " + request.headers[h] + "\r\n");
        }
        response.write("\r\n"); // За заголовками следует дополнительная пустая строка
        // Завершение отправки ответа выполняется следующими функциями-обработчиками:
        // Если в chunk передается тело запроса, вставить его в ответ.
        request.on("data", function(chunk) { response.write(chunk); });
        // Когда достигнут конец запроса, ответ также завершается.
        request.on("end", function(chunk) { response.end(); });
    }
    // Иначе обслужить файл из локального каталога.
    else {
        // Получить имя локального файла и определить тип его содержимого по расширению.
        var filename = url.pathname.substring(1); // удалить начальный /
        var type;
        switch(filename.substring(filename.lastIndexOf(".")+1)) { // расшир.
            case "html":
            case "htm": type = "text/html; charset=UTF-8"; break;
            case "js": type = "application/JavaScript; charset=UTF-8"; break;
            case "css": type = "text/css; charset=UTF-8"; break;
            case "txt" : type = "text/plain; charset=UTF-8"; break;
            case "manifest": type = "text/cache-manifest; charset=UTF-8"; break;
            default: type = "application/octet-stream"; break;
        }
        // Прочитать файл в асинхронном режиме и передать его содержимое единым блоком
        // в функцию обратного вызова. Для очень больших файлов лучше было бы
        // использовать API потоков ввода/вывода с функцией fs.createReadStream().
        fs.readFile(filename, function(err, content) {
            if (err) { // Если по каким-то причинам невозможно прочитать файл
                response.writeHead(404, { // Отправить 404 Not Found 
                    "Content-Type": "text/plain; charset=UTF-8"});
                response.write(err.message); // Тело сообщения об ошибке
                response.end(); // Завершить отправку
            }
            else { // Иначе, если файл успешно прочитан.
                response.writeHead(200, // Установить код состояния и тип MIME
                {"Content-Type": type});
                response.write(content); // Отправить содержимое файла
                response.end(); // И завершить отправку
            }
        });
    }
});
