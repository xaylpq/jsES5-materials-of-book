var empty = {}; // Объект без свойств
var point = { x:0, y:0 }; // Два свойства
var point2 = { x:point.x, y:point.y+1 }; // Более сложные значения
var book = {
    "main title": "JavaScript",
        // Имена свойств с пробелами
    'sub-title': "The Definitive Guide", // и дефисами, поэтому используются
                                        // строковые литералы
    "for": "all audiences", // for - зарезервированное слово,
                            // поэтому в кавычках 
    author: {               // Значением этого свойства является
        firstname: "David", // объект. Обратите внимание, что
        surname: "Flanagan" // имена  этих свойств без кавычек.
    }
};

var o = new Object(); // Создать новый пустой объект: то же, что и {}.
var a = new Array(); // Создать пустой массив: то же, что и [].
var d = new Date(); // Создать объект Date, представляющий текущее время
var r = new RegExp("js"); // Создать объект RegExp для операций сопоставления с шаблоном.

var o1 = Object.create({x:1, y:2}); // o1 наследует свойства x и y.

var author = book.author; // Получить свойство "author" объекта book.
var name = author.surname // Получить свойство "surname" объекта author.
var title = book["main title"] // Получить свойство "main title" объекта book.
book.edition = 6; // Создать свойство "edition" объекта book.
book["main title"] = "ECMAScript"; // Изменить значение свойства "main title".

// inherit() возвращает вновь созданный объект, наследующий свойства
// объекта-прототипа p. Использует функцию Object.create() из ECMAScript 5,
// если она определена, иначе используется более старый прием.
function inherit(p) {
    if (p == null) throw TypeError(); // p не может быть значением null
    if (Object.create) // Если Object.create() определена...
        return Object.create(p); // использовать ее.
    var t = typeof p; // Иначе выяснить тип и проверить его
    if (t !== "object" && t !== "function") throw TypeError();
    function f() {}; // Определить фиктивный конструктор.
    f.prototype = p; // Записать в его свойство prototype
    // ссылку на объект p.
    return new f(); // Использовать f() для создания "наследника" объекта p.
}

function addstock(portfolio, stockname, shares) {
    portfolio[stockname] = shares; // чтобы присвоить значение к идентификатору в объекте не зная заранеее идентификатора
}

function getvalue(portfolio) {
    var total = 0.0;
    for(stock in portfolio) { // Для каждой компании в portfolio:
        var shares = portfolio[stock]; // получить количество акций
        var price = getquote(stock); // отыскать стоимость одной акции
        total += shares * price; // прибавить к суммарному значению
    }
    return total; // Вернуть сумму.
}

// Более наглядный и прямолинейный способ
var len = undefined;
if (book) {
    if (book.subtitle) len = book.subtitle.length;
}
// Более краткая и характерная для JavaScript альтернатива получения длины
// значения свойства subtitle
var len = book && book.subtitle && book.subtitle.length;

delete book.author; // Теперь объект book не имеет свойства author.
delete book["main title"]; // Теперь он не имеет свойства "main title".

o = {x:1}; // o имеет собственное свойство x и наследует toString
delete o.x; // Удалит x и вернет true
delete o.x; // Ничего не сделает (x не существует) и вернет true
delete o.toString; // Ничего не сделает (toString не собственное свойство) и вернет true
delete 1; // Бессмысленно, но вернет true

delete Object.prototype; // Удаление невозможно - ненастраиваемое свойство
var x = 1; // Объявление глобальной переменной
delete this.x; // Это свойство нельзя удалить
function f() {} // Объявление глобальной функции
delete this.f; // Это свойство также нельзя удалить
delete x; // В строгом режиме возбудит исключение SyntaxError
delete this.x; // Такой способ работает

/* 
    * Копирует перечислимые свойства из объекта p в объект o и возвращает o.
    * Если o и p имеют свойства с одинаковыми именами, значение свойства
    * в объекте o затирается значением свойства из объекта p.
    * Эта функция не учитывает наличие методов доступа и не копирует атрибуты.
*/
function extend(o, p) {
    for(prop in p) { // Для всех свойств в p.
        o[prop] = p[prop]; // Добавить свойство в o.
    }
    return o;
}
/*
    * Копирует перечислимые свойства из объекта p в объект o и возвращает o.
    * Если o и p имеют свойства с одинаковыми именами, значение свойства
    * в объекте o остается неизменным.
    * Эта функция не учитывает наличие методов доступа и не копирует атрибуты.
*/
function merge(o, p) {
    for(prop in p) { // Для всех свойств в p.
        if (o.hasOwnProperty[prop]) continue; // Кроме имеющихся в o.
        o[prop] = p[prop]; // Добавить свойство в o.
    }
    return o;
}
/*
    * Удаляет из объекта o свойства, отсутствующие в объекте p. Возвращает o.
*/
function restrict(o, p) {
    for(prop in o) { // Для всех свойств в o
        if (!(prop in p)) delete o[prop]; // Удалить, если отсутствует в p
    }
    return o;
}
/*
    * Удаляет из объекта o свойства, присутствующие в объекте p. Возвращает o.
*/
function subtract(o, p) {
    for(prop in p) { // Для всех свойств в p
        delete o[prop]; // Удалить из o (удаление несуществующих
        // свойств можно выполнять без опаски)
    }
    return o;
}
/*
    * Возвращает новый объект, содержащий свойства, присутствующие хотя бы в одном
    * из объектов, o или p. Если оба объекта, o и p, имеют свойства с одним
    * и тем же именем, используется значение свойства из объекта p.
*/
function union(o,p) { return extend(extend({},o), p); }
/*
    * Возвращает новый объект, содержащий свойства, присутствующие сразу в обоих
    * объектах, o или p. Результат чем-то напоминает пересечение o и p,
    * но значения свойств объекта p отбрасываются
*/
function intersection(o,p) { return restrict(extend({}, o), p); }
/*
    * Возвращает массив имен собственных перечислимых свойств объекта o.
*/
function keys(o) {
    if (typeof o !== "object") throw TypeError(); // Арг. должен быть объектом
    var result = []; // Возвращаемый массив
    for(var prop in o) { // Для всех перечислимых свойств
        if (o.hasOwnProperty(prop)) // Если это собственное свойство,
        result.push(prop); // добавить его в массив array.
    }
    return result; // Вернуть массив.
}

// var o = {
//     // Обычное свойство с данными
//     data_prop: value,
//     // Свойство с методами доступа определяется как пара функций
//     get accessor_prop() { /* тело функции */ },
//     set accessor_prop(value) { /* тело функции */ }
// };

var p = {
    // x и y - обычные свойства с данными, доступные для чтения/ записи.
    x: 1.0,
    y: 1.0,
    // r - доступное для чтения/записи свойство с двумя методами доступа.
    // Не забывайте добавлять запятые после методов доступа.
    get r() { return Math.sqrt(this.x*this.x + this.y*this.y); },
    set r(newvalue) {
        var oldvalue = Math.sqrt(this.x*this.x + this.y*this.y);
        var ratio = newvalue/oldvalue;
        this.x *= ratio;
        this.y *= ratio;
    },
    // theta - доступное только для чтения свойство с единственным методом чтения.
    get theta() { return Math.atan2(this.y, this.x); }
};

var q = inherit(p); // Создать новый объект, наследующий методы доступа
q.x = 1; q.y = 1; // Создать собственные свойства с данными в объекте q
console.log(q.r); // И использовать унаследованные свойства
console.log(q.theta); // с методами доступа

var p = Object.defineProperties({}, {
    x: { value: 1, writable: true, enumerable:true, configurable:true },
    y: { value: 1, writable: true, enumerable:true, configurable:true },
    r: {
        get: function() { return Math.sqrt(this.x*this.x + this.y*this.y) },
        enumerable:true,
        configurable:true
    }
});

var p = {x:1}; // Определить объект-прототип.
var o = Object.create(p); // Создать объект с этим прототипом.
p.isPrototypeOf(o) // => true: o наследует p
Object.prototype.isPrototypeOf(p) // => true: p наследует Object.prototype

o = {x:1, y:{z:[false,null,""]}}; // Определить испытательный объект
s = JSON.stringify(o); // s == '{"x":1,"y":{"z":[false,null,""]}}'
p = JSON.parse(s); // p - глубокая копия объекта o

var d = new Date(),
    jsom = d.toJSON();

console.log(jsom)