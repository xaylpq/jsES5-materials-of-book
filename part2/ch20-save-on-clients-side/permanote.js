// Некоторые необходимые переменные
var editor, statusline, savebutton, idletimer;
// При первой загрузке приложения
window.onload = function() {
    // Инициализировать локальное хранилище, если это первый запуск
    if (localStorage.note == null) localStorage.note = "";
    if (localStorage.lastModified == null) localStorage.lastModified = 0;
    if (localStorage.lastSaved == null) localStorage.lastSaved = 0;
    // Отыскать элементы, которые составляют  пользовательский интерфейс редактора.
    // Инициализировать глобальные переменные. 
    editor = document.getElementById("editor");
    statusline = document.getElementById("statusline");
    savebutton = document.getElementById("savebutton");
    editor.value = localStorage.note; // Восстановить сохраненную заметку
    editor.disabled = true; // Но запретить редактирование до синхр.
    // При вводе нового текста в элемент textarea
    editor.addEventListener("input",
    function (e) {
        // Сохранить новую заметку в localStorage
        localStorage.note = editor.value;
        localStorage.lastModified = Date.now();
        // Переустановить таймер ожидания
        if (idletimer) clearTimeout(idletimer);
        idletimer = setTimeout(save, 5000);
        // Разрешить кнопку сохранения 
        savebutton.disabled = false;
    },
    false);
    // При каждой загрузке приложения пытаться синхронизироваться с сервером
    sync();
};

// Сохраняет заметку на сервере перед  уходом со страницы
window.onbeforeunload = function() {
    if (localStorage.lastModified > localStorage.lastSaved)
save();
};
// Сообщить пользователю перед переходом  в автономный режим
window.onoffline = function() { status("Автономный режим"); }
// При подключении к сети выполнить синхронизацию. 
window.ononline = function() { sync(); };
// Сообщить пользователю, если  доступна новая версия приложения. 
// Здесь можно было  бы выполнить перезагрузку принудительно, вызвав 
// метод location.reload() 
window.applicationCache.onupdateready = function() {
    status("Доступна новая версия приложения. " + "Чтобы использовать ее, необходимо перезагрузить приложение ");
};
// Также сообщить пользователю,  если он использует последнюю версию приложения.
window.applicationCache.onnoupdate = function() {
    status("Вы используете последнюю версию  приложения.");
};
// Функция отображения сообщения в строке состояния 
function status(msg) { statusline.innerHTML = msg; }
// Выгружает текст заметки на сервер  (если сеть подключена). 
// Автоматически вызывается через  5 секунд простоя после изменения текста заметки.
function save() {
    if (idletimer) clearTimeout(idletimer);
    idletimer = null;
    if (navigator.onLine) {
        var xhr = new XMLHttpRequest();
        xhr.open("PUT", "/note");
        xhr.send(editor.value);
        xhr.onload = function() {
            localStorage.lastSaved = Date.now();
            savebutton.disabled = true;
        };
    }
}
// Проверяет наличие новой  версии заметки на сервере. Если она отсутствует,
// сохраняет текущую версию на сервере.
function sync() {
    if (navigator.onLine) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/note");
        xhr.send();
        xhr.onload = function() {
            var remoteModTime = 0;
            if (xhr.status == 200) {
                var remoteModTime = xhr.getResponseHeader("Last-Modified");
                remoteModTime = new Date(remoteModTime).getTime();
            }
            if (remoteModTime > localStorage.lastModified) {
                status("На сервере найдена более новая заметка.");
                var useit = confirm("На сервере имеется более новая версия\n" + "заметки. Щелкните на кнопке Ok, чтобы\n" + "использовать эту версию, или на  нопке\n"+ "Отмена, чтобы продолжить редактировать\n"+ "текущую версию и затереть версию на сервере ");
                var now = Date.now();
                if (useit) {
                editor.value = localStorage.note = xhr.responseText;
                localStorage.lastSaved = now;
                status("Загружена более новая версия.");
                }
                else
                status("Игнорируется более новая версия заметки.");
                localStorage.lastModified = now;
            }
            else status("Редактируется последняя версия заметки.");
            if (localStorage.lastModified > localStorage.lastSaved) { save(); }
            editor.disabled = false; // Разрешить доступ к редактору 
            editor.focus(); // И поместить в него курсор ввода
        }
    }
    else { // В автономном режиме мы не можем синхронизироваться
        status("Невозможно синхронизироваться в автономном режиме");
        editor.disabled = false;
        editor.focus();
    }
}
