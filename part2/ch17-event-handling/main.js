// Присвоить функцию свойству onload объекта Window.
// Функция - обработчик события: она вызывается, когда документ будет загружен.
window.onload = function() {
    // Отыскать элемент <form>
    var elt = document.getElementById("shipping_address");
    // Зарегистрировать обработчик события, который будет вызываться
    // непосредственно перед отправкой формы.
    elt.onsubmit = function() { return validate(this); }
}

// function(event) {
//     with(document) {
//         with(this.form || {}) {
//             with(this) {
//             /* ваш программный код */
//             }
//         }
//     }
// }

var b = document.getElementById("mybutton");
b.onclick = function() { alert("Спасибо, что щелкнули на мне!"); };
b.addEventListener("click", function() { alert("Еще раз спасибо!"); }, false);

/*
    * Передайте функции whenReady() свою функцию, и она вызовет ее (как метод
    * объекта документа), как только завершится синтаксический анализ документа
    * и он будет готов к выполнению операций. Зарегистрированные функции
    * вызываются при первом же событии DOMContentLoaded, readystatechange или load.
    * Как только документ станет готов и будут вызваны все функции,
    * whenReady() немедленно вызовет все функции, которые были ей переданы.
*/
var whenReady = (function() { // Эта функция возвращается функцией whenReady()
    var funcs = []; // Функции, которые должны вызываться по событию
    var ready = false; // Получит значение true при вызове функции handler
    // Обработчик событий, который вызывается, как только документ
    // будет готов к выполнению операций
    function handler(e) {
        // Если обработчик уже вызывался, просто вернуть управление
        if (ready) return;
        // Если это событие readystatechange и состояние получило значение,
        // отличное от "complete", значит, документ пока не готов
        if (e.type==="readystatechange" && document.readyState !== "complete") return;
        // Вызвать все зарегистрированные функции.
        // Обратите внимание, что здесь каждый раз проверяется значение
        // свойства funcs.length, на случай если одна из вызванных функций
        // зарегистрирует дополнительные функции.
        for(var i = 0; i < funcs.length; i++)
        funcs[i].call(document);
        // Теперь можно установить флаг ready в значение true и забыть
        // о зарегистрированных функциях
        ready = true;
        funcs = null;
    }
    // Зарегистрировать обработчик handler для всех ожидаемых событий
    if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", handler, false);
        document.addEventListener("readystatechange", handler, false);
        window.addEventListener("load", handler, false);
    }
    else if (document.attachEvent) {
        document.attachEvent("onreadystatechange", handler);
        window.attachEvent("onload", handler);
    }
    // Вернуть функцию whenReady
    return function whenReady(f) {
        if (ready) f.call(document); // Вызвать функцию, если документ готов
        else funcs.push(f); // Иначе добавить ее в очередь,
    } // чтобы вызвать позже.
}());

/*
    * Drag.js: буксировка абсолютно позиционированных HTML-элементов.
    *
    * Этот модуль определяет единственную функцию drag(), которая должна вызываться
    * из обработчика события onmousedown. Последующие события mousemove будут вызывать
    * перемещение указанного элемента. Событие mouseup будет завершать буксировку.
    * Эта реализация действует в обеих моделях событий, стандартной и IE.
    * Использует функцию getScrollOffsets(), представленную выше в книге.
    *
    * Аргументы:
    *
    * elementToDrag: элемент, принявший событие mousedown или содержащий его элемент.
    * Этот элемент должен иметь абсолютное позиционирование. Значения его свойств style.left
    * и style.top будут изменяться при перемещении указателя мыши пользователем.
    *
    * event: объект Event, полученный обработчиком события mousedown.
*/
function drag(elementToDrag, event) {
    // Преобразовать начальные координаты указателя мыши в координаты документа
    var scroll = getScrollOffsets(); // Вспомогательная функция, объявленная где-то в другом месте
    var startX = event.clientX + scroll.x;
    var startY = event.clientY + scroll.y;
    // Первоначальные координаты (относительно начала документа) элемента, который
    // будет перемещаться. Так как elementToDrag имеет абсолютное позиционирование,
    // предполагается, что его свойство offsetParent ссылается на тело документа.
    var origX = elementToDrag.offsetLeft;
    var origY = elementToDrag.offsetTop;
    // Найти расстояние между точкой события mousedown и верхним левым углом элемента.
    // Это расстояние будет учитываться при перемещении указателя мыши.
    var deltaX = startX - origX;
    var deltaY = startY - origY;
    // Зарегистрировать обработчики событий mousemove и mouseup,
    // которые последуют за событием mousedown.
    if (document.addEventListener) { // Стандартная модель событий
        // Зарегистрировать перехватывающие обработчики в документе
        document.addEventListener("mousemove", moveHandler, true);
        document.addEventListener("mouseup", upHandler, true);
    }
    else if (document.attachEvent) { // Модель событий IE для IE5-8  В модели событий 
        // IE перехват событий осуществляется вызовом метода setCapture() элемента.
        elementToDrag.setCapture();
        elementToDrag.attachEvent("onmousemove", moveHandler);
        elementToDrag.attachEvent("onmouseup", upHandler);
        // Интерпретировать потерю перехвата событий мыши как событие mouseup
        elementToDrag.attachEvent("onlosecapture", upHandler);
    }
    // Это событие обработано и не должно передаваться другим обработчикам
    if (event.stopPropagation) event.stopPropagation(); // Стандартная модель
    else event.cancelBubble = true; // IE
    // Предотвратить выполнение действий, предусмотренных по умолчанию.
    if (event.preventDefault) event.preventDefault(); // Стандартная модель
    else event.returnValue = false; // IE
    /*
        * Этот обработчик перехватывает события mousemove, возникающие
        * в процессе буксировки элемента. Он отвечает за перемещение элемента.
    */
    function moveHandler(e) {
        if (!e) e = window.event; // Модель событий IE
        // Переместить элемент в позицию указателя мыши с учетом позиций
        // полос прокрутки и смещений относительно начального щелчка.
        var scroll = getScrollOffsets();
        elementToDrag.style.left = (e.clientX + scroll.x - deltaX) + "px";
        elementToDrag.style.top = (e.clientY + scroll.y - deltaY) + "px";
        // И прервать дальнейшее распространение события.
        if (e.stopPropagation) e.stopPropagation(); // Стандартная модель
        else e.cancelBubble = true; // IE
    }
    /*
        * Этот обработчик перехватывает заключительное событие mouseup,
        * которое завершает операцию буксировки.
    */
    function upHandler(e) {
        if (!e) e = window.event; // Модель событий IE
        // Удалить перехватывающие обработчики событий.
        if (document.removeEventListener) { // Модель событий DOM
            document.removeEventListener("mouseup", upHandler, true);
            document.removeEventListener("mousemove", moveHandler, true);
        }
        else if (document.detachEvent) { // Модель событий IE 5+
            elementToDrag.detachEvent("onlosecapture", upHandler);
            elementToDrag.detachEvent("onmouseup", upHandler);
            elementToDrag.detachEvent("onmousemove", moveHandler);
            elementToDrag.releaseCapture();
        }
        // И прервать дальнейшее распространение события.
        if (e.stopPropagation) e.stopPropagation(); // Стандартная модель
        else e.cancelBubble = true; // IE
    }
}



