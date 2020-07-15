var pattern = /s$/;
var pattern = new RegExp("s$");
"JavaScript".search(/script/i);

// Независимо от регистра символов заменяем словом в нужном регистре
text.replace(/JavaScript/gi, "JavaScript");

// Цитата – это кавычка, за которой следует любое число символов, отличных от кавычек
// (их мы запоминаем), за этими символами следует еще одна кавычка.
var quote = /"([^"]*)"/g;
// Заменяем прямые кавычки типографскими и оставляем без изменений
// содержимое цитаты, хранящееся в $1.
text.replace(quote, "«$1»");

"1 плюс 2 равно 3".match(/\d+/g) // вернет ["1", "2", "3"]

var url = /(\w+):\/\/([\w.]+)\/(\S*)/;
var text = "Посетите мою домашнюю страницу http://www.example.com/~david";
var result = text.match(url);
if (result != null) {
    var fullurl = result[0]; // Содержит "http://www.example.com/~david"
    var protocol = result[1]; // Содержит "http"
    var host = result[2]; // Содержит "www.example.com"
    var path = result[3]; // Содержит "~david"
}

"123,456,789".split(","); // Вернет ["123","456","789"]

"1, 2, 3 , 4 ,5".split(/\s*,\s*/); // Вернет ["1","2","3","4","5"]

// Находит все пятизначные числа в строке. Обратите внимание
// на использование в этом примере символов \\
var zipcode = new RegExp("\\d{5}", "g");

var pattern = /Java/g;
var text = "JavaScript – это более забавная штука, чем Java!";
var result;
while((result = pattern.exec(text)) != null) {
    alert("Найдено `" + result[0] + "'" + " в позиции " + result.index + "; следующий поиск начнется с " + pattern.lastIndex);
}

var pattern = /java/i;
pattern.test("JavaScript");
// Вернет true

