/*
    * InputFilter.js: фильтрация ввода для элементов <input>
    *
    * Этот модуль отыскивает все элементы <input type="text"> в документе, имеющие
    * атрибут "data-allowed-chars". Регистрирует обработчики событий keypress, textInput
    * и textinput для этих элементов, чтобы ограничить набор допустимых для ввода символов,
    * чтобы разрешить вводить только символы, указанные в атрибуте. Если элемент <input>
    * также имеет атрибут "data-messageid", значение этого атрибута интерпретируется как id
    * другого элемента документа. Если пользователь вводит недопустимый символ, элемент
    * с указанным id делается видимым. Если пользователь вводит допустимый символ, элемент
    * с сообщением скрывается. Данный элемент с сообщением предназначается для вывода
    * пояснений, почему ввод пользователя был отвергнут. Его оформление  необходимо
    * реализовать с помощью CSS так, чтобы изначально он был невидим.
    *
    * Ниже приводится образец разметки HTML, использующей этот модуль.
    * Zipcode: <input id="zip" type="text"
    * data-allowed-chars="0123456789" data-messageid="zipwarn">
    * < id="zipwarn" style="color:red;visibility:hidden">Только цифры</ span>
    *
    * Этот модуль полностью реализован в ненавязчивом стиле: он не определяет
    * никаких переменных в глобальном пространстве имен.
*/
whenReady(function () { // Вызовет эту функцию, когда документ будет загружен
    // Отыскать все элементы <input>
    var inputelts = document.getElementsByTagName("input");
    // Обойти их в цикле
    for(var i = 0 ; i < inputelts.length; i++) {
        var elt = inputelts[i];
        // Пропустить элементы, не являющиеся текстовыми полями ввода
        // и не имеющие атрибута data-allowed-chars.
        if (elt.type != "text" || !elt.getAttribute("data-allowed-chars"))
        continue;
        // Зарегистрировать наш обработчик события в этом элементе input
        // keypress - старое событие и реализовано во всех броузерах.
        // textInput (смешанный регистр символов) поддерживается в Safari и Chrome с 2010 года.
        // textinput (все символы строчные) - версия проекта стандарта "DOM Level 3 Events".
        if (elt.addEventListener) {
            elt.addEventListener("keypress", filter, false);
            elt.addEventListener("textInput", filter, false);
            elt.addEventListener("textinput", filter, false);
        }
        // textinput не поддерживается версиями IE, в которых не реализован метод addEventListener()
        else {
            elt.attachEvent("onkeypress", filter);
        }
    }
    // Обработчик событий keypress и textInput, фильтрующий ввод пользователя
    function filter(event) {
        // Получить объект события и целевой элемент target
        var e = event || window.event; // Модель стандартная или IE
        var target = e.target || e.srcElement; // Модель стандартная или IE
        var text = null; // Введенный текст
        // Получить введенный символ или текст
        if (e.type === "textinput" || e.type === "textInput") text = e.data;
        else { // Это было событие keypress
            // Введенный печатаемый символ в Firefox сохраняется в свойстве charCode
            var code = e.charCode || e.keyCode;
            // Если была нажата какая-либо функциональная клавиша, не фильтровать ее
            if (code < 32 || // Управляющий символ ASCII
            e.charCode == 0 || // Функциональная клавиша (в Firefox)
            e.ctrlKey || e.altKey) // Удерживаемая клавиша-модификатор
            return; // Не фильтровать это событие
            // Преобразовать код символа в строку
            var text = String.fromCharCode(code);
        }
        // Отыскать необходимую нам информацию в этом элементе input
        var allowed = target.getAttribute("data-allowed-chars"); // Допустимые символы
        var messageid = target.getAttribute("data-messageid"); // Сообщение id
        if (messageid) // Если указано значение id, получить элемент
        var messageElement = document.getElementById(messageid);
        // Обойти в цикле символы во введенном тексте
        for(var i = 0; i < text.length; i++) {
            var c = text.charAt(i);
            if (allowed.indexOf(c) == -1) { // Недопустимый символ?
                // Отобразить элемент с сообщением, если указан
                if (messageElement) messageElement.style.visibility="visible";
                // Отменить действия по умолчанию, чтобы предотвратить вставку текста
                if (e.preventDefault) e.preventDefault();
                if (e.returnValue) e.returnValue = false;
                return false;
            }
        }
        // Если все символы оказались допустимыми, скрыть элемент
        // с сообщением, если он был указан.
        if (messageElement) messageElement.style.visibility = "hidden";
    }
});