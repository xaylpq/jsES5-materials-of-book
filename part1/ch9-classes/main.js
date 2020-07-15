/*
    ! Определение функций
*/
// функция создает новый объект из 6.1 (Аналог конструктора)
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


// range.js: Класс, представляющий диапазон значений.
// Это фабричная функция, которая возвращает новый объект range.
function range(from, to) {
    // Использует функцию inherit() для создания объекта, наследующего объект-прототип,
    // определяемый ниже. Объект-прототип хранится как свойство данной функции
    // и определяет общие методы (поведение) для всех объектов range.
    var r = inherit(range.methods);
    // Сохранить начальное и конечное значения в новом объекте range.
    // Это не унаследованные свойства, и они являются уникальными для данного объекта.
    r.from = from;
    r.to = to;
    // В заключение вернуть новый объект 
    return r;
}
// Ниже следует объект-прототип, определяющий методы, наследуемые всеми объектами range.
range.methods = {
    // Возвращает true, если x - объект класса range, в противном случае возвращает false
    // Этот метод может работать не только с числовыми диапазонами,
    // но также с текстовыми диапазонами и с диапазонами дат Date.
    includes: function(x) { return this.from <= x && x <= this.to; },
    // Вызывает f для каждого целого числа в диапазоне.
    // Этот метод может работать только с числовыми диапазонами.
    foreach: function(f) {
        for(var x = Math.ceil(this.from); x <= this.to; x++) f(x);
    },
    // Возвращает строковое представление диапазона
    toString: function() { return "(" + this.from + "..." + this.to + ")"; }
};
// Ниже приводится пример использования объекта range.
var r = range(1,3); // Создать новый объект range
r.includes(2); // => true: число 2 входит в диапазон
r.foreach(console.log); // Выведет 1 2 3
console.log(r); // Выведет (1...3)

// ! Реализация класса Range с помощью конструктора
// range2.js: Еще один класс, представляющий диапазон значений.
// Это функция-конструктор, которая инициализирует новые объекты Range.
// Обратите внимание, что она не создает и не возвращает объект.
// Она лишь инициализирует его.
function Range(from, to) {
    // Сохранить начальное и конечное значения в новом объекте range.
    // Это не унаследованные свойства, и они являются уникальными для данного объекта.
    this.from = from;
    this.to = to;
}
// Все объекты Range наследуют свойства этого объекта.
// Обратите внимание, что свойство обязательно должно иметь имя "prototype".
Range.prototype = {
    // Возвращает true, если x - объект класса range, в противном случае возвращает false
    // Этот метод может работать не только с числовыми диапазонами, но также
    // с текстовыми диапазонами и с диапазонами дат Date.
    includes: function(x) { return this.from <= x && x <= this.to; },
    // Вызывает f для каждого целого числа в диапазоне.
    // Этот метод может работать только с числовыми диапазонами.
    foreach: function(f) {
        for(var x = Math.ceil(this.from); x <= this.to; x++) f(x);
    },
    // Возвращает строковое представление диапазона
    toString: function() { return "(" + this.from + "..." + this.to + ")"; }
};
// Ниже приводится пример использования объекта range.
var r = new Range(1,3); // Создать новый объект range
r.includes(2); // => true: число 2 входит в диапазон
r.foreach(console.log); // Выведет 1 2 3
console.log(r); // Выведет (1...3)

r instanceof Range // вернет true, если r наследует Range.prototype(является экземпляром класса Range)

// Простая функция для определения простых классов
function defineClass(constructor, /* Функция, определяющая свойства экземпляра*/ methods, /* Методы экземпляров: копируются в прототип */ statics) /* Свойства класса: копируются в конструктор */{
    if (methods) extend(constructor.prototype, methods);
    if (statics) extend(constructor, statics);
    return constructor;
}
// Простейший вариант нашего класса Range
var SimpleRange =
    defineClass(function(f,t) { this.f = f; this.t = t; },
    {
        includes: function(x) { return this.f<=x && x <= this.t;},
        toString: function() { return this.f + "..." + this.t; }
    },
    { upto: function(t) { return new SimpleRange(0, t); } });

/* 
    ! Классы и типы
*/

range.methods.isPrototypeOf(r); // range.methods - объект-прототип.

function typeAndValue(x) {
    if (x == null) return ""; // Значения null и undefined не имеют конструкт.
    switch(x.constructor) {
        case Number: return "Number: " + x; // Работает с простыми типами
        case String: return "String: '" + x + "'";
        case Date: return "Date: " + x; // Со встроенными типами
        case RegExp: return "Regexp: " + x;
        case Complex: return "Complex: " + x; // И с пользовательскими типами
    }
}

//Функция грубой проверки типа
// Возвращает true, если o реализует методы, определяемые последующими аргументами.
function quacks(o /*, ... */) {
    for(var i=1; i<arguments.length; i++) { // для каждого аргумента после o
        var arg = arguments[i];
        switch(typeof arg) { // Если arg - это:
            case 'string': // строка: проверить наличие метода с этим именем
                if (typeof o[arg] !== "function") return false;
            continue;
            case 'function': // функция: использовать объект-прототип
                // Если аргумент является функцией, использовать ее прототип
                arg = arg.prototype;
                // переход к следующему случаю case
            case 'object': // объект: проверить наличие соотв. методов
                for(var m in arg) { // Для каждого свойства объекта
                    if (typeof arg[m]!=="function") continue; // Пропустить свойства, не являющиеся методами
                    if (typeof o[m] !== "function") return false;
                }
        }
    }
    // Если мы попали сюда, значит, объект o реализует все, что требуется
    return true;
}

/*
    ! Приемы объектно-ориентированного программирования в JavaScript
*/

// Set.js: произвольное множество значений
function Set() { // Это конструктор
    this.values = {}; // Свойства этого объекта составляют множество
    this.n = 0; // Количество значений в множестве
    this.add.apply(this, arguments); // Все аргументы являются значениями,добавляемыми в множество 
}
// Добавляет все аргументы в множество.
Set.prototype.add = function() {
    for(var i = 0; i < arguments.length; i++) { // Для каждого аргумента
        var val = arguments[i]; // Добавляемое значение
        var str = Set._v2s(val); // Преобразовать в строку
        if (!this.values.hasOwnProperty(str)) { // Если отсутствует в множ.
            this.values[str] = val; // Отобразить строку в знач.
            this.n++; // Увеличить размер множества
        }
    }
    return this; // Для поддержки цепочек вызовов методов
};
// Удаляет все аргументы из множества.
Set.prototype.remove = function() {
    for(var i = 0; i < arguments.length; i++) { // Для каждого аргумента
        var str = Set._v2s(arguments[i]); // Отобразить в строку
        if (this.values.hasOwnProperty(str)) { // Если присутствует в множ.
            delete this.values[str]; // Удалить
            this.n--; // Уменьшить размер множества
        }
    }
    return this; // Для поддержки цепочек вызовов методов
};
// Возвращает true, если множество содержит value; иначе возвращает false.
Set.prototype.contains = function(value) { 
    return this.values.hasOwnProperty(Set._v2s(value));
};
// Возвращает размер множества.
Set.prototype.size = function() { return this.n; };
// Вызывает функцию f в указанном контексте для каждого элемента множества.
Set.prototype.foreach = function(f, context) {
    for(var s in this.values) // Для каждой строки в множестве
    if (this.values.hasOwnProperty(s)) // Пропустить унаследов. свойства
    f.call(context, this.values[s]); // Вызвать f для значения
};
// Функция для внутреннего использования. Отображает любые значения JavaScript
// в уникальные строки.
Set._v2s = function(val) {
    switch(val) {
        case undefined: return 'u'; // Специальные простые значения
        case null: return 'n'; // отображаются в односимвольные строки.
        case true: return 't';
        case false: return 'f';
        default: switch(typeof val) {
            case 'number': return '#' + val; // Числа получают префикс #.
            case 'string': return '"' + val; // Строки получают префикс ".
            default: return '@' + objectId(val); // Объекты и функции - @
        }
    }
    // Для любого объекта возвращается строка. Для разных объектов эта функция
    // будет возвращать разные строки, а для одного и того же объекта всегда
    // будет возвращать одну и ту же строку. Для этого в объекте o создается свойство.
    // В ES5 это свойство можно сделать неперечислимым и доступным только для чтения.
    function objectId(o) {
        var prop = "|**objectid**|"; // Имя частного идентификац. свойства
        if (!o.hasOwnProperty(prop)) // Если объект не имеет этого свойства
            o[prop] = Set._v2s.next++; // Присвоить ему след. доступ. значение
        return o[prop]; // Вернуть идентификатор
    }
};
Set._v2s.next = 100; // Начальное значение для идентификаторов объектов.

// Создать новый класс Coin с четырьмя возможными значениями:
// Coin.Penny, Coin.Nickel и т. д.
var Coin = enumeration({Penny: 1, Nickel:5, Dime:10, Quarter:25});
var c = Coin.Dime; // Это экземпляр нового класса
c instanceof Coin // => true: instanceof работает
c.constructor == Coin // => true: свойство constructor работает
Coin.Quarter + 3*Coin.Nickel // => 40: значения преобразуются в числа
Coin.Dime == 10 // => true: еще одно преобразование в число
Coin.Dime > Coin.Nickel // => true: операторы отношения работают
String(Coin.Dime) + ":" + Coin.Dime // => "Dime:10": преобразов. в строку

// ! Типы-перечисления в JavaScript
// Эта функция создает новый тип-перечисление. Объект в аргументе определяет
// имена и значения каждого экземпляра класса. Возвращает функцию-конструктор,
// идентифицирующую новый класс. Отметьте, однако, что конструктор возбуждает
// исключение: его нельзя использовать для создания новых экземпляров типа.
// Возвращаемый конструктор имеет свойства, которые отображают имена в значения,
// а также массив значений values и функцию foreach() для выполнения итераций
function enumeration(namesToValues) {
    // Фиктивный конструктор, который будет использоваться как возвращаемое значение.
    var enumeration = function() { throw "Нельзя создать экземпляр класса" + " Enumeration"; };
    // Перечислимые значения наследуют объект this.
    var proto = enumeration.prototype = {
        constructor: enumeration, // Идентификатор типа
        toString: function() { return this.name; }, // Возвращает имя
        valueOf: function() { return this.value; }, // Возвращает значение
        toJSON: function() { return this.name; } // Для сериализации
    };
    enumeration.values = []; // Массив перечислимых объектов-значений
    // Теперь создать экземпляры нового типа.
    for(name in namesToValues) { // Для каждого значения
        var e = inherit(proto); // Создать объект для его представления
        e.name = name; // Дать ему имя
        e.value = namesToValues[name]; // И значение
        enumeration[name] = e; // Сделать свойством конструктора
        enumeration.values.push(e); // И сохранить в массиве values
    }
    // Метод класса для обхода экземпляров класса в цикле
    enumeration.foreach = function(f,c) {
        for(var i = 0; i < this.values.length; i++) f.call(c,this.values[i]);
    };
    // Вернуть конструктор, идентифицирующий новый тип
    return enumeration;
}

// ! Представление игральных карт в виде типов-перечислений
// Определение класса для представления игральной карты
function Card(suit, rank) {
    this.suit = suit; // Каждая карта имеет масть
    this.rank = rank; // и значение
}
// Следующие типы-перечисления определяют возможные масти и значения карт
Card.Suit = enumeration({Clubs: 1, Diamonds: 2, Hearts:3, Spades:4});
Card.Rank = enumeration({Two: 2, Three: 3, Four: 4, Five: 5, Six: 6, Seven: 7, Eight: 8, Nine: 9, Ten: 10, Jack: 11, Queen: 12, King: 13, Ace: 14});
// Определение текстового представления карты
Card.prototype.toString = function() {
    return this.rank.toString() + " " + this.suit.toString();
};
// Сравнивает значения двух карт в соответствии с правилами игры в покер
Card.prototype.compareTo = function(that) {
    if (this.rank < that.rank) return -1;
    if (this.rank > that.rank) return 1;
    return 0;
};
// Функция упорядочения карт в соответствии с правилами игры в покер
Card.orderByRank = function(a,b) { return a.compareTo(b); };
// Функция упорядочения карт в соответствии с правилами игры в бридж
Card.orderBySuit = function(a,b) {
    if (a.suit < b.suit) return -1;
    if (a.suit > b.suit) return 1;
    if (a.rank < b.rank) return -1;
    if (a.rank > b.rank) return 1;
    return 0;
};
// Определение класса представления стандартной колоды карт
function Deck() {
    var cards = this.cards = []; // Колода - просто массив карт
    Card.Suit.foreach(function(s) { // Инициализировать массив
        Card.Rank.foreach(function(r) {
            cards.push(new Card(s,r));
        });
    });
}
// Метод перемешивания: тасует колоду карт и возвращает ее
Deck.prototype.shuffle = function() {
    // Для каждого элемента массива: поменять местами со случайно выбранным элементом ниже
    var deck = this.cards, len = deck.length;
    for(var i = len-1; i > 0; i--) {
        var r = Math.floor(Math.random()*(i+1)), temp; // Случайное число
        temp = deck[i], deck[i] = deck[r], deck[r] = temp; // Поменять
    }
    return this;
};
// Метод раздачи: возвращает массив карт
Deck.prototype.deal = function(n) {
    if (this.cards.length < n) throw "Карт для выдачи не хватает";
    return this.cards.splice(this.cards.length-n, n);
};
// Создает новую колоду карт, тасует ее и раздает как в игре в бридж
var deck = (new Deck()).shuffle();
var hand = deck.deal(13).sort(Card.orderBySuit);


// Добавить новые методы в объект-прототип класса Set.
extend(Set.prototype, {
    // Преобразует множество в строку
    toString: function() {
        var s = "{", i = 0;
        this.foreach(function(v) { s += ((i++ > 0)?", ":"") + v; });
        return s + "}";
    },
    // Действует так же, как toString, но вызывает toLocaleString для всех значений
    toLocaleString : function() {
        var s = "{", i = 0;
        this.foreach(function(v) {
        if (i++ > 0) s += ", ";
        if (v == null) s += v; // null и undefined
        else s += v.toLocaleString(); // остальные
        });
        return s + "}";
    },
    // Преобразует множество в массив значений
    toArray: function() {
        var a = [];
        this.foreach(function(v) { a.push(v); });
        return a;
    }
});
// Для нужд сериализации в формат JSON интерпретировать множество как массив.
Set.prototype.toJSON = Set.prototype.toArray;


// ! Обобщенные методы, пригодные для заимствования
var generic = {
    // Возвращает строку, включающую имя функции-конструктора, если доступно,
    // и имена и значения всех неунаследованных свойств, не являющихся функциями.
    toString: function() {
        var s = '[';
        // Если объект имеет конструктор и конструктор имеет имя, использовать
        // это имя класса как часть возвращаемой строки. Обратите внимание, что
        // свойство name функций является нестандартным и не поддерживается повсеместно.
        if (this.constructor && this.constructor.name)
            s += this.constructor.name + ": ";
        // Теперь обойти все неунаследованные свойства, не являющиеся функциями
        var n = 0;
        for(var name in this) {
            if (!this.hasOwnProperty(name)) continue; // пропустить унаслед.
            var value = this[name];
            if (typeof value === "function") continue; // пропустить методы
            if (n++) s += ", ";
            s += name + '=' + value;
        }
        return s + ']';
    },
    // Проверить равенство, сравнив конструкторы и свойства экземпляров объектов this
    // и that. Работает только с классами, свойства экземпляров которых являются
    // простыми значениями и могут сравниваться с помощью оператора ===.
    // Игнорировать специальное свойство, добавляемое классом Set.
    equals: function(that) {
        if (that == null) return false;
        if (this.constructor !== that.constructor) return false;
        for(var name in this) {
            if (name === "|**objectid**|") continue; // пропустить спец. св.
            if (!this.hasOwnProperty(name)) continue; // пропустить унасл. св.
            if (this[name] !== that[name]) return false; // сравнить значения
        }
        return true; // Объекты равны, если все свойства равны.
    }
};

// ! Класс Range со слабо инкапсулированными границами
function Range(from, to) {
    // Не сохраняет границы в свойствах объекта. Вместо этого определяет функции доступа,
    // возвращающие значения границ. Сами значения хранятся в замыкании.
    this.from = function() { return from; };
    this.to = function() { return to; };
}
// Методы прототипа не имеют прямого доступа к границам: они должны вызывать
// методы доступа, как любые другие функции и методы.
Range.prototype = {
    constructor: Range,
    includes: function(x) { return this.from() <= x && x <= this.to(); },
    foreach: function(f) {
        for(var x=Math.ceil(this.from()), max=this.to(); x <= max; x++) f(x);
    },
    toString: function() { return "(" + this.from() + "..." + this.to() + ")"; }
};

function Set() {
    this.values = {}; // Свойство для хранения множества
    this.n = 0; // Количество значений в множестве
    // Если конструктору передается единственный объект, подобный массиву,
    // он добавляет элементы массива в множество.
    // В противном случае в множество добавляются все аргументы
    if (arguments.length == 1 && isArrayLike(arguments[0]))
    this.add.apply(this, arguments[0]);
    else if (arguments.length > 0)
    this.add.apply(this, arguments);
}

Set.fromArray = function(a) {
    s = new Set(); // Создать пустое множество
    s.add.apply(s, a); // Передать элементы массива методу add
    return s; // Вернуть новое множество
};

/*
    ! Подклассы
*/

B.prototype = inherit(A.prototype); // Подкласс наследует суперкласс
B.prototype.constructor = B; // Переопределить унаследованное св. constructor

// Простая функция для создания простых подклассов
function defineSubclass(superclass, // Конструктор суперкласса 
    constructor, // Конструктор нового подкласса
    methods, // Методы экземпл.: копируются в прототип
    statics) // Свойства класса: копируются в констр-р
{
    // Установить объект-прототип подкласса
    constructor.prototype = inherit(superclass.prototype);
    constructor.prototype.constructor = constructor;
    // Скопировать методы methods и statics, как в случае с обычными классами
    if (methods) extend(constructor.prototype, methods);
    if (statics) extend(constructor, statics);
    // Вернуть класс
    return constructor;
}
// То же самое можно реализовать в виде метода конструктора суперкласса
Function.prototype.extend = function(constructor, methods, statics) {
    return defineSubclass(this, constructor, methods, statics);
};

// ! SingletonSet: простой подкласс множеств
// Функция-конструктор
function SingletonSet(member) {
    this.member = member; // Сохранить единственный элемент множества
}
// Создает объект-прототип, наследующий объект-прототип класса Set.
SingletonSet.prototype = inherit(Set.prototype);
// Далее добавляются свойства в прототип.
// Эти свойства переопределяют одноименные свойства объекта Set.prototype.
extend(SingletonSet.prototype, {
    // Установить свойство constructor
    constructor: SingletonSet,
    // Данное множество доступно только для чтения: методы add() и remove() возбуждают исключение 
    add: function() { throw "множество доступно только для чтения"; },
    remove: function() { throw "множество доступно только для чтения"; },
    // Экземпляры SingletonSet всегда имеют размер, равный 1
    size: function() { return 1; },
    // Достаточно вызвать функцию один раз и передать ей единственный элемент.
    foreach: function(f, context) { f.call(context, this.member); },
    // Метод contains() стал проще: такая реализация пригодна только для множества с единственным элементом
    contains: function(x) { return x === this.member; }
});

// ! Определение неперечислимых свойств
// Обертывание программного код функцией позволяет определять переменные
// в области видимости функции
(function() {
// Определить свойство objectId как неперечислимое и наследуемое
// всеми объектами. При попытке получить значение этого свойства
// вызывается метод чтения. Свойство не имеет метода записи, поэтому
// оно доступно только для чтения. Свойство определяется как ненастраиваемое,
// поэтому его нельзя удалить.
Object.defineProperty(Object.prototype, "objectId", {
    get: idGetter, // Метод чтения значения
    enumerable: false, // Неперечислимое
    configurable: false // Не может быть удалено
});
// Функция чтения, которая вызывается при попытке получить значение свойстваobjectId
function idGetter() { // Функция чтения, возвращающая id
    if (!(idprop in this)) { // Если объект еще не имеет id
        if (!Object.isExtensible(this)) // И если можно добавить свойство
            throw Error("Нельзя определить id нерасширяемого объекта");
        Object.defineProperty(this, idprop, { // Добавить его.
            value: nextid++, // Значение
            writable: false, // Только для чтения
            enumerable: false, // Неперечислимое
            configurable: false // Неудаляемое
        });
    }
    return this[idprop]; // Вернуть существующее или новое значение
};
// Следующие переменные используются функцией idGetter() и являются частными для этой функции
var idprop = "|**objectId**|"; // Предполагается, что это свойство больше нигде не используется
var nextid = 1; // Начальное значение для id
}()); // Вызвать функцию-обертку, чтобы выполнить программный код

