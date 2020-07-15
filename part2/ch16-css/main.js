// Делает элемент e относительно позиционируемым и перемещает его влево и вправо.
// Первым аргументом может быть объект элемента или значение атрибута id требуемого
// элемента. Если во втором аргументе передать функцию, она будет вызвана с элементом e
// в виде аргумента по завершении воспроизведения анимации. Третий аргумент определяет
// величину смещения элемента e. По умолчанию принимает значение 5 пикселов.
// Четвертый аргумент определяет, как долго должен воспроизводиться эффект.
// По умолчанию эффект длится 500 мсек.
function shake(e, oncomplete, distance, time) {
    // Обработка аргументов
    if (typeof e === "string") e = document.getElementById(e);
    if (!time) time = 500;
    if (!distance) distance = 5;
    var originalStyle = e.style.cssText; // Сохранить оригинальный стиль e
    e.style.position = "relative"; // Сделать относит. позиционируемым
    var start = (new Date()).getTime(); // Запомнить момент начала анимации
    animate(); // Запустить анимацию
    // Эта функция проверяет прошедшее время и изменяет координаты e.
    // Если анимацию пора завершать, восстанавливает первоначальное состояние
    // элемента e. Иначе изменяет координаты e и планирует следующий свой вызов.
    function animate() {
        var now = (new Date()).getTime(); // Получить текущее время
        var elapsed = now-start; // Сколько прошло времени с начала?
        var fraction = elapsed/time; // Доля от требуемого времени?
        if (fraction < 1) { // Если рано завершать анимацию
            // Вычислить координату x элемента e как функцию от доли общего
            // времени анимации. Здесь используется синусоидальная функция,
            // а доля общего времени воспроизведения умножается на 4pi,
            // поэтому перемещение взад и вперед выполняется дважды.
            var x = distance * Math.sin(fraction*4*Math.PI);
            e.style.left = x + "px";
            // Попробовать вызвать себя через 25 мсек или в конце запланированного
            // отрезка общего времени воспроизведения. Мы стремимся сделать
            // анимацию гладкой, воспроизводя ее со скоростью 40 кадров/сек.
            setTimeout(animate, Math.min(25, time-elapsed));
        }
        else { // Иначе анимацию пора завершать
            e.style.cssText = originalStyle // Восстановить первонач. стиль
            if (oncomplete) oncomplete(e); // Вызвать ф-цию обратного вызова
        }
    }
}
// Растворяет e от состояния полной непрозрачности до состояния полной прозрачности
// за указанное количество миллисекунд. Предполагается, что, когда вызывается
// эта функция, e полностью непрозрачен. oncomplete - необязательная функция,
// которая будет вызвана с элементом e в виде аргумента по завершении анимации.
// Если аргумент time не задан, устанавливается интервал 500 мсек.
// Эта функция не работает в IE, но ее можно модифицировать так, чтобы  
// в дополнение к свойству opacity она использовала нестандартное
// свойство filter, реализованное в IE.
function fadeOut(e, oncomplete, time) {
    if (typeof e === "string") e = document.getElementById(e);
    if (!time) time = 500;
    // В качестве простой "функции перехода", чтобы сделать анимацию немного
    // нелинейной, используется Math.sqrt: сначала растворение идет быстро,
    // а затем несколько замедляется.
    var ease = Math.sqrt;
    var start = (new Date()).getTime(); // Запомнить момент начала анимации
    animate(); // И запустить анимацию
    function animate() {
        var elapsed = (new Date()).getTime()-start; // Прошедшее время
        var fraction = elapsed/time; // Доля от общего времени
        if (fraction < 1) { // Если не пора завершать
            var opacity = 1 - ease(fraction); // Вычислить непрозрачн.
            e.style.opacity = String(opacity); // Установить ее в e
            setTimeout(animate, // Запланировать очередной
            Math.min(25, time-elapsed)); // кадр
        }
        else { // Иначе завершить
            e.style.opacity = "0"; // Сделать e полностью прозрачным
            if (oncomplete) oncomplete(e); // Вызвать ф-цию обратного вызова
        }
    }
}
