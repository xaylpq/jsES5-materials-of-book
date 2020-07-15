// Установить значение свойства для переход на новую веб-страницу
//window.location = "http://www.oreilly.com/";

// Ждать 2 секунды и вывести диалог с приветствием
setTimeout(function() { alert("Привет, Мир!"); }, 2000);

// Отыскать элемент с атрибутом id="timestamp"
var timestamp = document.getElementById("timestamp");

// Если элемент пуст, вставить в него текущую дату и время
if (timestamp.firstChild == null)
    timestamp.appendChild(document.createTextNode(new Date().toString()));

// Явно изменить представление элемента заголовка
timestamp.style.backgroundColor = "yellow";
// Или просто изменить класс и позволить определять особенности
// визуального представления с помощью каскадных таблиц стилей:
timestamp.className = "highlight";

// Обновить содержимое элемента timestamp, когда пользователь щелкнет на нем
timestamp.onclick = function() { this.innerHTML = new Date().toString(); }

