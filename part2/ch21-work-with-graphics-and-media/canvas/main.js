// Определяет правильный многоугольник с n сторонами, вписанный в окружность  с центром
// в точке (x,y) и радиусом r. Вершины многоугольника находятся на окружности,
// на равном удалении друг от друга. Первая вершина  помещается в верхнюю точку
// окружности или со смещением на указанный угол angle. Поворот выполняется
// по часовой стрелке, если в последнем аргументе не передать значение true.
function polygon(c,n,x,y,r,angle,counterclockwise) {
    angle = angle || 0;
    counterclockwise = counterclockwise || false;
    c.moveTo(x + r*Math.sin(angle), // Новый фрагмент контура
    y - r*Math.cos(angle)); // Исп. тригонометрию для выч. координат
    var delta = 2*Math.PI/n; // Угловое расстояние между вершинами
    for(var i = 1; i < n; i++) { // Для каждой из оставшихся вершин
        angle += counterclockwise?-delta:delta; // Скорректировать угол
        c.lineTo(x + r*Math.sin(angle), // Линия к след. вершине
        y - r*Math.cos(angle));
    }
    c.closePath(); // Соединить первую вершину с последней
}
// Создать новый контур и добавить фрагменты  контура, соответствующие многоугольникам
c.beginPath();
polygon(c, 3, 50, 70, 50); // Треугольник
polygon(c, 4, 150, 60, 50, Math.PI/4); // Квадрат
polygon(c, 5, 255, 55, 50); // Пятиугольник
polygon(c, 6, 365, 53, 50, Math.PI/6); // Шестиугольник
polygon(c, 4, 365, 53, 20, Math.PI/4, true); // Квадрат в шестиугольнике 
// Установить некоторые свойства, определяющие внешний вид рисунка
c.fillStyle = "#ccc"; // Светло-серый фон внутренних областей
c.strokeStyle = "#008"; // темно-синие контуры
c.lineWidth = 5; // толщиной пять пикселов. 
// Нарисовать все многоугольники (каждый создается в виде отдельного фрагмента контура)
// следующими вызовами
c.fill(); // Залить фигуры
c.stroke(); // И нарисовать контур

// Восстанавливает последние сохраненные значения графических свойств,
// но не выталкивает их со стека.
CanvasRenderingContext2D.prototype.revert = function() {
    this.restore(); // Восстановить прежние значения графических свойств.
    this.save(); // Сохранить их снова, чтобы можно было вернуться к ним.
    return this; // Позволить составление цепочек вызовов методов.
};
// Устанавливает графические атрибуты в соответствии со значениями свойств объекта  o.
// Или, при вызове без аргументов, возвращает текущие значения атрибутов виде объекта.
// Обратите внимание, что этот метод не обслуживает преобразование или область отсечения.
CanvasRenderingContext2D.prototype.attrs = function(o) {
    if (o) {
        for(var a in o) // Для каждого свойства объекта o
        this[a] = o[a]; // Установить его как графический атрибут
        return this; // Позволить составление цепочек вызовов методов
    }
    else return {
        fillStyle: this.fillStyle, font: this.font,
        globalAlpha: this.globalAlpha,
        globalCompositeOperation: this.globalCompositeOperation,
        lineCap: this.lineCap, lineJoin: this.lineJoin,
        lineWidth: this.lineWidth, miterLimit: this.miterLimit,
        textAlign: this.textAlign, textBaseline: this.textBaseline,
        shadowBlur: this.shadowBlur, shadowColor: this.shadowColor,
        shadowOffsetX: this.shadowOffsetX, shadowOffsetY: this.shadowOffsetY,
        strokeStyle: this.strokeStyle
    };
};

