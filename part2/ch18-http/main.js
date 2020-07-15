var request = new XMLHttpRequest(); // создать экземпляр объекта XMLHttpRequest

request.open("GET", // Запрос типа HTTP GET
    "data.csv"); // на получение содержимого по этому URL-адресу

request.setRequestHeader("Content-Type", "text/plain"); // установка заголовков запроса
request.send(null); // передача необязательного тела запроса и отправка его серверу

function postMessage(msg) {
    var request = new XMLHttpRequest(); // Новый запрос
    request.open("POST", "/log.php"); // серверному сценарию методом POST
    // Отправить простое текстовое сообщение в теле запроса
    request.setRequestHeader("Content-Type", // Тело запроса - простой текст
    "text/plain;charset=UTF-8");
    request.send(msg); // msg как тело запроса
    // Запрос выполнен. Мы игнорируем возможный ответ или ошибку.
}

// Выполняет запрос HTTP GET содержимого указанного URL-адреса. 
// После успешного получения ответа проверяет, содержит ли он простой текст,
// и передает его указанной функции обратного вызова
function getText(url, callback) {
    var request = new XMLHttpRequest(); // Создать новый запрос
    request.open("GET", url); // Указать URL-адрес ресурса
    request.onreadystatechange = function() { // Определить обработчик события
        // Если запрос был выполнен успешно
        if (request.readyState === 4 && request.status === 200) {
            var type = request.getResponseHeader("Content-Type");
            if (type.match(/^text/)) // Убедиться, что это текст
            callback(request.responseText); // Передать функции
        }
    };
    request.send(null); // Отправить запрос
}

// Выполняет синхронный запрос HTTP GET содержимого по указанному URL-адресу.
// Возвращает текст ответа. Возбуждает исключение в случае неудачи
// или если ответ не является текстом.
function getTextSync(url) {
    var request = new XMLHttpRequest(); // Создать новый запрос
    request.open("GET", url, false); // false - синхронный режим
    request.send(null); // Отправить запрос
    // Возбудить исключение, если код состояния не равен 200
    if (request.status !== 200) throw new Error(request.statusText);
    // Возбудить исключение, если ответ имеет недопустимый тип
    var type = request.getResponseHeader("Content-Type");
    if (!type.match(/^text/))
        throw new Error("Ожидался текстовый ответ; получен: " + type);
    return request.responseText;
}

// Выполняет запрос HTTP GET на получение содержимого по указанному URL-адресу.
// При получении ответа он передается функции обратного вызова
// как разобранный объект XML-документа, объект JSON или строка.
function get(url, callback) {
    var request = new XMLHttpRequest(); // Создать новый запрос
    request.open("GET", url); // Указать URL-адрес ресурса
    request.onreadystatechange = function() { // Определить обработчик события
        // Если запрос был выполнен и увенчался успехом
        if (request.readyState === 4 && request.status === 200) {
        // Определить тип ответа
        var type = request.getResponseHeader("Content-Type");
        // Проверить тип, чтобы избежать в будущем передачи ответа
        // в виде документа в формате HTML
        if (type.indexOf("xml") !== -1 && request.responseXML)
            callback(request.responseXML); // Объект XML
        else if (type === "application/json")
            callback(JSON.parse(request.responseText)); // Объект JSON
        else
            callback(request.responseText); // Строка
        }
    };
    request.send(null); // Отправить запрос
}

/*
    * Представляет свойства объекта, как если бы они были парами имя/значение
    * HTML-формы, с использованием формата application/x-www-form-urlencoded
*/
function encodeFormData(data) {
    if (!data) return ""; // Всегда возвращать строку
    var pairs = []; // Для пар имя/значение
    for(var name in data) { // Для каждого имени
        if (!data.hasOwnProperty(name)) continue; // Пропустить унаслед.
        if (typeof data[name] === "function") continue;// Пропустить методы
        var value = data[name].toString(); // Знач. в виде строки
        name = encodeURIComponent(name.replace("%20", "+")); // Кодировать имя
        value = encodeURIComponent(value.replace("%20", "+")); // Кодировать значение
        pairs.push(name + "=" + value); // Сохранить пару имя/значение
    }
    return pairs.join('&'); // Объединить пары знаком & и вернуть
}

// ! Выполнение запроса HTTP POST с данными в формате представления форм
function postData(url, data, callback) {
    var request = new XMLHttpRequest();
    request.open("POST", url); // Методом POST на указ. url
    request.onreadystatechange = function() { // Простой обработчик
        if (request.readyState === 4 && callback) // При получении ответа
            callback(request); // вызвать указанную функцию
    };
    request.setRequestHeader("Content-Type", // Установить "Content-Type" 
        "application/x-www-form-urlencoded");
    request.send(encodeFormData(data)); // Отправить данные
}

// ! Выполнение GET-запроса с данными в формате представления форм
function getData(url, data, callback) {
    var request = new XMLHttpRequest();
    request.open("GET", url + // Методом GET на указанный url
        "?" + encodeFormData(data)); // с добавлением данных
    request.onreadystatechange = function() { // Простой обработчик событий
        if (request.readyState === 4 && callback) callback(request);
    };
    request.send(null); // Отправить запрос
}

// ! Выполнение запроса HTTP POST с данными в формате JSON
function postJSON(url, data, callback) {
    var request = new XMLHttpRequest();
    request.open("POST", url); // Методом POST на указ. url
    request.onreadystatechange = function() { // Простой обработчик
        if (request.readyState === 4 && callback) // При получении ответа
        callback(request); // вызвать указанную функцию
    };
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(data));
}

// ! Выполнение запроса HTTP POST с XML-документом в качестве тела
// Параметры поиска "что", "где" и "радиус" оформляются в виде XML-документа
// и отправляются по указанному URL-адресу. При получении ответа вызывает
// указанную функцию
function postQuery(url, what, where, radius, callback) {
    var request = new XMLHttpRequest();
    request.open("POST", url); // Методом POST на указанный url
    request.onreadystatechange = function() { // Простой обработчик
        if (request.readyState === 4 && callback) callback(request);
    };
    // Создать XML-документ с корневым элементом <query>
    var doc = document.implementation.createDocument("", "query", null);
    var query = doc.documentElement; // Элемент <query>
    var find = doc.createElement("find"); // Создать элемент <find>
    query.appendChild(find); // И добавить в <query>
    find.setAttribute("zipcode", where); // Атрибуты <find>
    find.setAttribute("radius", radius);
    find.appendChild(doc.createTextNode(what)); // И содержимое <find>
    // Отправить данные в формате XML серверу.
    // Обратите внимание, что заголовок Content-Type будет установлен автоматически.
    request.send(doc);
}

// ! Выгрузка файла посредством запроса HTTP POST
// Отыскивает все элементы <input type="file"> с атрибутом data-uploadto
// и регистрирует обработчик onchange, который автоматически отправляет
// выбранный файл по указанному URL-адресу "uploadto". Ответ сервера игнорируется.
whenReady(function() { // Вызвать эту функцию после загрузки документа
    var elts = document.getElementsByTagName("input"); // Все элементы input
    for(var i = 0; i < elts.length; i++) { // Обойти в цикле
        var input = elts[i];
        if (input.type !== "file") continue; // Пропустить все, кроме
        // элементов выгрузки файлов
        var url = input.getAttribute("data-uploadto"); // Адрес выгрузки
        if (!url) continue; // Пропустить элементы без url
        input.addEventListener("change", function() { // При выборе файла
            var file = this.files[0]; // Предполагается выбор единственного файла
            if (!file) return; // Если файл не выбран, ничего не делать
            var xhr = new XMLHttpRequest(); // Создать новый запрос
            xhr.open("POST", url); // Методом POST на указанный URL
            xhr.send(file); // Отправить файл в теле запроса
        }, false);
    }
});

// ! Мониторинг хода выполнения операции выгрузки
// Отыскивает все элементы с классом "fileDropTarget" и регистрирует
// обработчики событий механизма DnD, чтобы они могли откликаться
// на операции буксировки файлов. При сбросе файлов на эти элементы
// они выгружают их на URL-адрес, указанный в атрибуте data-uploadto.
    whenReady(function() {
    var elts = document.getElementsByClassName("fileDropTarget");
    for(var i = 0; i < elts.length; i++) {
        var target = elts[i];
        var url = target.getAttribute("data-uploadto");
        if (!url) continue;
        createFileUploadDropTarget(target, url);
    }
    function createFileUploadDropTarget(target, url) {
        // Следит за ходом выполнения операции выгрузки и позволяет отвергнуть
        // выгрузку файла. Можно было бы обрабатывать сразу несколько параллельных
        // операций выгрузки, но это значительно усложнило бы
        // отображение хода их выполнения.
        var uploading = false;
        console.log(target, url);
        target.ondragenter = function(e) {
            console.log("dragenter");
            if (uploading) return; // Игнорировать попытку сброса, если
            // элемент уже занят выгрузкой файла
            var types = e.dataTransfer.types;
            if (types &&
            ((types.contains && types.contains("Files")) ||
            (types.indexOf && types.indexOf("Files") !== -1))) {
                target.classList.add("wantdrop");
                return false;
            }
        };
        target.ondragover = function(e) { if (!uploading) return false; };
        target.ondragleave = function(e) {
            if (!uploading) target.classList.remove("wantdrop");
        };
        target.ondrop = function(e) {
            if (uploading) return false;
            var files = e.dataTransfer.files;
            if (files && files.length) {
                uploading = true;
                var message = "Выгружаются файлы:<ul>";
                for(var i = 0; i < files.length; i++)
                    message += "<li>" + files[i].name + "</li>";
                message += "</ul>";
                target.innerHTML = message;
                target.classList.remove("wantdrop");
                target.classList.add("uploading");
                var xhr = new XMLHttpRequest();
                xhr.open("POST", url);
                var body = new FormData();
                for(var i=0; i < files.length; i++) body.append(i, files[i]);
                xhr.upload.onprogress = function(e) {
                    if (e.lengthComputable) {
                        target.innerHTML = message + Math.round(e.loaded/e.total*100) + "% Завершено";
                    }
                };
                xhr.upload.onload = function(e) {
                    uploading = false;
                    target.classList.remove("uploading");
                    target.innerHTML = "Отбуксируйте сюда файл для выгрузки";
                };
                xhr.send(body);
                return false;
            }
            target.classList.remove("wantdrop");
        }
    }
});

