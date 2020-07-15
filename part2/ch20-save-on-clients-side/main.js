// ! Объекты localStorage и sessionStorage

var name = localStorage.username; // Получить сохраненное значение.
name = localStorage["username"]; // Эквивалентная форма обращения, как к массиву
if (!name) {
    name = prompt("Как вас зовут?");
    // Задать пользователю вопрос.
    localStorage.username = name; // Сохранить ответ.
}
// Выполнить итерации по всем хранящимся парам имя/значение
for(var name in localStorage) { // Итерации по всем хранящимся именам
    var value = localStorage[name]; // Получить значение для каждого из них
}

// При сохранении числа оно автоматически преобразуется в строку.
// Не забудьте выполнить обратное преобразование при извлечении из хранилища.
localStorage.x = 10;
var x = parseInt(localStorage.x);
// Преобразовать объект Date в строку при записи и обратно – при чтении
localStorage.lastRead = (new Date()).toUTCString();
var lastRead = new Date(Date.parse(localStorage.lastRead));
// Для кодирования любых простых  или структурированных данных удобно использовать формат JSON
localStorage.data = JSON.stringify(data); // Закодировать и сохранить
var data = JSON.parse(localStorage.data); // Извлечь и декодировать.

localStorage.setItem("x", 1); // Сохранить число под именем "x"
localStorage.getItem("x"); // Извлечь значение
// Перечислить все хранящиеся пары имя-значение
for(var i = 0; i < localStorage.length; i++) { // length дает количество пар
    var name = localStorage.key(i); // Получить имя i-й пары
    var value = localStorage.getItem(name); // Получить значение этой пары
}
localStorage.removeItem("x"); // Удалить элемент "x"
localStorage.clear(); // Удалить все остальные элементы

localStorage.o = {x:1}; // Сохранить объект, имеющий свойство x 
localStorage.o.x = 2; // Попытка установить свойство хранящегося объекта 
localStorage.o.x // => 1: свойство x не изменилось

// ! cookie
document.cookie = "version=" + encodeURIComponent(document.lastModified);

// Сохраняет пару имя/значение в виде cookie, кодируя значение с помощью 
// encodeURIComponent(), чтобы экранировать точки с запятой, запятые и пробелы.
// Если в параметре daysToLive передается число, атрибут max-age 
// устанавливается так, что срок хранения cookie истекает через 
// указанное число дней. Если передать значение 0, cookie будет удален.
function setCookie(name, value, daysToLive) {
    var cookie = name + "=" + encodeURIComponent(value);
    if (typeof daysToLive === "number")
        cookie += "; max-age=" + (daysToLive*60*60*24);
    document.cookie = cookie;
}

// Возвращает cookies документа в виде объекта с парами имя/значение. 
// Предполагается, что значения cookie кодируются с помощью
// функции encodeURIComponent(). 
function getCookies() {
    var cookies = {}; // Возвращаемый объект
    var all = document.cookie; // Получить все cookies в одной строке
    if (all === "") // Если получена пустая строка,
    return cookies; // вернуть пустой объект
    var list = all.split("; "); // Разбить на пары имя/значение
    for(var i = 0; i < list.length; i++) { // Для каждого cookie
        var cookie = list[i];
        var p = cookie.indexOf("="); // Отыскать первый знак =
        var name = cookie.substring(0,p); // Получить имя cookie
        var value = cookie.substring(p+1); // Получить значение cookie
        value = decodeURIComponent(value); // Декодировать значение 
        cookies[name] = value; // Сохранить имя и значение в объекте
    }
    return cookies;
}

// ! Реализация интерфейса объекта Storage на основе cookies
/*
    * CookieStorage.js
    * Этот класс реализует прикладной интерфейс объекта Storage, на который ссылаются
    * свойства localStorage и sessionStorage, но поверх HTTP Cookies.
*/
function CookieStorage(maxage, path) { // Аргументы определяют срок хранения и область видимости
    // Получить объект, хранящий все cookies
    var cookies = (function() { // Функция getCookies(), реализованная выше 
        var cookies = {}; // Возвращаемый объект
        var all = document.cookie; // Получить все cookies в одной строке
        if (all === "") // Если получена пустая строка
            return cookies; // вернуть пустой объект
        var list = all.split("; "); // Разбить на пары имя/значение
        for(var i = 0; i < list.length; i++) { // Для каждого cookie
            var cookie = list[i];
            var p = cookie.indexOf("="); // Отыскать первый знак =
            var name = cookie.substring(0,p); // Получить имя cookie
            var value = cookie.substring(p+1); // Получить значение cookie
            value = decodeURIComponent(value); // Декодировать значение 
            cookies[name] = value; // Сохранить имя и значение
        }
        return cookies;
    }());
    // Собрать имена cookies в массиве
    var keys = [];
    for(var key in cookies) keys.push(key);
    // Определить общедоступные свойства и методы Storage API
    // Количество хранящихся cookies
    this.length = keys.length;
    // Возвращает имя n-го cookie или null, если n вышло за диапазон индексов
    this.key = function(n) {
        if (n < 0 || n >= keys.length) return null;
        return keys[n];
    };
    // Возвращает значение указанного cookie или null.
    this.getItem = function(name) { return cookies[name] || null; };
    // Сохраняет значение
    this.setItem = function(key, value) {
        if (!(key in cookies)) { // Если cookie с таким именем не существует
            keys.push(key); // Добавить ключ в массив ключей
            this.length++; // И увеличить значение length
        }
        // Сохранить пару имя/значение в множестве cookies. 
        cookies[key] = value;
        // Установить cookie.
        // Предварительно декодировать значение и создать строку
        // имя=кодированное-значение
        var cookie = key + "=" + encodeURIComponent(value);
        // Добавить в строку атрибуты cookie
        if (maxage) cookie += "; max-age=" + maxage;
        if (path) cookie += "; path=" + path;
        // Установить cookie с помощью свойства
        document.cookie
        document.cookie = cookie;
    };
    // Удаляет указанный cookie
    this.removeItem = function(key) {
        if (!(key in cookies)) return; // Если не существует, ничего не делать
        // Удалить cookie из внутреннего множества cookies
        delete cookies[key];
        // И удалить ключ из массива имен. 
        // Это легко можно было бы сделать с помощью метода indexOf() массивов,
        // определяемого стандартом ES5.
        for(var i = 0; i < keys.length; i++) { // Цикл по всем ключам
            if (keys[i] === key) { // При обнаружении ключа
                keys.splice(i,1); // Удалить его из массива.
                break;
            }
        }
        this.length--; // Уменьшить значение length
        // Наконец фактически удалить cookie, присвоив ему пустое значение
        // и истекший срок хранения.
        document.cookie = key + "=; max-age=0";
    };
    // Удаляет все cookies 
    this.clear = function() {
        // Обойти все ключи и удалить cookies
        for(var i = 0; i < keys.length; i++)
        document.cookie = keys[i] + "=; max-age=0";
        // Установить внутренние переменные в начальное состояние
        cookies = {};
        keys = [];
        this.length = 0;
    };
}

// ! Хранилище приложений и автономные веб-приложения

// Эту функцию используют все обработчики событий, реализованные ниже, и выводят 
// с ее помощью сообщения, информирующие о состоянии кэша приложений. 
// Поскольку все обработчики отображают сообщения таким способом, они
// возвращают false, чтобы отменить дальнейшее распространение события
// и предотвратить вывод сообщений самим броузером.
function status(msg) {
    // Вывести сообщение в элементе документа с id="statusline"
    document.getElementById("statusline").innerHTML = msg;
    console.log(msg); // А также в консоли для отладки
}
// Каждый раз, когда приложение загружается, броузер проверяет файл объявления. 
// В начале этого процесса первым всегда генерируется событие "checking". 
window.applicationCache.onchecking = function() {
    status("Проверка наличия новой версии.");
    return false;
};
// Если файл объявления не изменился и приложение уже имеется в кэше, 
// генерируется событие "noupdate" и процедура проверки заканчивается.
window.applicationCache.onnoupdate = function() {
    status("Версия приложения не изменилась.") 
    return false;
};
// Если приложение отсутствует в кэше или если изменился файл объявления,
// броузер загрузит и поместит в кэш все, что перечислено в файле объявления.
// Событие "downloading" свидетельствует о начале этой процедуры загрузки.
window.applicationCache.ondownloading = function() {
    status("Загружается новая версия"); 
    window.progresscount = 0; // Используется в обработчике "progress" ниже 
    return false;
};
// В ходе загрузки периодически генерируются события "progress",
// обычно после загрузки каждого файла.
window.applicationCache.onprogress = function(e) {
    // Объект события должен соответствовать событию "progress" (подобному тому,
    // что используется XHR2), что позволяет вычислять процент выполнения,
    // но на всякий случай мы заведем счетчик количества вызовов.
    var progress = "";
    if (e && e.lengthComputable) // Событие "progress": вычислить процент
    progress = " " + Math.round(100*e.loaded/e.total) + "%"
    else // Иначе сообщить кол-во вызовов
    progress = " (" + ++progresscount + ")"
    status("Загружается новая версия" + progress);
    return false;
};
// Когда приложение впервые загружается в кэш, по окончании загрузки
// броузер сгенерирует событие "cached".
window.applicationCache.oncached = function() {
    status("Приложение загружено и установлено локально");
    return false;
};
// Когда обновляется приложение, находящееся в кэше, то по завершении загрузки
// броузер сгенерирует событие "updateready". Обратите внимание, что при этом
// пользователь по-прежнему будет работать со старой версией приложения.
window.applicationCache.onupdateready = function() {
    status("Была загружена новая версия приложения. Перезапустите его.");
    return false;
};
// Если броузер выполняется в автономном режиме и файл объявления не может
// быть проверен, генерируется событие "error". Это же событие генерируется,
// когда некэшированное приложение ссылается на отсутствующий файл объявления. 
window.applicationCache.onerror = function() {
    status("Невозможно загрузить файл объявления " + "или сохранить приложение в кэш"); 
    return false;
};
// Если кэшированное приложение  ссылается на несуществующий файл объявления,
// генерируется событие "obsolete" и приложение удаляется из кэша.
// В следующий раз приложение будет целиком  агружаться из сети, а не из кэша.
window.applicationCache.onobsolete = function() {
    status("Это приложение больше не кэшируется.  " + "Перезапустите его, чтобы получить последнюю версию из сети.");
    return false;
};

