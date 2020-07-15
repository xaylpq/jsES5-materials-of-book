/*
    ! Работа с документами
*/
/* 
    * Эта функция принимает произвольное количество строковых аргументов.
    * Каждый аргумент интерпретируется как значение атрибута id элемента,
    * и для каждого из них вызывается метод document.getElementById().
    * Возвращает объект, который отображает значения атрибута id
    * в соответствующие объекты Element. Если какое-то значение атрибута id
    * не будет найдено в документе, возбуждает исключение Error.
*/
function getElements(/* значения атрибутов id...*/) {
    var elements = {}; // Создать пустое отображение
    for(var i = 0; i < arguments.length; i++) { // Для каждого аргумента
        var id = arguments[i]; // Аргумент - id элемента
        var elt = document.getElementById(id); // Отыскать элемент
        if (elt == null) // Если не найден,
            throw new Error("No element with id: " + id); // возбудить ошибку
        elements[id] = elt; // Отобразить id в элемент
    }
    return elements; // Вернуть отображение id в элементы
}

// Получить ссылку на объект Element для элемента
// <form name="shipping_address"> 
var form = document.shipping_address;
var spans = document.getElementsByTagName("span");
var firstpara = document.getElementsByTagName("p")[0];
var firstParaSpans = firstpara.getElementsByTagName("span");
document.shipping_address
document.forms.shipping_address;

for(var i = 0; i < document.images.length; i++) // Обойти все изображения
    document.images[i].style.display = "none"; // ...и скрыть их.

// Отыскать все элементы с идентификатором "warning" в атрибуте class
var warnings = document.getElementsByClassName("warning");
// Отыскать всех потомков элемента с именем "log" с идентификаторами "error" и "fatal" в атрибуте class
var log = document.getElementById("log");
var fatal = log.getElementsByClassName("fatal error");

// сослаться на второй дочерний узел первого дочернего узла объекта Document
document.childNodes[0].childNodes[1]
document.firstChild.firstChild.nextSibling

/*
    * Возвращает ссылку на n-го предка элемента e или null, если нет такого предка
    * или если этот предок не является элементом Element
    * (например, Document или DocumentFragment). 
    * Если в аргументе n передать 0, функция вернет сам элемент e.
    * Если в аргументе n передать 1 (или вообще опустить этот аргумент),
    * функция вернет родительский элемент.
    * Если в аргументе n передать 2, функция вернет родителя родительского элемента и т. д.
*/
function parent(e, n) {
    if (n === undefined) n = 1;
    while(n-- && e) e = e.parentNode;
    if (!e || e.nodeType !== 1) return null;
    return e;
}
/*
    * Возвращает n-й братский элемент элемента e.
    * Если в аргументе n передать положительное число, функция вернет следующий
    * n-й братский элемент.
    * Если в аргументе n передать отрицательное число, функция вернет предыдущий
    * n-й братский элемент.
    * Если в аргументе n передать ноль, функция вернет сам элемент e.
*/
function sibling(e,n) {
    while(e && n !== 0) { // Если e не определен, просто вернуть его
        if (n > 0) { // Отыскать следующий братский элемент
            if (e.nextElementSibling) e = e.nextElementSibling;
            else {
                for(e=e.nextSibling; e && e.nodeType !== 1; e=e.nextSibling)
                /* пустой цикл */ ;
            }
            n--;
        }
        else { // Отыскать предыдущий братский элемент
            if (e.previousElementSibing) e = e.previousElementSibling;
            else {
                for(e=e.previousSibling;e&&e.nodeType!==1;e=e.previousSibling)
                /* пустой цикл */ ;
            }
            n++;
        }
    }
    return e;
}
/*
    * Возвращает n-й дочерний элемент элемента e или null, если нет такого
    * дочернего элемента.
    * Если в аргументе n передать отрицательное число, поиск дочернего элемента
    * будет выполняться с конца. 0 соответствует первому дочернему элементу,
    * но -1 – последнему, -2 – второму с конца и т. д.
*/
function child(e, n) {
    if (e.children) { // Если массив children существует
        if (n < 0) n += e.children.length; // Преобразовать отрицательное число в индекс массива
        if (n < 0) return null; // Если получилось отрицательное число, значит, нет такого дочернего элемента
        return e.children[n]; // Вернуть заданный дочерний элемент
    }
    // Если элемент e не имеет массива children, начать поиск с первого
    // дочернего элемента, двигаясь вперед, или начать поиск с последнего
    // дочернего элемента, двигаясь назад.
    if (n >= 0) { // n - положительное: двигаться вперед, начиная с первого
        // Найти первый дочерний элемент элемента e
        if (e.firstElementChild) e = e.firstElementChild;
        else {
            for(e = e.firstChild; e && e.nodeType !== 1; e = e.nextSibling)
            /* пустой цикл */;
        }
        return sibling(e, n); // Вернуть n-го брата первого дочернего элемента
    }
    else { // n - отрицательное: двигаться назад, начиная с последнего
        if (e.lastElementChild) e = e.lastElementChild;
        else {
            for(e = e.lastChild; e && e.nodeType !== 1; e=e.previousSibling)
            /* пустой цикл */;
        }
        return sibling(e, n+1); // +1, чтобы преобразовать номер -1 дочернего
        // в номер 0 братского для последнего
    }
}

/*
    ! Атрибуты
*/

var image = document.getElementById("myimage");
var imgurl = image.src; // Атрибут src определяет URL-адрес изображения
image.id === "myimage" // Потому что поиск элемента выполнялся по id

var f = document.forms[0]; // Первый элемент <form> в документе
f.action = "http://www.example.com/submit.php"; // Установить URL отправки.
f.method = "POST"; // Тип HTTP-запроса

// ! Доступ к нестандартным HTML-атрибутам
var image = document.images[0];
var width = parseInt(image.getAttribute("WIDTH"));
image.setAttribute("class", "thumbnail");

// ! Атрибуты как узлы типа Attr
document.body.attributes[0] // Первый атрибут элемента <body>
document.body.attributes.bgcolor // Атрибут bgcolor элемента <body>
document.body.attributes["ONLOAD"] // Атрибут onload элемента <body>

// ! СОДЕРЖИМОЕ ЭЛЕМЕНТА
var para = document.getElementsByTagName("p")[0]; // Первый <p> в документе
var text = para.textContent; // Текст "This is a simple document."
para.textContent = "Hello World!"; // Изменит содержимое абзаца

// Возвращает простое текстовое содержимое элемента e, выполняя рекурсивный
// обход всех дочерних элементов. Этот метод действует подобно свойству textContent
function textContent(e) {
    var child, type, s = ""; // s хранит текст всех дочерних узлов
    for(child = e.firstChild; child != null; child = child.nextSibling) {
        type = child.nodeType;
        if (type === 3 || type === 4) // Узлы типов Text и CDATASection
            s += child.nodeValue;
        else if (type === 1) // Рекурсивный обход узлов типа Element
            s += textContent(child);
    }
    return s;
}

// Рекурсивно преобразует символы всех текстовых узлов-потомков
// элемента n в верхний регистр.
function upcase(n) {
    if (n.nodeType == 3 || n.nodeTyep == 4) // Если n - объект Text или CDATA
        n.data = n.data.toUpperCase(); // преобразовать в верхний регистр
    else // Иначе рекурсия по дочерним узлам
        for(var i = 0; i < n.childNodes.length; i++)
            upcase(n.childNodes[i]);
}

// ! Создание, вставка и удаление узлов
// Асинхронная загрузка сценария из указанного URL-адреса и его выполнение
function loadasync(url) {
    var head = document.getElementsByTagName("head")[0]; // Отыскать <head>
    var s = document.createElement("script"); // Создать элемент <script>
    s.src = url; // Установить его атрибут src
    head.appendChild(s); // Вставить <script> в <head>
}

// Вставляет узел child в узел parent так, что он становится n-м дочерним узлом
function insertAt(parent, child, n) {
    if (n < 0 || n > parent.childNodes.length)
        throw new Error("недопустимый индекс");
    else if (n == parent.childNodes.length) parent.appendChild(child);
    else parent.insertBefore(child, parent.childNodes[n]);
}

// Сортирует строки в первом элементе <tbody> указанной таблицы по значениям
// n-й ячейки в каждой строке. Использует функцию сравнения, если она указана.
// Иначе сортировка выполняется в алфавитном порядке.
function sortrows(table, n, comparator) {
    var tbody = table.tBodies[0]; // Первый <tbody>; возможно созданный неявно
    var rows = tbody.getElementsByTagName("tr"); // Все строки в tbody
    rows = Array.prototype.slice.call(rows,0); // Скопировать в массив
    // Отсортировать строки по содержимому n-го элемента <td>
    rows.sort(function(row1,row2) {
        var cell1 = row1.getElementsByTagName("td")[n]; // n-е ячейки
        var cell2 = row2.getElementsByTagName("td")[n]; // двух строк
        var val1 = cell1.textContent || cell1.innerText; // текстовое содерж.
        var val2 = cell2.textContent || cell2.innerText; // двух ячеек
        if (comparator) return comparator(val1, val2); // Сравнить!
        if (val1 < val2) return -1;
        else if (val1 > val2) return 1;
        else return 0;
    });
    // Добавить строки в конец tbody в отсортированном порядке.
    // При этом строки автоматически будут удалены из их текущих позиций,
    // благодаря чему отпадает необходимость явно удалять их. Если <tbody> содержит
    // какие-либо другие узлы, отличные от элементов <tr>, эти узлы "всплывут" наверх.
    for(var i = 0; i < rows.length; i++) tbody.appendChild(rows[i]);
}
// Отыскивает в таблице элементы <th> (предполагается, что в таблице существует
// только одна строка с ними) и добавляет в них возможность обработки щелчка мышью,
// чтобы щелчок на заголовке столбца вызывал сортировку таблицы по этому столбцу.
function makeSortable(table) {
    var headers = table.getElementsByTagName("th");
    for(var i = 0; i < headers.length; i++) {
        (function(n) { // Чтобы создать локальную область видимости
            headers[i].onclick = function() { sortrows(table, n); };
        }(i)); // Присвоить значение i локальной переменной n
    }
}

// ! Удаление и замена узлов
n.parentNode.removeChild(n);
n.parentNode.replaceChild(document.createTextNode("[ ИСПРАВЛЕНО ]"), n);

// Замещает узел n новым элементом <b> и делает узел n его дочерним элементом.
function embolden(n) {
    // Если вместо узла получена строка, интерпретировать ее как значение атрибута id элемента
    if (typeof n == "string") n = document.getElementById(n);
    var parent = n.parentNode; // Ссылка на родителя элемента n
    var b = document.createElement("b"); // Создать элемент <b>
    parent.replaceChild(b, n); // Заменить n элементом <b>
    b.appendChild(n); // Сделать n дочерним элементом элемента <b>
}

// ! Использование объектов DocumentFragment
var frag = document.createDocumentFragment();

// Выполняет перестановку дочерних элементов узла n в обратном порядке
function reverse(n) {
    // Создать пустой объект DocumentFragment, который будет играть роль
    // временного контейнера
    var f = document.createDocumentFragment();
    // Выполнить обход дочерних элементов в обратном порядке и переместить каждый
    // из них в объект фрагмента. Последний дочерний элемент узла n станет первым
    // дочерним элементом фрагмента f, и наоборот. Обратите внимание, что при добавлении
    // дочернего элемента в фрагмент f он автоматически удаляется из узла n.
    while(n.lastChild) f.appendChild(n.lastChild);
    // В заключение переместить сразу все дочерние элементы
    // из фрагмента f обратно в узел n.
    n.appendChild(f);
}

// Этот модуль определяет метод Element.insertAdjacentHTML для броузеров,
// не поддерживающих его, а также определяет переносимые функции вставки HTML,
// имеющие более логичные имена, чем имя insertAdjacentHTML:
// Insert.before(), Insert.after(), Insert.atStart(), Insert.atEnd()
var Insert = (function() {
    // Если элементы имеют собственный метод insertAdjacentHTML, использовать
    // его в четырех функциях вставки HTML, имеющих более понятные имена.
    if (document.createElement("div").insertAdjacentHTML) {
        return {
            before: function(e,h) {e.insertAdjacentHTML("beforebegin",h);},
            after: function(e,h) {e.insertAdjacentHTML("afterend",h);},
            atStart: function(e,h) {e.insertAdjacentHTML("afterbegin",h);},
            atEnd: function(e,h) {e.insertAdjacentHTML("beforeend",h);}
        };
    }
    // Иначе, в случае отсутствия стандартного метода insertAdjacentHTML,
    // реализовать те же самые четыре функции вставки и затем использовать их
    // в определении метода insertAdjacentHTML.
    // Сначала необходимо определить вспомогательный метод, который принимает
    // строку с разметкой HTML и возвращает объект DocumentFragment,
    // содержащий разобранное представление этой разметки.
    function fragment(html) {
        var elt = document.createElement("div"); // Пустой элемент
        var frag = document.createDocumentFragment(); // Пустой фрагмент
        elt.innerHTML = html; // Содержимое элемента
        while(elt.firstChild) // Переместить все узлы
            frag.appendChild(elt.firstChild); // из elt в frag
        return frag; // И вернуть frag
    }
    var Insert = {
        before: function(elt, html) {
            elt.parentNode.insertBefore(fragment(html), elt);
        },
        after: function(elt, html) {
            elt.parentNode.insertBefore(fragment(html),elt.nextSibling);
        },
        atStart: function(elt, html) {
            elt.insertBefore(fragment(html), elt.firstChild);
        },
        atEnd: function(elt, html) { elt.appendChild(fragment(html)); }
    };
    // Реализация метода insertAdjacentHTML на основе функций выше
    Element.prototype.insertAdjacentHTML = function(pos, html) {
        switch(pos.toLowerCase()) {
            case "beforebegin": return Insert.before(this, html);
            case "afterend": return Insert.after(this, html);
            case "afterbegin": return Insert.atStart(this, html);
            case "beforeend": return Insert.atEnd(this, html);
        }
    };
    return Insert; // Вернуть четыре функции вставки
}());

/* 
* TOC.js: создает оглавление документа.
*
* Этот модуль регистрирует анонимную функцию, которая вызывается
* автоматически по окончании загрузки документа. Эта функция сначала
* отыскивает элемент документа с атрибутом id="TOC". Если такой элемент
* отсутствует, функция создает его, помещая в начало документа.
*
* Затем функция отыскивает все элементы с <h1> по <h6>, интерпретируя их как
* заголовки разделов и создает оглавление внутри элемента TOC. Функция добавляет
* номера разделов в каждый заголовок и обертывает заголовки именованными
* якорными элементами, благодаря чему оглавление может ссылаться на них.
* Якорным элементам даются имена, начинающиеся с приставки "TOC", поэтому вам следует
* избегать использовать эту приставку в своей разметке HTML.
*
* Оформление элементов оглавления можно реализовать с помощью CSS. Все элементы имеют
* класс "TOCEntry". Кроме того, каждый элемент оглавления имеет класс, соответствующий
* уровню заголовка раздела. Для заголовков, оформленных тегом <h1>, создаются элементы
* оглавления с классом "TOCLevel1",для заголовков <h2> – с классом "TOCLevel2" и т. д.
* Номера разделов, вставляемые в заголовки, получают класс "TOCSectNum".
*
* Этот модуль можно использовать с каскадными таблицами стилей, такими как:
*
* #TOC { border: solid black 1px; margin: 10px; padding: 10px; }
* .TOCEntry { font-family: sans-serif; }
* .TOCEntry a { text-decoration: none; }
* .TOCLevel1 { font-size: 16pt; font-weight: bold; }
* .TOCLevel2 { font-size: 12pt; margin-left: .5in; }
* .TOCSectNum:after { content: ": "; }
*
* Последнее определение генерирует двоеточие и пробел после номера раздела.
* Чтобы скрыть номера разделов, можно использовать следующий стиль:
*
* .TOCSectNum { display: none }
*
* Этот модуль использует вспомогательную функцию onLoad().
*/
onLoad(function() { // Анонимная функция, определяющая локальн. обл. видимости
    // Отыскать контейнерный элемент для оглавления.
    // Если такой элемент отсутствует, создать его в начале документа.
    var toc = document.getElementById("TOC");
    if (!toc) {
        toc = document.createElement("div");
        toc.id = "TOC";
        document.body.insertBefore(toc, document.body.firstChild);
    }
    // Отыскать все элементы заголовков разделов
    var headings;
    if (document.querySelectorAll) // Возможно есть более простой путь?
        headings = document.querySelectorAll("h1,h2,h3,h4,h5,h6");
    else // Иначе отыскать заголовки более сложным способом
        headings = findHeadings(document.body, []);
    // Выполняет рекурсивный обход тела документа в поисках заголовков
    function findHeadings(root, sects) {
        for(var c = root.firstChild; c != null; c = c.nextSibling) {
            if (c.nodeType !== 1) continue;
            if (c.tagName.length == 2 && c.tagName.charAt(0) == "H")
                sects.push(c);
            else
                findHeadings(c, sects);
        }
        return sects;
    }
    // Инициализировать массив, хранящий номера разделов.
    var sectionNumbers = [0,0,0,0,0,0];
    // Выполнить цикл по найденным элементам заголовков.
    for(var h = 0; h < headings.length; h++) {
        var heading = headings[h];
        // Пропустить заголовки, находящиеся в контейнере оглавления.
        if (heading.parentNode == toc) continue;
        // Определить уровень заголовка.
        var level = parseInt(heading.tagName.charAt(1));
        if (isNaN(level) || level < 1 || level > 6) continue;
        // Увеличить номер раздела для этого уровня и установить
        // номера разделов более низкого уровня равными нулю.
        sectionNumbers[level-1]++;
        for(var i = level; i < 6; i++) sectionNumbers[i] = 0;
        // Объединить номера разделов всех уровней,
        // чтобы получился номер вида 2.3.1.
        var sectionNumber = sectionNumbers.slice(0,level).join(".")
        // Добавить номер раздела в заголовок. Номер помещается в элемент <span>,
        // чтобы его можно было стилизовать с помощью CSS.
        var span = document.createElement("span");
        span.className = "TOCSectNum";
        span.innerHTML = sectionNumber;
        heading.insertBefore(span, heading.firstChild);
        // Обернуть заголовок якорным элементом, чтобы можно было
        // сконструировать ссылку на него.
        var anchor = document.createElement("a");
        anchor.name = "TOC"+sectionNumber;
        heading.parentNode.insertBefore(anchor, heading);
        anchor.appendChild(heading);
        // Создать ссылку на этот раздел.
        var link = document.createElement("a");
        link.href = "#TOC" + sectionNumber; // Адрес назначения ссылки
        link.innerHTML = heading.innerHTML; // Текст ссылки совпадает с текстом заголовка
        // Поместить ссылку в элемент div, чтобы обеспечить возможность стилизации в зависимости от уровня.
        var entry = document.createElement("div");
        entry.className = "TOCEntry TOCLevel" + level;
        entry.appendChild(link);
        // И добавить элемент div в контейнер оглавления.
        toc.appendChild(entry);
    }
});

/*
    ! Геометрия документа и элементов и прокрутка
*/

// Возвращает текущие позиции полос прокрутки в виде свойств x и y объекта
function getScrollOffsets(w) {
    // Использовать указанное окно или текущее,
    // если функция вызвана без аргумента
    w = w || window;
    // Следующий способ работает во всех броузерах, кроме IE версии 8 и ниже
    if (w.pageXOffset != null) return {x: w.pageXOffset, y:w.pageYOffset};
    // Для IE (и других броузеров) в стандартном режиме
    var d = w.document;
    if (document.compatMode == "CSS1Compat")
        return {x:d.documentElement.scrollLeft,
    y:d.documentElement.scrollTop};
    // Для броузеров в режиме совместимости
    return { x: d.body.scrollLeft, y: d.body.scrollTop };
}

// Возвращает размеры видимой области в виде свойств w и h объекта
function getViewportSize(w) {
    // Использовать указанное окно или текущее, если функция вызвана без аргумента
    w = w || window;
    // Следующий способ работает во всех броузерах, кроме IE версии 8 и ниже
    if (w.innerWidth != null) return {w: w.innerWidth, h:w.innerHeight};
    // Для IE (и других броузеров) в стандартном режиме
    var d = w.document;
    if (document.compatMode == "CSS1Compat")
        return { w: d.documentElement.clientWidth,
    h: d.documentElement.clientHeight };
    // Для броузеров в режиме совместимости
    return { w: d.body.clientWidth, h: d.body.clientWidth };
}

var box = e.getBoundingClientRect(); // Координаты в видимой области
var offsets = getScrollOffsets(); // Вспомогат. функция, объявленная выше
var x = box.left + offsets.x; // Перейти к координатам документа
var y = box.top + offsets.y;

// ! Прокрутка
// Прокручивает документ на 10 пикселов каждые 200 мсек.
// Учтите, что этот букмарклет нельзя отключить после запуска!
JavaScript: void setInterval(function() {scrollBy(0,10)}, 200);

function getElementPos(elt) {
    var x = 0, y = 0;
    // Цикл, накапливающий смещения
    for(var e = elt; e != null; e = e.offsetParent) {
        x += e.offsetLeft;
        y += e.offsetTop;
    }
    // Еще раз обойти все элементы-предки, чтобы вычесть смещения прокрутки.
    // Он также вычтет позиции главных полос прокрутки и преобразует
    // значения в координаты видимой области.
    for(var e=elt.parentNode; e != null && e.nodeType == 1; e=e.parentNode) {
        x -= e.scrollLeft;
        y -= e.scrollTop;
    }
    return {x:x, y:y};
}

/*
     ! HTML Формы
*/

var fields = document.getElementById("address").getElementsByTagName("input");
// Все радиокнопки в форме с атрибутом id="shipping"
document.querySelectorAll('#shipping input[type="radio"]');
// Все радиокнопки с атрибутом name="method" в форме с атрибутом id="shipping"
document.querySelectorAll('#shipping input[type="radio"][name="method"]');

// Элемент <form> с атрибутом name="address" можно выбрать любым из следующих способов:
window.address // Ненадежный: старайтесь не использовать
document.address // Может применяться только к формам с атрибутом name
document.forms.address // Явное обращение к форме с атрибутом name или id
document.forms[n] // Ненадежный: n - порядковый номер формы

document.forms.address.elements[0]
document.forms.address.elements.street

// <form name="shipping">
//     <fieldset>
//         <legend>Shipping Method</legend>
//         <label><input type="radio" name="method" value="1st">Первым классом</label>
//         <label><input type="radio" name="method" value="2day">За 2 дня самолетом</label>
//         <label><input type="radio" name="method" value="overnite">В течение ночи</label>
//     </fieldset>
// </form>
var methods = document.forms.shipping.elements.method;

var shipping_method;
for(var i = 0; i < methods.length; i++)
    if (methods[i].checked) shipping_method = methods[i].value;

// <form...
//     onreset="return confirm('Вы действительно хотите сбросить все и начать сначала?')">
//     ...
//     <button type="reset">Очистить поля ввода и начать сначала</button>
// </form>

// Создать новый объект Option
var zaire = new Option("Zaire", // Свойство text
    "zaire", // Свойство value
    false, // Свойство defaultSelected
    false); // Свойство selected
// Отобразить вариант в элементе Select, добавив его в конец массива options:
var countries = document.address.country; // Получить объект Select
countries.options[countries.options.length] = zaire;

/*
    ! Другие особенности документов
*/

if (document.referrer.indexOf("http://www.google.com/search?") == 0) {
    var args = document.referrer.substring(ref.indexOf("?")+1).split("&");
    for(var i = 0; i < args.length; i++) {
        if (args[i].substring(0,2) == "q=") {
            document.write("<p>Добро пожаловать, пользователь Google. ");
            document.write("Вы искали: " + unescape(args[i].substring(2)).replace('+', ' '));
            break;
        }
    }
}

// ! Получение выделенного текста
function getSelectedText() {
    if (window.getSelection) // Функция, определяемая стандартом HTML5
        return window.getSelection().toString();
    else if (document.selection) // Прием, характерный для IE.
        return document.selection.createRange().text;
}

// // Если поместить в закладку эту ссылку и URL-адрес со спецификатором javascript:, закладка превратится в букмарклет:
// <a href="javascript: var q; if (window.getSelection) q = window.getSelection().toString();
// else if (document.selection) q = document.selection.createRange().text;
// void window.open('http://ru.wikipedia.org/wiki/' + q);"> Поиск выделенного текста в Википедии </a>

// <div id="editor" contenteditable> Щелкните здесь, чтобы отредактировать </div>

/*

<iframe id="editor" src="about:blank"></iframe> // Пустой фрейм
<script>
    onLoad(function() { // После загрузки
        var editor = document.getElementById("editor"); // найти фрейм документа
        editor.contentDocument.designMode = "on"; // и включить режим редактирования.
    }); 
</script>

*/

function bold() { document.execCommand("bold", false, null); }
function link() {
    var url = prompt("Введите адрес гиперссылки");
    if (url) document.execCommand("createlink", false, url);
}

