// ! Получение информации о ссылках  с помощью HEAD-запросов при наличии поддержки заголовка «CORS»
/*
* Этот модуль в стиле ненавязчивого JavaScript отыскивает  все элементы <a>
* с атрибутом href и без атрибута title, и добавляет в них обработчики 
* события onmouseover. Обработчик  события выполняет HEAD-запрос с помощью
* объекта XMLHttpRequest, чтобы получить сведения о ресурсе, на который
* указывает ссылка, и сохраняет эту информацию в атрибуте title ссылки,
* благодаря чему эта информация будет  отображаться во всплывающей подсказке.
*/
whenReady(function() {
    // Поддерживается ли возможность выполнения междоменных запросов?
    var supportsCORS = (new XMLHttpRequest()).withCredentials !== undefined;
    // Обойти в цикле  все ссылкив документе
    var links = document.getElementsByTagName('a');
    for(var i = 0; i < links.length; i++) {
        var link = links[i];
        if (!link.href) continue; // Пропустить якоря, не являющиеся ссылками
        if (link.title) continue; // Пропустить ссылки  с атрибутомtitle
        // Если это междоменная ссылка
        if (link.host!==location.host || link.protocol !== location.protocol) {
            link.title = "Ссылка на другой сайт"; // Предполагается, что нельзя получить дополнительную информацию
            if (!supportsCORS) continue; // Пропустить, если заголовок CORS не поддерживается 
            // Иначе есть надежда  получить больше сведений о ссылке. Поэтому регистрируем
            // обработчик  события, который предпримет попытку сделать это.
        }
        // Зарегистрировать обработчик  события,который получит  сведения
        // о ссылке при наведении на нее указателя мыши
        if (link.addEventListener)
        link.addEventListener("mouseover", mouseoverHandler, false);
        else
        link.attachEvent("onmouseover", mouseoverHandler);
    }
    function mouseoverHandler(e) {
        var link = e.target || e.srcElement; // Элемент <a>
        var url = link.href; // URL-адрес ссылки
        var req = new XMLHttpRequest(); // Новый запрос 
        req.open("HEAD", url); // Запросить только заголовки
        req.onreadystatechange = function() { // Обработчик события
            if (req.readyState !== 4) return; // Игнорировать незаверш. запросы
            if (req.status === 200) { // В случае успеха
                var type = req.getResponseHeader("Content-Type"); //Получить
                var size = req.getResponseHeader("Content-Length"); //сведения
                var date = req.getResponseHeader("Last-Modified"); //о ссылке
                // Отобразить сведения во всплывающей подсказке.
                link.title = "Тип: " + type + " \n" + "Размер: " + size + " \n" + "Дата: " + date;
            }
            else {// Если запрос не удался и подсказка для ссылки еще не содержит текст
                // "Ссылка на другой сайт", вывести сообщение об ошибке. 
                if (!link.title) link.title = "Невозможно получить сведения: \n" + req.status + " " + req.statusText;
            }
        };
        req.send(null);
        // Удалить обработчик: попытка получить сведения выполняется только один раз.
        if (link.removeEventListener)
            link.removeEventListener("mouseover", mouseoverHandler, false);
        else
            link.detachEvent("onmouseover", mouseoverHandler);
    }
});

