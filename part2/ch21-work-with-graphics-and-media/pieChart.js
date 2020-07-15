/*
    * Создает элемент <svg> и рисует в нем круговую диаграмму.
    * Аргументы:
    * data: массив чисел для диаграммы, по одному для каждого сектора.
    * width,height: размеры SVG-изображения в пикселах  
    * cx, cy, r: координаты центра и радиус круга 
    * colors: массив цветов в формате HTML, по одному для каждого сектора
    * labels: массив меток для легенды,по одной для каждого сектора
    * lx, ly: координаты левого верхнего угла легенды диаграммы
    * Возвращает:
    * Элемент <svg>, хранящий круговую диаграмму.
    * Вызывающая программа должна вставить возвращаемый элемент в документ.
*/
function pieChart(data, width, height, cx, cy, r, colors, labels, lx, ly) {
    // Пространство имен XML для элементов svg
    var svgns = "http://www.w3.org/2000/svg";
    // Создать элемент <svg>, указать размеры в пикселах и координаты
    var chart = document.createElementNS(svgns, "svg:svg");
    chart.setAttribute("width", width);
    chart.setAttribute("height", height);
    chart.setAttribute("viewBox", "0 0 " + width + " " + height);
    // Сложить вместе все значения, чтобы получить общую сумму всей диаграммы
    var total = 0;
    for(var i = 0; i < data.length; i++) total += data[i];
    // Определить величину каждого сектора. Углы  измеряются в радианах.
    var angles = []
    for(var i = 0; i < data.length; i++) angles[i] = data[i]/total*Math.PI*2;
    // Цикл по всем секторам диаграммы.
    startangle = 0;
    for(var i = 0; i < data.length; i++) {
        // Точка, где заканчивается сектор
        var endangle = startangle + angles[i];
        // Вычислить координаты точек пересечения радиусов,  образующих сектор,
        // с окружностью. В соответствии с выбранными формулами углу 0 радиан
        // соответствует точка в самой верхней части окружности,
        // а положительные значения откладываются от нее по часовой стрелке.
        var x1 = cx + r * Math.sin(startangle);
        var y1 = cy - r * Math.cos(startangle);
        var x2 = cx + r * Math.sin(endangle);
        var y2 = cy - r * Math.cos(endangle);
        // Это флаг для углов, больших половины окружности. 
        // Он необходим SVG-механизму рисования дуг
        var big = 0;
        if (endangle - startangle > Math.PI) big = 1;
        // Мы описываем сектор с помощью элемента <svg:path>. 
        // Обратите внимание, что он создается вызовом createElementNS()
        var path = document.createElementNS(svgns, "path");
        // Эта строка хранит информацию о контуре, образующем сектор
        var d = "M " + cx + "," + cy + // Начало в центре окружности
            " L " + x1 + "," + y1 + // Нарисовать линию к точке (x1,y1)
            " A " + r + "," + r + // Нарисовать дугу с радиусом r
            " 0 " + big + " 1 " + // Информация о дуге...
            x2 + "," + y2 + // Дуга заканчивается в точке (x2,y2)
            " Z"; // Закончить рисование в точке (cx,cy)
        // Теперь установить атрибуты элемента <svg:path> 
        path.setAttribute("d", d); // Установить описание контура
        path.setAttribute("fill", colors[i]); // Установить цвет сектора
        path.setAttribute("stroke", "black"); // Рамка сектора - черная
        path.setAttribute("stroke-width", "2"); // 2 единицы толщиной 
        chart.appendChild(path); // Вставить сектор в диаграмму
        // Следующий сектор начинается в точке, где закончился предыдущий
        startangle = endangle;
        // Нарисовать маленький квадрат для идентификации сектора в легенде
        var icon = document.createElementNS(svgns, "rect");
        icon.setAttribute("x", lx); // Координаты квадрата
        icon.setAttribute("y", ly + 30*i);
        icon.setAttribute("width", 20); // Размер квадрата
        icon.setAttribute("height", 20);
        icon.setAttribute("fill", colors[i]); // Тем же цветом, что и сектор
        icon.setAttribute("stroke", "black"); // Такая же рамка.
        icon.setAttribute("stroke-width", "2");
        chart.appendChild(icon); // Добавить в диаграмму
        // Добавить метку правее квадрата
        var label = document.createElementNS(svgns, "text");
        label.setAttribute("x", lx + 30); // Координаты текста
        label.setAttribute("y", ly + 30*i + 18);
        // Стиль текста можно также определить посредством таблицы CSS-стилей
        label.setAttribute("font-family", "sans-serif");
        label.setAttribute("font-size", "16");
        // Добавить текстовый DOM-узел в элемент <svg:text>
        label.appendChild(document.createTextNode(labels[i]));
        chart.appendChild(label); // Добавить текст в диаграмму
    }
    return chart;
}
