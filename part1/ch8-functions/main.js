/*
    ! Определение функций
*/

// Выводит имена и значения всех свойств объекта o. Возвращает undefined.
function printprops(o) {
    for(var p in o)
        console.log(p + ": " + o[p] + "\n");
}

// Вычисляет Декартово расстояние между точками (x1,y1) и (x2,y2).
function distance(x1, y1, x2, y2) {
    var dx = x2 - x1;
    var dy = y2 - y1;
    return Math.sqrt(dx*dx + dy*dy);
}

// Рекурсивная функция (вызывающая сама себя), вычисляющая факториал
// Напомню, что x! - это произведение x и всех положительных целых чисел, меньше x.
function factorial(x) {
    if (x <= 1) return 1;
    return x * factorial(x-1);
}

// Следующее выражение определяет функцию, вычисляющую квадрат аргумента.
// Обратите внимание, что она присваивается переменной
var square = function(x) { return x*x; }

// Выражения определения функций могут иметь имена, что позволяет 
// производить рекурсивные вызовы.
var f = function fact(x) { if (x <= 1) return 1; else return x*fact(x-1); };
// Выражения определения функций могут также использоваться в качестве
// аргументов других выражений:
data.sort(function(a,b) { return a-b; });

// Выражения определения функций иногда могут тут же вызываться:
var tensquared = (function(x) {return x*x;}(10));

// Вложенная функция
function hypotenuse(a, b) {
    function square(x) { return x*x; }
    return Math.sqrt(square(a) + square(b));
}

/*
    ! Вызов функций
*/

// вызов функций как функций
printprops({x:1});
var total = distance(0,0,2,1) + distance(2,1,3,5);
var probability = factorial(5)/factorial(13);

// Определение и вызов функции, которая выясняет действующий режим работы.
var strict = (function() { return !this; }());

// Вызов функций как методов
var calculator = { // Литерал объекта
    operand1: 1,
    operand2: 1,
    add: function() {
    // Обратите внимание, что для ссылки на этот объект используется ключевое слово this.
        this.result = this.operand1 + this.operand2;
    }
};
calculator.add(); // Вызвать метод, чтобы вычислить 1+1.
calculator.result // => 2

var o = { // Объект o.
    m: function() { // Метод m объекта.
        var self = this; // Сохранить значение this в переменной.
        console.log(this === o); // Выведет "true": this - это объект o.
        f(); // Вызвать вспомогательную ф-цию f().
        function f() { // Вложенная функция f
            console.log(this === o); // "false": this - глоб. об. или undefined
            console.log(self === o); // "true": self - знач. this внеш. ф-ции.
        }
    }
};
o.m(); // Вызвать метод m объекта o.

// Вызов функции как конструктора
var o = new Object();
var o = new Object;

// Добавить в массив a перечислимые имена свойств объекта o и вернуть его.
// Если аргумент a не не был передан, создать и вернуть новый массив.
function getPropertyNames(o, /* необязательный */ a) {
    if (a === undefined) a = []; // Если массив не определен, создать новый (можно использовать a = a || [];)
    for(var property in o) a.push(property);
    return a;
}
// Эта функция может вызываться с 1 или 2 аргументами:
var a = getPropertyNames(o); // Получить свойства объекта o в новом массиве
getPropertyNames(p,a); // добавить свойства объектаp в этот массив

function f(x, y, z) {
    // Сначала проверяется, правильное ли количество аргументов передано
    if (arguments.length != 3) {
        throw new Error("функция f вызвана с " + arguments.length + "аргументами, а требуется 3.");
    }
    // А теперь сам код функции...
}

function max(/*...*/) {
    var m = Number.NEGATIVE_INFINITY;
    // Цикл по всем аргументам, поиск и сохранение наибольшего из них
    for(var i = 0; i < arguments.length; i++)
        if (arguments[i] > max) max = arguments[i];
    // Вернуть наибольшее значение
    return max;
}
var largest = max(1, 10, 100, 2, 3, 1000, 4, 5, 10000, 6); // => 10000

// использование свойства calle
var factorial = function(x) {
    if (x <= 1) return 1;
    return x * arguments.callee(x-1);
};


// Скопировать length элементов из массива from в массив to.
// Копирование начинается с элемента from_start в массиве from
// и выполняется в элементы, начиная с to_start в массиве to.
// Запомнить порядок следования аргументов такой функции довольно сложно.
function arraycopy(/* массив */ from, /* индекс */ from_start, /* массив */ to, /* индекс */ to_start, /* целое */ length) {
    // здесь находится реализация функции
}
// Эта версия функции чуть менее эффективная, но не требует запоминать порядок следования
// аргументов, а аргументы from_start и to_start по умолчанию принимают значение 0.
function easycopy(args) {
    arraycopy(args.from,
        args.from_start || 0, // Обратите внимание, как назначаются 
        args.to, // значения по умолчанию
        args.to_start || 0,
        args.length);
}
// Далее следует пример вызова функции easycopy():
var a = [1,2,3,4], b = [];
easycopy({from: a, to: b, length: 4});

// Возвращает сумму элементов массива (или объекта, подобного массиву) a.
// Все элементы массива должны быть числовыми, при этом значения null
// и undefined игнорируются.
function sum(a) {
    if (isArrayLike(a)) {
        var total = 0;
        for(var i = 0; i < a.length; i++) { // Цикл по всем элементам
            var element = a[i];
            if (element == null) continue; // Пропустить null и undefined
            if (isFinite(element)) total += element;
            else throw new Error("sum(): все элементы должны быть числами");
        }
        return total;
    }
    else throw new Error("sum(): аргумент должен быть массивом");
}

function flexisum(a) {
    var total = 0;
    for(var i = 0; i < arguments.length; i++) {
        var element = arguments[i], n;
        if (element == null) continue; // Игнорировать null и undefined
        if (isArray(element)) // Если аргумент - массив
            n = flexisum.apply(this, element); // вычислить сумму рекурсивно
        else if (typeof element === "function") // Иначе, если это функция...
            n = Number(element()); // вызвать и преобразовать.
        else n = Number(element); // Иначе попробовать преобразовать
        if (isNaN(n)) // Если не удалось преобразовать в число, возбудить искл.
            throw Error("flexisum(): невозможно преобразовать " + element + " в число");
        total += n; // Иначе прибавить n к total
    }
    return total;
}

/*
    ! Функции как данные
*/

function square(x) { return x*x; }
var s = square; // Теперь s ссылается на ту же функцию, что и square
square(4); // => 16
s(4); // => 16

var o = {square: function(x) { return x*x; }}; // Литерал объекта
var y = o.square(16); // y = 256

var a = [function(x) { return x*x; }, 20]; // Литерал объекта
a[0](a[1]); // => 400

//Использование функций как данных
// Определения нескольких простых функций
function add(x,y) { return x + y; }
function subtract(x,y) { return x - y; }
function multiply(x,y) { return x * y; }
function divide(x,y) { return x / y; }
// Эта функция принимает одну из предыдущих функций
// в качестве аргумента и вызывает ее с двумя операндами
function operate(operator, operand1, operand2){
    return operator(operand1, operand2);
}
// Так можно вызвать эту функцию для вычисления выражения (2+3)+(4*5):
var i = operate(add, operate(add, 2, 3), operate(multiply, 4, 5));
// Ради примера реализуем эти функции снова, на этот раз
// с помощью литералов функций внутри литерала объекта.
var operators = {
    add: function(x,y) { return x+y; },
    subtract: function(x,y) { return x-y; },
    multiply: function(x,y) { return x*y; },
    divide: function(x,y) { return x/y; },
    pow: Math.pow // Можно использовать даже предопределенныефункции
};
// Эта функция принимает имя оператора, отыскивает оператор в объекте,
// а затем вызывает его с указанными операндами.
// Обратите внимание на синтаксис вызова функции оператора.
function operate2(operation, operand1, operand2) {
    if (typeof operators[operation] === "function")
    return operators[operation](operand1, operand2);
    else throw "неизвестный оператор";
}
// Вычислить значение ("hello" + " " + "world"):
var j = operate2("add", "hello", operate2("add", " ", "world"));
// Использовать предопределенную функцию Math.pow():
var k = operate2("pow", 10, 2);

// Инициализировать свойство counter объекта функции. Объявления функций
// поднимаются вверх, поэтому мы можем выполнить это присваивание до объявления функции.
uniqueInteger.counter = 0;
// Эта функция возвращает разные целые числа при каждом вызове.
// Для сохранения следующего возвращаемого значения она использует собственное свойство.
function uniqueInteger() {
    return uniqueInteger.counter++; // Увеличить и вернуть свойство counter
}

// Вычисляет факториалы и сохраняет результаты в собственных свойствах.
function factorial(n) {
    if (isFinite(n) && n>0 && n==Math.round(n)) { // Только конечные положительные целые
        if (!(n in factorial)) // Если не сохранялось ранее
            factorial[n] = n * factorial(n-1); // Вычислить и сохранить
        return factorial[n]; // Вернуть сохр. результат
    }
    else return NaN; // Для ошибочного аргумента
}
factorial[1] = 1; // Инициализировать кэш базовым случаем.

/*
    ! Функции как пространства имен
*/

function mymodule() {
    // Здесь находится реализация модуля.
    // Любые переменные, используемые модулем, превратятся в локальные
    // переменные этой функции и не будут засорять глобальное пространство имен.
}
mymodule(); // Но не забудьте вызвать функцию!

(function() { // функция mymodule переписана как неименованное выражение
    // Здесь находится реализация модуля.
}()); // конец литерала функции и ее вызов.

// Определяет функцию extend, которая копирует свойства второго и последующих аргументов
// в первый аргумент. Здесь реализован обход ошибки в IE: во многих версиях IE цикл for/in
// не перечисляет перечислимые свойства объекта o, если одноименное свойство
// его прототипа является неперечислимым. Это означает, что такие свойства, 
// как toString, обрабатываются некорректно, если явно не проверять их.
var extend = (function() { // Присвоить значение, возвращаемое этой функцией
    // Сначала проверить наличие ошибки, прежде чем исправлять ее.
    for(var p in {toString:null}) {
        // Если мы оказались здесь, значит, цикл for/in работает корректно
        // и можно вернуть простую версию функции extend()
        return function extend(o) {
            for(var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for(var prop in source) o[prop] = source[prop];
            }
            return o;
        };
    }
    // Если мы оказались здесь, следовательно, цикл for/in не перечислил
    // свойство toString тестового объекта. Поэтому необходимо вернуть версию extend(),
    // которая явно проверяет неперечислимость свойств прототипа Object.prototype.
    // Список свойств, которые необходимо проверить
    var protoprops = ["toString", "valueOf", "constructor", "hasOwnProperty",
        "isPrototypeOf", "propertyIsEnumerable", "toLocaleString"];
    return function patched_extend(o) {
        for(var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            // Скопировать все перечислимые свойства
            for(var prop in source) o[prop] = source[prop];
            // А теперь проверить специальные случаи свойств
            for(var j = 0; j < protoprops.length; j++) {
                prop = protoprops[j];
                if (source.hasOwnProperty(prop)) o[prop] = source[prop];
            }
        }
        return o;
    };
}());

/*
    ! Замыкания
*/

var scope = "global scope"; // Глобальная переменная
function checkscope() {
    var scope = "local scope"; // Локальная переменная
    function f() { return scope; } // Вернет значение локальной переменной scope
    return f();
}
checkscope() // => "local scope"

var uniqueInteger = (function() { // Определение и вызов
    var counter = 0; // Частное значение для функции ниже
    return function() { return counter++; };
}());

function counter() {
    var n = 0;
    return {
        count: function() { return n++; },
        reset: function() { n = 0; }
    };
}
var c = counter(), d = counter(); // Создать два счетчика
c.count() // => 0
d.count() // => 0: они действуют независимо
c.reset() // методы reset() и count() совместно используют одну переменную
c.count() // => 0: сброс счетчика c
d.count() // => 1: не оказывает влияния на счетчик d

function counter(n) { // Аргумент n функции - скрытая переменная
    return {
        // Метод чтения свойства возвращает и увеличивает переменную счетчика.
        get count() { return n++; },
        // Метод записи в свойство не позволяет уменьшать значение n
        set count(m) {
            if (m >= n) n = m;
            else throw Error("значение счетчика нельзя уменьшить ");
        }
    };
}
var c = counter(1000);
c.count // => 1000
c.count // => 1001
c.count = 2000
c.count // => 2000
c.count = 2000 // => Ошибка!

// ! Реализация методов доступа к частному свойству с использованием замыканий
// Эта функция добавляет методы доступа к свойству с заданным именем объекта o.
// Методы получают имена вида get<name> и set<name>. Если дополнительно предоставляется
// функция проверки, метод записи будет использовать ее для проверки значения
// перед сохранением. Если функция проверки возвращает false,
// метод записи генерирует исключение.
//
// Необычность такого подхода заключается в том, что значение свойства,
// доступного методам, сохраняется не в виде свойства объекта o, а в виде
// локальной переменной этой функции. Кроме того, методы доступа также определяются
// внутри этой функции и потому получают доступ к этой локальной переменной.
// Это означает, что значение доступно только этим двум методам и не может быть
// установлено или изменено иначе, как методом записи.
function addPrivateProperty(o, name, predicate) {
    var value; // Это значение свойства
    // Метод чтения просто возвращает значение.
    o["get" + name] = function() { return value; };
    // Метод записи сохраняет значение или возбуждает исключение, если функция проверки отвергает это значение.
    o["set" + name] = function(v) {
        if (predicate && !predicate(v))
        throw Error("set" + name + ": недопустимое значение " + v);
        else
        value = v;
    };
}
// Следующий фрагмент демонстрирует работу метода addPrivateProperty().
var o = {}; // Пустой объект 
// Добавить к свойству методы доступа с именами getName() и setName()
// Обеспечить допустимость только строковых значений
addPrivateProperty(o, "Name", function(x) { return typeof x == "string"; });
o.setName("Frank"); // Установить значение свойства
console.log(o.getName()); // Получить значение свойства
o.setName(0); // Попробовать установить значение свойства неверного типа


// Эта функция возвращает функцию, которая всегда возвращает v
function constfunc(v) { return function() { return v; }; }
// Создать массив функций-констант:
var funcs = [];
for(var i = 0; i < 10; i++) funcs[i] = constfunc(i);
// Функция в элементе массива с индексом 5 возвращает 5.
funcs[5]() // => 5

// Возвращает массив функций, возвращающих значения 0-9
function constfuncs() {
    var funcs = [];
    for(var i = 0; i < 10; i++)
        funcs[i] = function() { return i; };
    return funcs;
}
var funcs = constfuncs();
funcs[5]() // Что вернет этот вызов? (10)

/*
    ! Свойства и методы функций и конструктор Function
*/

// Эта функция использует arguments.callee, поэтому она не будет работать в строгом режиме.
function check(args) {
    var actual = args.length; // Фактическое число аргументов
    var expected = args.callee.length; // Ожидаемое число аргументов
    if (actual !== expected) // Если не совпадают, генерируется исключение
    throw new Error("ожидается: " + expected + "; получено " + actual);
}
function f(x, y, z) {
    // Проверить число ожидаемых и фактически переданных аргументов.
    check(arguments);
    // Теперь выполнить оставшуюся часть функции как обычно
    return x + y + z;
}

// Замещает метод m объекта o версией метода, которая регистрирует
// сообщения до и после вызова оригинального метода.
function trace(o, m) {
    var original = o[m]; // Сохранить оригинальный метод в замыкании.
    o[m] = function() { // Определить новый метод.
        console.log(new Date(), "Entering:", m); // Записать сообщение.
        var result = original.apply(this, arguments); // Вызвать оригинал.
        console.log(new Date(), "Exiting:", m); // Записать сообщение.
        return result; // Вернуть результат.
    };
}

function f(y) { return this.x + y; } // Функция, которую требуется привязать
var o = { x : 1 }; // Объект, к которому выполняется привязка
var g = f.bind(o); // Вызов g(x) вызовет o.f(x)
g(2) // => 3

var sum = function(x,y) { return x + y }; // Возвращает сумму 2 аргументов
// Создать новую функцию, подобную sum, но со связанным значением null
// ключевого слова this и со связанным значением первого аргумента, равным 1.
// Новая функция принимает всего один аргумент.
var succ = sum.bind(null, 1);
succ(2) // => 3: аргумент x связан со значением 1, а 2 передается в арг. y
function f(y,z) { return this.x + y + z }; // Еще одна функция сложения
var g = f.bind({x:1}, 2); // Связать this и y
g(3) // => 6: this.x - связан с 1, y - связан с 2, а 3 передается в z

// ! Использование конструктора функции
var scope = "глобальная";
function constructFunction() {
    var scope = "локальная";
    return new Function("return scope"); // Здесь не используется локальная область видимости!
}
// Следующая строка вернет "глобальная", потому что функция, возвращаемая конструктором Function(), является глобальной.
constructFunction()(); // => "глобальная"

/* 
    ! Функциональное программирование
*/

var data = [1,1,3,5,5]; // Массив чисел
// Среднее - это сумма значений элементов, деленная на их количество
var total = 0;
for(var i = 0; i < data.length; i++) total += data[i];
var mean = total/data.length; // Среднее значение равно 3
// Чтобы найти стандартное отклонение, необходимо вычислить сумму квадратов
// отклонений элементов от среднего.
total = 0;
for(var i = 0; i < data.length; i++) {
    var deviation = data[i] - mean;
    total += deviation * deviation;
}
var stddev = Math.sqrt(total/(data.length-1)); // Стандартное отклонение = 2

// Для начала необходимо определить две простые функции
var sum = function(x,y) { return x+y; };
var square = function(x) { return x*x; };
// Затем использовать их совместно с методами класса Array для вычисления
// среднего и стандартного отклонения
var data = [1,1,3,5,5];
var mean = data.reduce(sum)/data.length;
var deviations = data.map(function(x) {return x-mean;});
var stddev = Math.sqrt(deviations.map(square).reduce(sum)/(data.length-1));

// Эта функция высшего порядка возвращает новую функцию, которая передает свои аргументы
// функции f и возвращает логическое отрицание значения, возвращаемого функцией f;
function not(f) {
    return function() { // Возвращает новую функцию
        var result = f.apply(this, arguments); // вызов f
        return !result; // и инверсия результата.
    };
}
var even = function(x) { // Функция, определяющая четность числа
    return x % 2 === 0;
};
var odd = not(even); // Новая функция, выполняющая противоположную операцию
[1,1,3,5,5].every(odd); // => true: все элементы массива нечетные

// Возвращает функцию, которая принимает массив в виде аргумента, применяет функцию f
// к каждому элементу и возвращает массив возвращаемых значений.
// Эта функция отличается от функции map(), представленной выше.
function mapper(f) {
    return function(a) { return map(a, f); };
}
var increment = function(x) { return x+1; };
var incrementer = mapper(increment);
incrementer([1,2,3]) // => [2,3,4]

// Возвращает новую функцию, которая вычисляет f(g(...)). Возвращаемая функция h
// передает все свои аргументы функции g, затем передает значение, полученное от g,
// функции f и возвращает результат вызова f. Обе функции, f и g,
// вызываются с тем же значением this, что и h.
function compose(f,g) {
    return function() {
        // Для вызова f используется call, потому что ей передается
        // единственное значение, а для вызова g используется apply,
        // потому что ей передается массив значений.
        return f.call(this, g.apply(this, arguments));
    };
}
var square = function(x) { return x*x; };
var sum = function(x,y) { return x+y; };
var squareofsum = compose(square, sum);
squareofsum(2,3) // => 25

// ! Частичное применение функций
// Вспомогательная функция преобразования объекта (или его части),
// подобного массиву, в настоящий массив. Используется ниже
// для преобразования объекта arguments в настоящий массив.
function array(a, n) { return Array.prototype.slice.call(a, n || 0); }
// Аргументы этой функции помещаются в начало списка
function partialLeft(f /*, ...*/) {
    var args = arguments; // Сохранить внешний массив аргументов
    return function() { // И вернуть эту функцию
        var a = array(args, 1); // Начиная с элемента 1 во внеш. масс.
        a = a.concat(array(arguments)); // Добавить внутренний массив аргум.
        return f.apply(this, a); // Вызвать f с этим списком аргументов
    };
}
// Аргументы этой функции помещаются в конец списка
function partialRight(f /*, ...*/) {
    var args = arguments; // Сохранить внешний массив аргументов
    return function() { // И вернуть эту функцию
        var a = array(arguments); // Начинать с внутр. масс. аргументов
        a = a.concat(array(args,1)); // Добавить внешние арг., начиная с 1.
        return f.apply(this, a); // Вызвать f с этим списком аргументов
    };
}
// Аргументы этой функции играют роль шаблона. Неопределенные значения
// в списке аргументов заполняются значениями из внутреннего набора.
function partial(f /*, ... */) {
    var args = arguments; // Сохранить внешний массив аргументов
    return function() {
        var a = array(args, 1); // Начинать с внешнего массива аргументов
        var i=0, j=0;
        // Цикл по этим аргументам, заменить значения undefined значениями из внутреннего списка аргументов
        for(; i < a.length; i++)
        if (a[i] === undefined) a[i] = arguments[j++];
        // Добавить оставшиеся внутренние аргументы в конец списка
        a = a.concat(array(arguments, j))
        return f.apply(this, a);
    };
}
// Ниже приводится функция, принимающая три аргумента
var f = function(x,y,z) { return x * (y - z); };
// Обратите внимание на отличия между следующими тремя частичными применениями
partialLeft(f, 2)(3,4) // => -2: Свяжет первый аргумент: 2 * (3 - 4)
partialRight(f, 2)(3,4) // => 6: Свяжет последний аргумент: 3 * (4 - 2)
partial(f, undefined, 2)(3,4) // => -6: Свяжет средний аргумент: 3 * (2 - 4)

var increment = partialLeft(sum, 1);
var cuberoot = partialRight(Math.pow, 1/3);
String.prototype.first = partial(String.prototype.charAt, 0);
String.prototype.last = partial(String.prototype.substr, -1, 1);

var not = partialLeft(compose, function(x) { return !x; });
var even = function(x) { return x % 2 === 0; };
var odd = not(even);
var isNumber = not(isNaN)

var data = [1,1,3,5,5]; // Исходные данные
var sum = function(x,y) { return x+y; }; // Две элементарные функции
var product = function(x,y) { return x*y; };
var neg = partial(product, -1); // Определения других функций
var square = partial(Math.pow, undefined, 2);
var sqrt = partial(Math.pow, undefined, .5);
var reciprocal = partial(Math.pow, undefined, -1);
// Вычислить среднее и стандартное отклонение. Далее используются только функции
// без каких либо операторов, отчего программный код начинает напоминать
// программный код на языке Lisp!
var mean = product(reduce(data, sum), reciprocal(data.length));
var stddev = sqrt(product(reduce(map(data, compose(square, partial(sum, neg(mean)))), sum), reciprocal(sum(data.length,-1))));

/*
    ! Мемоизация
*/

// Возвращает мемоизованную версию функции f. Работает, только если все возможные
// аргументы f имеют отличающиеся строковые представления.
function memoize(f) {
    var cache = {}; // Кэш значений сохраняется в замыкании.
    return function() {
        // Создать строковую версию массива arguments для использования в качестве ключа кэша.
        var key = arguments.length + Array.prototype.join.call(arguments,",");
        if (key in cache) return cache[key];
        else return cache[key] = f.apply(this, arguments);
    };
}


// Возвращает наибольший общий делитель двух целых чисел, используя
// алгоритм Эвклида: http://en.wikipedia.org/wiki/Euclidean_algorithm
function gcd(a,b) { // Проверка типов a и b опущена
    var t; // Временная переменная для обмена
    if (a < b) t=b, b=a, a=t; // Убедиться, что a >= b
    while(b != 0) t=b, b = a%b, a=t; // Это алгоритм Эвклида поиска НОД
    return a;
}
var gcdmemo = memoize(gcd);
gcdmemo(85, 187) // => 17
// Обратите внимание, что при мемоизации рекурсивных функций желательно,
// чтобы рекурсия выполнялась в мемоизованной версии, а не в оригинале.
var factorial = memoize(function(n) {
    return (n <= 1) ? 1 : n * factorial(n-1);
});
factorial(5) // => 120. Также поместит в кэш факториалы для чисел 4, 3, 2 и 1.
