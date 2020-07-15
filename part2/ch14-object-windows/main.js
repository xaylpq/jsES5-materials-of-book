/*
    ! Таймеры
*/

// setInterval(updateClock, 60000); // Вызывать updateClock() через каждые 60 сек.

/*
    * Планирует вызов или вызовы функции f() в будущем.
    * Ожидает перед первым вызовом start миллисекунд, затем вызывает f()
    * каждые interval миллисекунд и останавливается через start+end миллисекунд.
    * Если аргумент interval указан, а аргумент end нет, повторяющиеся вызовы функции f
    * никогда не прекратятся. Если отсутствуют оба аргумента, interval и end,
    * тогда функция f будет вызвана только один раз, через start миллисекунд.
    * Если указан только аргумент f, функция будет вызвана немедленно, как если бы
    * в аргументе start было передано число 0. Обратите внимание, что вызов invoke()
    * не блокируется: она сразу же возвращает управление.
*/
function invoke(f, start, interval, end) {
    if (!start) start = 0; // По умолчанию через 0 мс
    if (arguments.length <= 2) // Случай однократного вызова
        setTimeout(f, start); // Вызвать 1 раз через start мс.
    else { // Случай многократного вызова
        setTimeout(repeat, start); // Начать вызовы через start мс
        function repeat() { // Планируется на вызов выше
            var h = setInterval(f, interval); // Вызывать f через interval мс.
            // Прекратить вызовы через end мс, если значение end определено
            if (end) setTimeout(function() { clearInterval(h); }, end);
        }
    }
}

/*
    ! Адрес документа и навигация по нему
*/

/*
* Эта функция выделяет в URL-адресе разделенные амперсандами
* пары аргументов имя/значение из строки запроса. Сохраняет эти пары
* в свойствах объекта и возвращает этот объект. Порядок использования:
*
* var args = urlArgs(); // Извлечь аргументы из URL
* var q = args.q || ""; // Использовать аргумент, если определен, 
                        // или значение по умолчанию
* var n = args.n ? parseInt(args.n) : 10;
*/
function urlArgs() {
    var args = {}; // Создать пустой объект
    var query = location.search.substring(1); // Строка запроса без '?'
    var pairs = query.split("&"); // Разбить по амперсандам
    for(var i = 0; i < pairs.length; i++) { // Для каждого фрагмента
        var pos = pairs[i].indexOf('='); // Отыскать пару имя/значение
        if (pos == -1) continue; // Не найдено - пропустить
        var name = pairs[i].substring(0,pos); // Извлечь имя
        var value = pairs[i].substring(pos+1); // Извлечь значение
        value = decodeURIComponent(value); // Преобразовать значение
        args[name] = value; // Сохранить в виде свойства
    }
    return args; // Вернуть полученные аргументы
}

location.search = "?page=" + (pagenum+1); // загрузить следующую страницу

location = "#top"; // Перейти в начало документа

/*
    ! Информация о броузере и об экране
*/

// Определяет свойства browser.name и browser.version, позволяющие выяснить
// тип клиента. За основу взят программный код из библиотеки jQuery 1.4.1.
// Оба свойства, name и version, возвращают строки, и в обоих случаях
// значения могут отличаться от фактических названий броузеров и версий.
// Определяются следующие названия броузеров:
//
// "webkit": Safari или Chrome; version содержит номер сборки WebKit
// "opera": Opera; version содержит фактический номер версии броузера
// "mozilla": Firefox или другие броузеры, основанные на механизме gecko;
// version содержит номер версии Gecko
// "msie": IE; version содержит фактический номер версии броузера
//
// Например, для Firefox 3.6 возвращаются: {name: "mozilla", version: "1.9.2"}
var browser = (function() {
    var s = navigator.userAgent.toLowerCase();
    var match = /(webkit)[ \/]([\w.]+)/.exec(s) ||
    /(opera)(?:.*version)?[ \/]([\w.]+)/.exec(s) ||
    /(msie) ([\w.]+)/.exec(s) ||
    !/compatible/.test(s) && /(mozilla)(?:.*? rv:([\w.]+))?/.exec(s) ||
        [];
    return { name: match[1] || "", version: match[2] || "0" };
}());

/*
    ! Диалоги
*/

do {
    var name = prompt("Введите ваше имя"); // Вернет строку
    var correct = confirm("Вы ввели '" + name + "'.\n" + // Вернет логич. знач.
        "Щелкните ОК, чтобы продолжить, " + "или Отмена, чтобы повторить ввод.");
} while(!correct)
alert("Привет, " + name); // Выведет простое сообщение

// <!-- Это не самостоятельный HTML-файл. Он должен вызываться методом showModalDialog() и ожидает получить в свойстве window.dialogArguments массив строк. Первый элемент массива - строка, отображаемая в верхней части диалога. Все остальные элементы - метки для однострочных текстовых полей ввода. Возвращает массив значений полей ввода после щелчка на кнопке Okay. Этот файл используется следующим образом: var p = showModalDialog("multiprompt.html", ["Enter 3D point coordinates", "x", "y", "z"], "dialogwidth:400; dialogheight:300; resizable:yes");
// -->
// <form>
//     <fieldset id="fields"></fieldset> <!-- Тело, заполняемое сценарием ниже -->
//     <div style="text-align:center"> <!-- Кнопки закрытия диалога -->
//         <button onclick="okay()">Okay</button> <!-- Устанавливает возвращаемое -->
//         <!-- значение и закрывает диалог -->
//         <button onclick="cancel()">Cancel</button> <!-- Закрывает диалог, -->
//         <!-- не возвращая ничего -->
//     </div>
//     <script>
//         // Создает разметку HTML тела диалога и отображает ее в элементе fieldset
//         var args = dialogArguments;
//         var text = "<legend>" + args[0] + "</legend>";
//         for(var i = 1; i < args.length; i++)
//             text += "<label>" + args[i] + ": <input id='f" + i + "'></label><br>";
//         document.getElementById("fields").innerHTML = text;
//         // Закрывает диалог без установки возвращаемого значения
//         function cancel() { window.close(); }
//         // Читает значения полей ввода и устанавливает возвращаемое значение,
//         // затем закрывает диалог
//         function okay() {
//             window.returnValue = []; // Возвращаемый массив
//             for(var i = 1; i < args.length; i++) // Значения элементов из полей ввода
//                 window.returnValue[i-1] = document.getElementById("f" + i).value;
//             window.close(); // Закрыть диалог. Это заставит showModalDialog() вернуть управление.
//         }
//     </script>
// </form>

/*
    ! Обработка ошибок
*/

// Вывести сообщение об ошибке в виде диалога, но не более 3 раз
window.onerror = function(msg, url, line) {
    if (onerror.num++ < onerror.max) {
        alert("ОШИБКА: " + msg + "\n" + url + ":" + line);
        return true;
    }
}
onerror.max = 3;
onerror.num = 0;

// ! Элементы документа как свойства окна
var ui = ["input","prompt","heading"]; // Массив идентификаторов элементов
ui.forEach(function(id) { // Отыскать элемент для каждого id
    ui[id] = document.getElementById(id); // и сохранить его в свойстве
});

var $ = function(id) { return document.getElementById(id); };
ui.prompt = $("prompt");

/*
    ! Работа с несколькими окнами и фреймами
*/

// ! Открытие и закрытие окон
var w = window.open("smallwin.html", "smallwin", "width=400,height=350,status=yes,resizable=yes"); // открыть окно в браузере

var w = window.open(); // Открыть новое пустое окно
w.alert("Будет открыт сайт http://example.com"); // Вызвать его метод alert()
w.location = "http://example.com"; // Установить св-во location

w.opener !== null; // Верно для любого окна w, созданного методом open()
w.open().opener === w; // Верно для любого окна w

w.close();
window.close();

// ! Отношения между фреймами
