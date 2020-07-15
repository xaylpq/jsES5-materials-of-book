// Метод синхронного получения файловой системы. Принимает параметры,
// определяющие срок существования файловой системы и ее размер.
// Возвращает объект файловой системы или возбуждает исключение.
var fs = requestFileSystemSync(PERSISTENT, 1024*1024);
// Асинхронная версия принимает функции обратного вызова для обработки
// успешного или неудачного создания файловой системы
requestFileSystem(TEMPORARY, // срок существования
    50*1024*1024, // размер: 50 Мбайт
    function(fs) { // будет вызвана с объектом файловой системы
        // Здесь используется объект fs
    },
    function(e) { // будет вызвана с объектом ошибки
        console.log(e); // Или как-то иначе обработать ошибку
    });

// Читает текстовый файл "hello.txt" и выводит его содержимое. При использовании
// асинхронного прикладного интерфейса глубина вложенности  функций достигает
// четырех уровней. Этот пример не включает определения функций обработки ошибок.
requestFileSystem(PERSISTENT, 10*1024*1024, function(fs) { // Получить объект ФС
    fs.root.getFile("hello.txt", {}, function(entry) { // Получить FileEntry
        entry.file(function(file) { // Получить File
            var reader = new FileReader();
            reader.readAsText(file);
            reader.onload = function() { // Получить содержимое файла
                console.log(reader.result);
            };
        });
    });
});

// ! Использование асинхронного прикладного интерфейса доступа к файловой системе

// Многие асинхронные функции, используемые здесь, принимают  необязательные функции
// обратного вызова для обработки  ошибок.
// Следующая функция просто выводит сообщение об ошибке.
function logerr(e) { console.log(e); }
// requestFileSystem() возвращает локальную файловую  систему, доступную
// только приложениям с указанным происхождением. Приложение может  читать
// и писать файлы в ней, но не может получить  доступ к остальной файловой системе.
var filesystem; // Предполагается, что эта переменная будет инициализирована 
// перед вызовом функции, объявленной  ниже.
requestFileSystem(PERSISTENT, // Или TEMPORARY для кэширования файлов
    10*1024*1024, // Требуется 10 Мбайт
    function(fs) { // После выполнения вызвать эту функцию 
        filesystem = fs; // Просто сохранить ссылку на файловую систему
    }, // в глобальной переменной. 
    logerr); // Вызвать эту функцию в случае ошибки
// Читает содержимое указанного файла как текст и передает его функции обратного вызова.
function readTextFile(path, callback) {
    // Вызвать getFile(), чтобы получить объект FileEntry для файла
    // с указанным именем
    filesystem.root.getFile(path, {}, function(entry) {
        // При вызове этой функции передается объект FileEntry, соответствующий файлу.
        // Теперь следует вызвать метод FileEntry.file(), чтобы получить объект File
        entry.file(function(file) { // Вызвать с объектом File
            var reader = new FileReader(); // Создать объект FileReader
            reader.readAsText(file); // И прочитать файл
            reader.onload = function() { // В случае успешного чтения
                callback(reader.result); // Передать данные функции callback
            }
            reader.onerror = logerr; // Сообщить об ошибке в readAsText()
        }, logerr); // Сообщить об ошибке в file()
    },
    logerr); // Сообщить об ошибке в getFile()
}
// Добавляет указанное содержимое в конец файла с указанным именем, создает новый файл,
// если файл с указанным именем не существует. Вызывает callback по завершении операции.
function appendToFile(path, contents, callback) {
    // filesystem.root - это корневой каталог.
    filesystem.root.getFile( // Получить объект FileEntry
    path, // Имя и путь к требуемому файлу 
    {create:true}, // Создать, если не существует
    function(entry) { // Вызвать эту функцию, когда файл будет найден
        entry.createWriter( // Создать для файла объект FileWriter
            function(writer) { // Вызвать эту функцию  после создания
                // По умолчанию запись производится в начало файла.
                // Нам же требуется выполнить запись в конец файла
                writer.seek(writer.length); // Переместиться в конец файла
                // Преобразовать содержимое файла в объект Blob. Аргумент contents
                // может быть строкой, объектом Blob или объектом ArrayBuffer.
                var bb = new BlobBuilder() 
                bb.append(contents);
                var blob = bb.getBlob();
                // Записать двоичный объект в файл
                writer.write(blob);
                writer.onerror = logerr; // Сообщить об ошибке в write()
                if (callback) // Если указана функция callback
                    writer.onwrite = callback; // вызвать в случае успеха
            },
        logerr); // Сообщить об ошибке в createWriter()
    },
    logerr); // Сообщить об ошибке в getFile()
}
// Удаляет файл с указанным именем, вызывает callback по завершении операции.
function deleteFile(name, callback) {
    filesystem.root.getFile(name, {}, // Получить FileEntry по имени файла
    function(entry) { // Передать FileEntry сюда 
        entry.remove(callback, // Удалить файл
        logerr); // Или сообщить
    }, // об ошибке в remove()
    logerr); // Сообщить об ошибке в getFile()
}
// Создает новый каталог с указанным именем
function makeDirectory(name, callback) {
    filesystem.root.getDirectory(name, // Имя создаваемого каталога
        { // Параметры
            create: true, // Создать, если не сущ.
            exclusive:true // Ошибка, если существует
        },
        callback, // Вызвать по завершении
    logerr); // Выводить любые ошибки
}
// Читает содержимое указанного каталога и передает  его в виде массива строк
// указанной функции callback
function listFiles(path, callback) {
    // Если каталог не указан, получить содержимое корневого каталога. 
    // Иначе отыскать каталог  с указанным именем и вернуть список
    // с его содержимым (или сообщить об ошибке поиска).
    if (!path) getFiles(filesystem.root);
    else filesystem.root.getDirectory(path, {}, getFiles, logerr);
    function getFiles(dir) { // Эта функция используется  выше
        var reader = dir.createReader(); // Объект DirectoryReader
        var list = []; // Для сохранения имен файлов
        reader.readEntries(handleEntries, // Передать функции ниже
        logerr); // или сообщить об ошибке. 
        // Чтение каталогов может превратиться в многоэтапный процесс.
        // Необходимо сохранять результаты вызовов readEntries(), пока не будет
        // получен пустой массив. На этом операция будет закончена,
        // и полный список можно будет передать функции callback.
        function handleEntries(entries) {
            if (entries.length == 0) callback(list); // Операция закончена
            else {
            // Иначе добавить эти записи в общий список и запросить
            // очередную порцию. Объект, подобный массиву, содержит
            // объекты FileEntry, и нам следует получить имя для каждого.
            for(var i = 0; i < entries.length; i++) {
                var name = entries[i].name; // Получить имя записи
                if (entries[i].isDirectory) name += "/"; // Пометить каталоги
                list.push(name); // Добавить в список
            }
            // Получить следующую порцию записей
            reader.readEntries(handleEntries, logerr);
            }
        }
    }
}


// Утилиты для работы с файловой системой, использующие синхронный прикладной
// интерфейс, предназначенный для фоновых потоков выполнения
var filesystem = requestFileSystemSync(PERSISTENT, 10*1024*1024);
function readTextFile(name) {
    // Получить объект File из объекта FileEntry из корневого DirectoryEntry
    var file = filesystem.root.getFile(name).file();
    // Использовать для чтения синхронную версию FileReader
    return new FileReaderSync().readAsText(file);
}
function appendToFile(name, contents) {
    // Получить FileWriter из FileEntry из корневого DirectoryEntry
    var writer = filesystem.root.getFile(name, {create:true}).createWriter();
    writer.seek(writer.length); // Начать запись с конца файла
    var bb = new BlobBuilder() // Собрать содержимое в виде объекта Blob
    bb.append(contents);
    writer.write(bb.getBlob()); // Записать двоичный объект в файл
}
function deleteFile(name) {
    filesystem.root.getFile(name).remove();
}
function makeDirectory(name) {
    filesystem.root.getDirectory(name, { create: true, exclusive:true });
}
function listFiles(path) {
    var dir = filesystem.root;
    if (path) dir = dir.getDirectory(path);
    var lister = dir.createReader();
    var list = [];
    do {
        var entries = lister.readEntries();
        for(var i = 0; i < entries.length; i++) {
            var name = entries[i].name;
            if (entries[i].isDirectory) name += "/";
            list.push(name);
        }
    } while(entries.length > 0);
    return list;
}
// Разрешить основному потоку выполнения использовать эти утилиты, посылая сообщения
onmessage = function(e) {
    // Сообщение должно быть объектом:
    // { function: "appendToFile", args: ["test", "testing, testing"]}
    // Вызвать указанную функцию с указанными аргументами и послать сообщение обратно
    var f = self[e.data.function];
    var result = f.apply(null, e.data.args);
    postMessage(result);
};

