/*
    ! 7.1. Создание массивов
*/
var empty = []; // Пустой массив
var primes = [2, 3, 5, 7, 11]; // Массив с пятью числовыми элементами
var misc = [ 1.1, true, "a", ]; // 3 элемента разных типов + завершающая запятая
var a = new Array();
var a = new Array(10);
var a = new Array(5, 4, 3, 2, 1, "testing, testing");

/*
    ! 7.2. Чтение и запись элементов массива
*/

var a = ["world"]; // Создать массив с одним элементом
var value = a[0]; // Прочитать элемент 0
a[1] = 3.14; // Записать значение в элемент 1
i = 2;
a[i] = 3; // Записать значение в элемент 2
a[i + 1] = "hello"; // Записать значение в элемент 3
a[a[i]] = a[0]; // Прочитать элементы 0 и 2, записать значение в элемент 3

a[-1.23] = true; // Будет создано свойство с именем "-1.23"
a["1000"] = 0; // 1001-й элемент массива
a[1.000] // Элемент с индексом 1. То же, что и a[1]
console.log(a);

/*
    ! Длина массива
*/

a = [1,2,3]; // Создать массив a с тремя элементами.
Object.defineProperty(a, "length", // Сделать свойство length
    {writable: false}); // доступным только для чтения.
a.length = 0; // a не изменится.

/*
    ! Добавление и удаление элементов массива
*/

a = [] // Создать пустой массив.
a[0] = "zero"; // И добавить элементы.
a[1] = "one";
a = []; // Создать пустой массив
a.push("zero") // Добавить значение в конец.
a = ["zero"]
a.push("one", "two") // Добавить еще два значения.
a = ["zero", "one", "two"]
a = [1,2,3];
delete a[1]; // теперь в массиве a отсутствует элемент с индексом1
1 in a // => false: индекс 1 в массиве не определен
a.length // => 3: оператор delete не изменяет свойство length массива

// var keys = Object.keys(o); // Получить массив имен свойств объекта o
// var values = [] // Массив для сохранения значений свойств
// for(var i = 0; i < keys.length; i++) { // Для каждого элемента в массиве
//     var key = keys[i]; // Получить имя свойства по индексу
//     values[i] = o[key]; // Сохранить значение в массиве
//     values
// }

/*
    ! Обход элементов массива
*/

// var keys = Object.keys(o); // Получить массив имен свойств объекта o
// var values = [] // Массив для сохранения значений свойств
// for(var i = 0; i < keys.length; i++) { // Для каждого элемента в массиве
//     var key = keys[i]; // Получить имя свойства по индексу
//     values[i] = o[key]; // Сохранить значение в массиве values
// }

// for(var i = 0, len = keys.length; i < len; i++) {
//     // тело цикла осталось без изменений
// }

for(var i = 0; i < a.length; i++) {
    if (!a[i]) continue; // Пропустить null, undefined и несуществ. элементы тело цикла
}

var data = [1,2,3,4,5]; // Этот массивтребуется обойти
var sumOfSquares = 0; // Требуется вычислить сумму квадратов элементов
data.forEach(function(x) { // Передать каждый элемент этой функции
    sumOfSquares += x*x; // прибавить квадрат к сумме
});
console.log(sumOfSquares) // =>55 : 1+4+9+16+25

/*
    ! Многомерные массивы
*/

var table = new Array(10); // В таблице 10 строк
for(var i = 0; i < table.length; i++)
    table[i] = new Array(10); // В каждой строке 10 столбцов
for(var row = 0; row < table.length; row++) { // Инициализировать массив
    for(col = 0; col < table[row].length; col++) {
        table[row][col] = row*col;
    }
}
// Расчет произведения 5*7 с помощью многомерного массива
var product = table[5][7]; // 35

/*
    ! Метод join()
    преобразует все элементы массива в строки, объединяет их и возвращает получившуюся строку
*/

var a = [1, 2, 3]; // Создать новый массив с указанными тремя элементами
a.join(); // => "1,2,3"
a.join(" "); // => "1 2 3"
a.join(""); // => "123"
var b = new Array(10); // Массив с длиной, равной 10, и без элементов
b.join('-') // => '---------': строка из 9 дефисов

/*
    ! Метод reverse()
    меняет порядок следования элементов в массиве на обратный и возвращает переупорядоченный массив
*/

var a = [1,2,3];
a.reverse().join(); // => "3,2,1": теперь a = [3,2,1]

/*
    ! Метод sort()
    сортирует элементы в исходном массиве и возвращает отсортированный массив
*/

var a = new Array("banana", "cherry", "apple");
a.sort();
var s = a.join(", "); // s == "apple, banana, cherry"

var a = [33, 4, 1111, 222];
a.sort(); // Алфавитный порядок: 1111, 222, 33, 4
a.sort(function(a,b) { // Числовой порядок: 4, 33, 222, 1111
    return a-b; // Возвращает значение < 0, 0 или > 0
    }); // в зависимости от порядка сортировки a и b
a.sort(function(a,b) {return b-a}); // Обратный числовой порядок

a = ['ant', 'Bug', 'cat', 'Dog']
a.sort(); // сортировка с учетом регистра символов: ['Bug','Dog','ant',cat']
a.sort(function(s,t) { // Сортировка без учета регистра символов
    var a = s.toLowerCase();
    var b = t.toLowerCase();
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
}); // => ['ant','Bug','cat','Dog']

/*
    ! Метод concat()
    создает и возвращает новый массив, содержащий элементы исходного массива
*/

var a = [1,2,3];
a.concat(4, 5) // Вернет [1,2,3,4,5]
a.concat([4,5]); // Вернет [1,2,3,4,5]
a.concat([4,5],[6,7]) // Вернет [1,2,3,4,5,6,7]
a.concat(4, [5,[6,7]]) // Вернет [1,2,3,4,5,[6,7]]

/*
    ! Метод slice()
    возвращает фрагмент, или подмассив, указанного массива
*/

var a = [1,2,3,4,5];
a.slice(0,3); // Вернет [1,2,3]
a.slice(3); // Вернет [4,5]
a.slice(1,-1); // Вернет [2,3,4]
a.slice(-3,-2); // Вернет [3]

/*
    ! Метод splice()
    универсальный метод, выполняющий вставку или удаление элементов массива
*/

var a = [1,2,3,4,5,6,7,8];
a.splice(4); // Вернет [5,6,7,8]; a = [1,2,3,4]
a.splice(1,2); // Вернет [2,3]; a = [1,4]
a.splice(1,1); // Вернет [4]; a = [1]

var a = [1,2,3,4,5];
a.splice(2,0,'a','b'); // Вернет []; a = [1,2,'a','b',3,4,5]
a.splice(2,2,[1,2],3); // Вернет ['a','b']; a = [1,2,[1,2],3,3,4,5]

/*
    ! Методы push() и pop()
    Метод push() добавляет один или несколько новых элементов в конец массива и возвращает его новую длину.
    Метод pop() выполняет обратную операцию – удаляет последний элемент массива, уменьшает длину массива и возвращает удаленное им значение.
*/

var stack = []; // стек: []
stack.push(1,2); // стек: [1,2] Вернет 2
stack.pop(); // стек: [1] Вернет 2
stack.push(3); // стек: [1,3] Вернет 2
stack.pop(); // стек: [1] Вернет 3
stack.push([4,5]); // стек: [1,[4,5]] Вернет 2
stack.pop(); // стек: [1] Вернет [4,5]
stack.pop(); // стек: [] Вернет 1

/*
    ! Методы unshift() и shift()
    вставляют и удаляют элементы в начале массива, а не в конце
*/

var a = []; // a:[]
a.unshift(1); // a:[1] Вернет: 1
a.unshift(22); // a:[22,1] Вернет: 2
a.shift(); // a:[1] Вернет: 22
a.unshift(3,[4,5]); // a:[3,[4,5],1] Вернет: 3
a.shift(); // a:[[4,5],1] Вернет: 3
a.shift(); // a:[1] Вернет: [4,5]
a.shift(); // a:[] Вернет: 1

/*
    ! Метод toString()
    преобразуют каждый элемент массива в строку
*/

//[1,2,3].toString() // Получается '1,2,3'
// ["a", "b", "c"].toString() // Получается 'a,b,c' 
[1, [2,'c']].toString() // Получается '1,2,c'

/*
    ! Метод forEach()
*/

var data = [1,2,3,4,5]; // Массив, элементы которого будут  суммироваться
// Найти сумму элементов массива
var sum = 0; // Начальное значение суммы 0
data.forEach(function(value) { sum += value; }); // Прибавить значение к sum 
console.log(sum); // => 15
// Увеличить все элементы массива на 1
data.forEach(function(v, i, a) { a[i] = v + 1; });
data // => [2,3,4,5,6]

function foreach(a,f,t) {
    try { a.forEach(f,t); }
    catch(e) {
    if (e === foreach.break) return;
    else throw e;
    }
}
foreach.break = new Error("StopIteration");

/*
    ! Метод map()
    возвращает новый массив
*/

a = [1, 2, 3];
b = a.map(function(x) { return x*x; }); // b = [1, 4, 9]

/*
    ! Метод filter()
    возвращает массив, содержащий подмножество элементов исходного массива
*/

a = [5, 4, 3, 2, 1];
smallvalues = a.filter(function(x) { return x < 3 }); // [2, 1]
everyother = a.filter(function(x,i) { return i%2==0 }); // [5, 3, 1]

var dense = sparse.filter(function() { return true; }); // уплотнить разреженный массив
a = a.filter(function(x) { return x !== undefined && x != null; }); // уплотнить массив и удалить из него все элементы со значениями undefined и null

/*
    ! Методы every() и some()
    применяют указанную функцию-предикат к элементам массива и возвращают true или false.
    every() - квантор всеобщности
    some() - квантор существования
*/

a = [1,2,3,4,5];
a.every(function(x) { return x < 10; }) // => true: все значения < 10.
a.every(function(x) { return x % 2 === 0; }) // => false: не все четные

a = [1,2,3,4,5];
a.some(function(x) { return x%2===0; }) // => true: имеются четные числа
a.some(isNaN) // => false: нет нечисловых элементов
/*
    ! в соответствии с правилами математики для пустого массива метод every() возвращает true, а метод some() возвращает false
*/

/*
    ! Методы reduce() и reduceRight()
    Методы reduce() и reduceRight() объединяют элементы массива, используя указанную вами функцию, и возвращают единственное значение
*/

var a = [1,2,3,4,5]
var sum = a.reduce(function(x,y) { return x+y }, 0); // Сумма значений
var product = a.reduce(function(x,y) { return x*y }, 1); // Произвед. значений
var max = a.reduce(function(x,y) { return (x>y)?x:y; }); // Наибольш. значение

var a = [2, 3, 4]
// Вычислить 2^(3^4). Операция возведения в степень имеет ассоциативность справа налево
var big = a.reduceRight(function(accumulator,value) {
    return Math.pow(value,accumulator);
});

var objects = [{x:1}, {y:2}, {z:3}];
var merged = objects.reduce(union); // => {x:1, y:2, z:3}

var objects = [{x:1,a:1}, {y:2,a:2}, {z:3,a:3}];
var leftunion = objects.reduce(union); // {x:1, y:2, z:3, a:3}
var rightunion = objects.reduceRight(union); // {x:1, y:2, z:3, a:1}

/*
    ! Методы indexOf() и lastIndexOf()
    отыскивают в массиве элемент с указанным значением и возвращают индекс первого
    найденного элемента или –1, если элемент с таким значением отсутствует.
*/

a = [0,1,2,1,0];
a.indexOf(1) // => 1: a[1] = 1
a.lastIndexOf(1) // => 3: a[3] = 1
a.indexOf(3) // => -1: нет элемента со значением 3

// Отыскивает все вхождения значения x в массив и возвращает
// массив индексов найденных совпадений
function findall(a, x) {
    var results = [], // Возвращаемый массив индексов
    len = a.length, // Длина массива, где выполняется поиск
    pos = 0; // Начальная позиция поиска
    while(pos < len) { // Пока остались непроверенные элементы...
        pos = a.indexOf(x, pos); // Искать
        if (pos === -1) break; // Если ничего не найдено, поиск завершен.
        results.push(pos); // Иначе - сохранить индекс в массиве
        pos = pos + 1; // И продолжить поиск со следующего элемента
    }
    return results; // Вернуть массив индексов
}
/*
    ! Некоторые операции с массивами
*/
var isArray = Function.isArray || function(o) {
    return typeof o === "object" &&
    Object.prototype.toString.call(o) === "[object Array]";
};

var a = {}; // Для начала создать обычный пустой объект
// Добавить свойства, которые сделают его похожим на массив
var i = 0;
while(i < 10) {
    a[i] = i * i;
    i++;
}
a.length = i;
// Теперь можно обойти свойства объекта, как если бы он был настоящим массивом
var total = 0;
for(var j = 0; j < a.length; j++)
total += a[j];

// Определяет, является ли o объектом, подобным массиву. Строки и функции имеют
// числовое свойство length, но они исключаются проверкой typeof.
// В клиентском JavaScript текстовые узлы DOM имеют числовое свойство length
// и, возможно, должны быть исключены дополнительной проверкой o.nodeType != 3.
function isArrayLike(o) {
    if (o && // o не null, не undefined и т. д.
        typeof o === "object" && // o - объект
        isFinite(o.length) && // o.length - конечное число
        o.length >= 0 && // o.length - положительное
        o.length===Math.floor(o.length) && // o.length - целое
        o.length < 4294967296) // o.length < 2^32
        return true; // Значит, объект o подобен массиву
    else
        return false; // Иначе - нет
}

var a = {"0":"a", "1":"b", "2":"c", length:3}; // Объект, подобный массиву
Array.prototype.join.call(a, "+") // => "a+b+c"
Array.prototype.slice.call(a, 0) // => ["a","b","c"]: копия, настоящий массив
Array.prototype.map.call(a, function(x) {
    return x.toUpperCase();
}) // => ["A","B","C"]:

var a = {"0":"a", "1":"b", "2":"c", length:3}; // Объект, подобный массиву
Array.join(a, "+")
Array.slice(a, 0)
Array.map(a, function(x) { return x.toUpperCase(); })

Array.join = Array.join || function(a,sep) {
    return Array.prototype.join.call(a,sep);
};
Array.slice = Array.slice || function(a,from,to) {
    return Array.prototype.slice.call(a,from,to);
};
Array.map = Array.map || function(a, f, thisArg) {
    return Array.prototype.map.call(a, f, thisArg);
}

s = "JavaScript"
Array.prototype.join.call(s, " ") // => "J a v a S c r i p t"
Array.prototype.filter.call(s, // Фильтровать символы строки
function(x) {
    return x.match(/[^aeiou]/); // Совпадение только с согласными
}).join("") // => "JvScrpt"
