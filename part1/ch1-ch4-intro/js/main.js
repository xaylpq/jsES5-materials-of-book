/*
    Материалы по книге "Java Script. Подробное руководство (Дэвид Флэнаган)"
*/

// Код 0.1. Вычисление факториала
function factorial(n) {
    var p = 1;
    for (var i = 2; i <= n; i++)
        p *= i;
    return p;
}
console.log(`0.1. Факториал 6: ` + factorial(6));


// Код 1.1. Типы данных
// Все, что сле­ду­ет за дву­мя сим­во­ла­ми слэша, яв­ля­ет­ся ком­мен­та­ри­ем.
// Вни­ма­тель­но чи­тай­те ком­мен­та­рии: они опи­сы­ва­ют про­грамм­ный код Ja­va­Script.
// Пе­ре­мен­ная - это сим­во­ли­че­ское имя не­ко­то­ро­го зна­че­ния.
// Пе­ре­мен­ные объ­яв­ля­ют­ся с по­мо­щью клю­че­во­го сло­ва var:
var x; // Объ­яв­ле­ние пе­ре­мен­ной с име­нем x.
// При­сваи­вать зна­че­ния пе­ре­мен­ным мож­но с по­мо­щью зна­ка =
x = 0; // Те­перь пе­ре­мен­ная x име­ет зна­че­ние 0
x // => 0: В вы­ра­же­ни­ях имя пе­ре­мен­ной за­ме­ща­ет­ся ее зна­че­ни­ем.
// Ja­va­Script под­дер­жи­ва­ет зна­че­ния раз­лич­ных ти­пов
x = 1; // Чис­ла.
x = 0.01; // Це­лые и ве­ще­ст­вен­ные чис­ла пред­став­ле­ны од­ним ти­пом.
x = "hello world"; // Стро­ки тек­ста в ка­выч­ках.
x = 'Ja­va­Script'; // Стро­ки мож­но так­же за­клю­чать в апо­ст­ро­фы.
x = true; // Ло­ги­че­ские зна­че­ния.
x = false; // Дру­гое ло­ги­че­ское зна­че­ние.
x = null; // null - осо­бое зна­че­ние, обо­зна­чаю­щее "нет зна­че­ния".
x = undefined; // Зна­че­ние undefined по­доб­но зна­че­нию null.

// Наи­бо­лее важ­ным ти­пом дан­ных в Ja­va­Script яв­ля­ют­ся объ­ек­ты.
// Объ­ект - это кол­лек­ция пар имя/значение или ото­бра­же­ние стро­ки в зна­че­ние.
var book = { // Объ­ек­ты за­клю­ча­ют­ся в фи­гур­ные скоб­ки.
    topic: "Ja­va­Script", // Свой­ст­во "topic" име­ет зна­че­ние "Ja­va­Script".
    fat: true // Свой­ст­во "fat" име­ет зна­че­ние true.
}; // Фи­гур­ная скоб­ка от­ме­ча­ет ко­нец объ­ек­та.
// Дос­туп к свой­ст­вам объ­ек­тов вы­пол­ня­ет­ся с по­мо­щью . или []:
book.topic // => "Ja­va­Script"
book["fat"] // => true: дру­гой спо­соб по­лу­чить зна­че­ние свойства.
book.author = "Flanagan"; // Соз­дать но­вое свой­ст­во при­сваи­ва­ни­ем.
book.contents = {}; // {} - пус­той объ­ект без свойств.
// Ja­va­Script под­дер­жи­ва­ет мас­си­вы (спи­ски с чи­сло­вы­ми ин­дек­са­ми) зна­че­ний:
var primes = [2, 3, 5, 7]; // Мас­сив из 4 зна­че­ний, ог­ра­ни­чи­ва­ет­ся [ и ].
primes[0] // => 2: пер­вый эле­мент (с ин­дек­сом 0) мас­си­ва.
primes.length // => 4: ко­ли­че­ст­во эле­мен­тов в мас­си­ве.
primes[primes.length-1] // => 7: по­след­ний эле­мент мас­си­ва.
primes[4] = 9; // До­ба­вить но­вый эле­мент при­сваи­ва­ни­ем.
primes[4] = 11;var empty = [];empty.length// Или из­ме­нить зна­че­ние имею­ще­го­ся эле­мен­та.
// [] - пус­той мас­сив без эле­мен­тов.
// => 0
// Мас­си­вы и объ­ек­ты мо­гут хра­нить дру­гие мас­си­вы и объ­ек­ты:
var points = [ // Мас­сив с 2 эле­мен­та­ми.
    {x:0, y:0}, // Ка­ж­дый эле­мент - это объ­ект.
    {x:1, y:1}
];
var data = { // Объ­ект с 2 свой­ст­ва­ми
    trial1: [[1,2], [3,4]], // Зна­че­ние ка­ж­до­го свой­ст­ва - это мас­сив.
    trial2: [[2,3], [4,5]] // Эле­мен­та­ми мас­си­ва яв­ля­ют­ся мас­си­вы.
};

// Опе­ра­то­ры вы­пол­ня­ют дей­ст­вия со зна­че­ния­ми (опе­ран­да­ми) и вос­про­из­во­дят
// но­вое зна­че­ние. Наи­бо­лее час­то ис­поль­зуе­мы­ми яв­ля­ют­ся ариф­ме­ти­че­ские опе­ра­то­ры:
3 + 2 // => 5: сло­же­ние
3 - 2 // => 1: вы­чи­та­ние
3 * 2 // => 6: ум­но­же­ние
3 / 2 // => 1.5: де­ле­ние
points[1].x - points[0].x // => 1: мож­но ис­поль­зо­вать бо­лее слож­ные опе­ран­ды
"3" + "2" // => "32": + скла­ды­ва­ет чис­ла, объ­еди­ня­ет стро­ки
// В Ja­va­Script име­ют­ся не­ко­то­рые со­кра­щен­ные фор­мы ариф­ме­ти­че­ских опе­ра­то­ров
var count = 0; // Объ­яв­ле­ние пе­ре­мен­ной
count++; // Уве­ли­че­ние зна­че­ния пе­ре­мен­ной на 1
count--; // Умень­ше­ние зна­че­ния пе­ре­мен­ной на 1
count += 2; // До­ба­вить 2: то же, что count = count + 2;
count *= 3; // Ум­но­жить на 3: то же, что count = count * 3;
count // => 6: име­на пе­ре­мен­ных са­ми яв­ля­ют­ся вы­ра­же­ния­ми
// Опе­ра­то­ры срав­не­ния по­зво­ля­ют про­ве­рить два зна­че­ния на ра­вен­ст­во
// или не­ра­вен­ст­во, вы­яс­нить, ка­кое зна­че­ние мень­ше или боль­ше, и т. д.
// Они воз­вра­ща­ют зна­че­ние true или false.
var x = 2, y = 3; // Зна­ки = вы­пол­ня­ют при­сваи­ва­ние, а не срав­не­ние
x == y // => false: ра­вен­ст­во
x != y // => true: не­ра­вен­ст­во
x < y // => true: мень­ше
x <= y // => true: мень­ше или рав­но
x > y // => false: боль­ше
x >= y // => false: боль­ше или рав­но
"two" == "three" // => false: две раз­ных стро­ки
"two" > "three"
false == (x > y)// => true: при упо­ря­до­че­нии по ал­фа­ви­ту стро­ка "tw" боль­ше, чем "th"
    // => true: false рав­но false
    // Ло­ги­че­ские опе­ра­то­ры объ­еди­ня­ют или ин­вер­ти­ру­ют ло­ги­че­ские зна­че­ния
//(x == 2) && (y == 3) // => true: оба срав­не­ния ис­тин­ны. && - "И"
//(x > 3) || (y < 3) // => false: оба срав­не­ния лож­ны. || - "ИЛИ"
!(x == y) // => true: ! ин­вер­ти­ру­ет ло­ги­че­ское зна­че­ние

// Функ­ции - это па­ра­мет­ри­зо­ван­ные бло­ки про­грамм­но­го ко­да Ja­va­Script,
// ко­то­рые мож­но вы­зы­вать мно­го­крат­но.
function plus1(x) { // Оп­ре­де­лить функ­цию с име­нем "plus1" и с па­ра­мет­ром "x"
    return x+1; // Вер­нуть зна­че­ние на 1 боль­ше по­лу­чен­но­го
} // Функ­ции за­клю­ча­ют­ся в фи­гур­ные скоб­ки
plus1(y) // => 4: y име­ет зна­че­ние 3, по­это­му этот вы­зов вер­нет 3+1
var square = function(x) { // Функ­ции мож­но при­сваи­вать пе­ре­мен­ным
    return x*x; // Вы­чис­лить зна­че­ние функ­ции
}; // Точ­ка с за­пя­той от­ме­ча­ет ко­нец при­сваи­ва­ния.
square(plus1(y)) // => 16: вы­зов двух функ­ций в од­ном вы­ра­же­нии

// Функ­ции, при­сво­ен­ные свой­ст­вам объ­ек­тов, на­зы­ва­ют­ся ме­то­да­ми.
// Все объ­ек­ты в Ja­va­Script име­ют ме­то­ды:
var a = []; // Соз­дать пус­той мас­сив
a.push(1,2,3); // Ме­тод push() до­бав­ля­ет эле­мен­ты в мас­сив
a.reverse(); // Дру­гой ме­тод: пе­ре­став­ля­ет эле­мен­ты в об­рат­ном по­ряд­ке
// Мож­но оп­ре­де­лять соб­ст­вен­ные ме­то­ды. Клю­че­вое сло­во "this" ссы­ла­ет­ся на объ­ект,
// в ко­то­ром оп­ре­де­лен ме­тод: в дан­ном слу­чае на мас­сив points.
points.dist = function() { // Ме­тод вы­чис­ле­ния рас­стоя­ния ме­ж­ду точ­ка­ми
    var p1 = this[0]; // Пер­вый эле­мент мас­си­ва, от­но­си­тель­но ко­то­ро­го вы­зван ме­тод
    var p2 = this[1]; // Вто­рой эле­мент объ­ек­та "this"
    var a = p2.x-p1.x; // Раз­ность ко­ор­ди­нат X
    var b = p2.y-p1.y; // Раз­ность ко­ор­ди­нат Y
    return Math.sqrt(a*a + b*b); // Math.sqrt() вы­чис­ля­ет ко­рень квад­рат­ный
};
points.dist() // => 1.414: рас­стоя­ние ме­ж­ду 2-мя точ­ка­ми

// В Ja­va­Script име­ют­ся ус­лов­ные ин­ст­рук­ции и ин­ст­рук­ции цик­лов, син­так­си­че­ски
// по­хо­жие на ана­ло­гич­ные ин­ст­рук­ции C, C++, Java и в дру­гих язы­ках.
function abs(x) { // Функ­ция, вы­чис­ляю­щая аб­со­лют­ное зна­че­ние
    if (x >= 0) { // Ин­ст­рук­ция if ...
        return x; // вы­пол­ня­ет этот код, ес­ли срав­не­ние да­ет true.
    } // Ко­нец пред­ло­же­ния if.
    else { // Не­обя­за­тель­ное пред­ло­же­ние else вы­пол­ня­ет свой код,
        return -x; // ес­ли срав­не­ние да­ет зна­че­ние false.
    } // Фи­гур­ные скоб­ки мож­но опус­тить, ес­ли пред­ло­же­ние со­дер­жит 1 ин­ст­рук­цию.
} // Об­ра­ти­те вни­ма­ние на ин­ст­рук­ции return внут­ри if/else.

function factorial(n) {var product = 1;while(n > 1) {product *= n;n--;}return product;}
factorial(4) // Функ­ция, вы­чис­ляю­щая фак­то­ри­ал
// На­чать с про­из­ве­де­ния, рав­но­го 1
// По­вто­рять ин­ст­рук­ции в {}, по­ка вы­раж. в () ис­тин­но
// Со­кра­щен­ная фор­ма вы­ра­же­ния product = product * n;
// Со­кра­щен­ная фор­ма вы­ра­же­ния n = n - 1
// Ко­нец цик­ла
// Вер­нуть про­из­ве­де­ние
// => 24: 1*4*3*2
function factorial2(n) { // Дру­гая вер­сия, ис­поль­зую­щая дру­гой цикл
    var i, product = 1; // На­чать с 1
    for(i=2; i <= n; i++) // i ав­то­ма­ти­че­ски уве­ли­чи­ва­ет­ся с 2 до n
    product *= i; // Вы­пол­нять в ка­ж­дом цик­ле. {} мож­но опус­тить,  
    // ес­ли те­ло цик­ла со­сто­ит из 1 ин­ст­рук­ции
    return product; // Вер­нуть фак­то­ри­ал
}
factorial2(5) // => 120: 1*2*3*4*5

// Оп­ре­де­ле­ние функ­ции-кон­ст­рук­то­ра для ини­циа­ли­за­ции но­во­го объ­ек­та Point
function Point(x,y) { // По со­гла­ше­нию имя кон­ст­рук­то­ров на­чи­на­ет­ся с за­глав­но­го сим­во­ла
    this.x = x; // this - ссыл­ка на ини­циа­ли­зи­руе­мый объ­ект
    this.y = y;// Со­хра­нить ар­гу­мен­ты в свой­ст­вах объ­ек­та
    // Ни­че­го воз­вра­щать не тре­бу­ет­ся
}
// Что­бы соз­дать но­вый эк­зем­п­ляр, не­об­хо­ди­мо вы­звать функ­цию-кон­ст­рук­тор
// с клю­че­вым сло­вом "new"
var p = new Point(1, 1); // Точ­ка на плос­ко­сти с ко­ор­ди­на­та­ми (1,1)
// Ме­то­ды объ­ек­тов Point оп­ре­де­ля­ют­ся за счет при­сваи­ва­ния функ­ций свой­ст­вам
// объ­ек­та-про­то­ти­па, ас­со­ции­ро­ван­но­го с функ­ци­ей-кон­ст­рук­то­ром.
Point.prototype.r = function() {
    return Math.sqrt( // Вер­нуть ко­рень квад­рат­ный от x2 + y2
        this.x * this.x + // this - это объ­ект Point, от­но­си­тель­но ко­то­ро­го...
        this.y * this.y // ...вы­зы­ва­ет­ся ме­тод.
    );
};
// Те­перь объ­ект p ти­па Point (и все по­сле­дую­щие объ­ек­ты Point) на­сле­ду­ет ме­тод r()
p.r() // => 1.414...
        

// Код 1.2. Клиентский JavaScript