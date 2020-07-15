/*
* rollover.js: Ненавязчивая реализация эффекта смены изображений.
*
* Для создания эффекта смены изображений подключите  этот модуль к своему HTML-файлу
* и используйте атрибут data-rollover в элементах  <img>, чтобы определить URL-адрес
* сменного изображения.  Например:
*
* <img src="normal_image.png" data-rollover="rollover_image.png">
*
* Обратите внимание, что для работы  этого модуля необходимо подключить onLoad.js
*/
onLoad(function() { // Все в одной анонимной функции: не определяет имен
    // Цикл по всем изображениям, отыскивает атрибут data-rollover
    for(var i = 0; i < document.images.length; i++) {
        var img = document.images[i];
        var rollover = img.getAttribute("data-rollover");
        if (!rollover) continue; // Пропустить изображения без data-rollover
        // Обеспечить загрузку сменного изображения в кэш
        (new Image()).src = rollover;
        // Определить атрибут для сохранения URL-адреса 
        // изображения по умолчанию 
        img.setAttribute("data-rollout", img.src);
        // Зарегистрировать обработчики событий, 
        // создающие эффект смены изображений
        img.onmouseover = function() {
            this.src = this.getAttribute("data-rollover");
        };
        img.onmouseout = function() {
            this.src = this.getAttribute("data-rollout");
        };
    }
});
