// Этот сценарий JS вставляет Twitter Search Gadget в документ и добавляет обработчик
// событий ко всем ссылкам в документе, чтобы при наведении указателя мыши на них
// с помощью модуля поиска отыскать упоминания URL-адресов в ссылках.
// Это позволяет узнать, что говорят другие о сайтах, прежде чем щелкнуть на ссылке.
window.addEventListener("load", function() { // Не работает в IE < 9
    var origin = "http://davidflanagan.com"; // Происхождение модуля 
    var gadget = "/demos/TwitterSearch.html"; // Путь к модулю
    var iframe = document.createElement("iframe"); // Создать iframe
    iframe.src = origin + gadget; // Установить его URL
    iframe.width = "250"; // Ширина 250 пикселов
    iframe.height = "100%"; // Во всю высоту документа
    iframe.style.cssFloat = "right"; // Разместить справа
    // Вставить фрейм в начало документа
    document.body.insertBefore(iframe, document.body.firstChild);
    // Отыскать все ссылки и связать их с модулем
    var links = document.getElementsByTagName("a");
    for(var i = 0; i < links.length; i++) {
        // addEventListener не работает в версии IE8 и ниже
        links[i].addEventListener("mouseover", function() {
            // Отправить url как искомую фразу и доставлять его, только если
            // фрейм все еще отображает документ с сайта davidflanagan.com
            iframe.contentWindow.postMessage(this.href, origin);
        }, false);
    }
}, false);
