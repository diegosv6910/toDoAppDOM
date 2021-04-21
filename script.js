// Creamos las etiquetas que se agregarán dinámicamente.
var link1 = document.createElement('link'), link2 = document.createElement('link'),
    link3 = document.createElement('link'), link4 = document.createElement('link'),
    link5 = document.createElement('link'), footer = document.createElement('footer'),
    div1 = document.createElement('div'), div2 = document.createElement('div'),
    div3 = document.createElement('div'), div4 = document.createElement('div'),
    div5 = document.createElement('div'), h4 = document.createElement('h4'),
    object1 = document.createElement('object'), object2 = document.createElement('object'),
    i1 = document.createElement('i'), i2 = document.createElement('i');

// Agregamos los atributos a las etiquetas.
link1.setAttribute('rel', 'stylesheet')
link1.setAttribute('rel', 'stylesheet');
link1.setAttribute('href', 'style.css');
link2.setAttribute('rel', 'shortcut icon');
link2.setAttribute('typerel', 'image/x-icon');
link2.setAttribute('href', 'https://app.bedu.org/favicon.ico');
link3.setAttribute('rel', 'stylesheet');
link3.setAttribute('href', 'https://fonts.googleapis.com/css?family=Nunito:400,700');
link4.setAttribute('rel', 'stylesheet prefetch');
link4.setAttribute('href', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css');
link5.setAttribute('rel', 'stylesheet prefetch');
link5.setAttribute('href', 'https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css');
div1.setAttribute('class', 'container');
div2.setAttribute('class', 'today');
div3.setAttribute('class', 'row');
div4.setAttribute('class', 'logo');
div5.setAttribute('class', 'col-md-4 col-md-offset-4 col-xs-6 col-xs-offset-3');
div5.setAttribute('id', 'app');
object1.setAttribute('data', 'logo-bedu.svg');
object1.setAttribute('width', '149');
object1.setAttribute('height', '40');
object2.setAttribute('data', 'check.svg');
object2.setAttribute('width', '100');
object2.setAttribute('height', '100');
i1.setAttribute('class', 'fa fa-warning');
i2.setAttribute('class', 'fa fa-ban');
h4.innerHTML = "Hecho con ❤️ por el <b>equipo 5.</b><p></p>¡Agradecimientos a BEDU, Desarrollo WEB | Santander Universidades!<h1>🚀</h1>";

// Agregamos la etiquetas a los elementos del DOM.
document.head.append(link1, link2, link3, link4, link5);
div1.append(div2, div3);
div3.append(div5);
div4.append(object1, object2);
document.body.append(div4, div1);
footer.append(h4);
document.documentElement.append(footer);

// Empiezo creando un arreglo de objetos donde almacenare las tareas por hacer.
// La informacion de cada objeto sera: Tarea y Status, Finalizada y Eliminar.
// Todos son Strings aunque en un futuro Finalizada y Eliminar se convertiran en botones.
var data = [
    { Tarea: "", Status: "", Finalizada: "", Eliminar: "" }
];

//Funcion que crea la tabla con la informacion que existe en data.
//Como tal esta funcion no dibuja una tabla solo crea los elementos HTML para poder ser dibujada.
function buildTable(data) {
    //Vamos a crear un elemento html "table" y lo almacenaramos en una funcion table.
    var table = document.createElement("table");
    //Agregamos la tabla de Boostrap.
    table.setAttribute('class', 'table');
    //En la variable fields vamos a almacenar los Keys de data (Tarea, Status, Finalizada, Eliminar).
    var fields = Object.keys(data[0]);
    //Creamos una variable headRow donde le asignaremos un elemento HTML tr
    var headRow = document.createElement("tr");
    //Vamos a recorrer en un ciclo todos los elementos que esten en fields y los almacenaremos en una variable field.
    fields.forEach(function(field) {
        //Vamos a crear una celda TH en la variable headCell
        var headCell = document.createElement("th");
        headCell.setAttribute('scope', 'col');
        //A la celda le asisgnaremos un textNode con la informacion que tenga field (Tarea, Status, Finalizada, Eliminar);
        headCell.appendChild(document.createTextNode(field));
        //A headRow le asignaremos un nodo hijo con la informacion de headCell
        headRow.appendChild(headCell);
    });

    //Finalmente a table le asignaremos un nodo hijo que sera headRow y con esto crearemos la primer parte de la tabla.
    //La parte donde vienen los nombres de las variables (Tarea, Status, Finalizada, Eliminar)
    table.appendChild(headRow);

    //Recorreremos cada elemento que hay dentro de data que son objetos en este caso y le pondremos un index
    //para saber en que elemento estamos.
    data.forEach(function(object, index) {
        //Crearemos una variable row que sea igual a un elemento HTML tr
        var row = document.createElement("tr");
        //En la variable fields vamos a almacenar los Keys de data (Tarea, Status, Finalizada, Eliminar).
        fields.forEach(function(field) {
            if (field == undefined) {
                field = "vacio";
            }
            //Crearemos una variable cell que sea igual a un elemento HTML td
            var cell = document.createElement("td");
            //Vamos a verificar que si el valor de alguna celda es igual a "En Progreso" entonces reemplazaremos
            //Ese String y lo convertiremos a un boton
            if (object[field] === "En Progreso" && object[field] !== undefined) {
                //Creamos una variable completeButton que sea igual a un nodoHijo de cell que contenga un elemento
                //HTML de tipo Input
                //Con esto sustituimos en cell el texto que tenia por un Input.
                var completeButton = cell.appendChild(document.createElement("input"));
                completeButton.setAttribute('class', 'button2');
                //A completeButton le asiganmos los atributos type = submit para el formato como boton y el value
                //= a Completar.
                completeButton.type = "submit", completeButton.value = "Completar";
                //Ponemos el boton dentro de la celda.
                row.appendChild(cell);
                //Le agregamos un eventListener que se active al click del boton y que llame a la funcion updateRegister
                //y le envie el nombre de la tarea que tenga ese boton asignado.
                completeButton.addEventListener("click", function() {
                    updateRegister(object[fields[0]]);
                });
                //Vamos a verificar que si el valor de alguna celda es igual a "Eliminar" entonces reemplazaremos
                //Ese String y lo convertiremos a un boton
            } else if (object[field] === "Eliminar" && object[field] != undefined) {
                //Creamos una variable completeButton que sea igual a un nodoHijo de cell que contenga un elemento
                //HTML de tipo Input
                //Con esto sustituimos en cell el texto que tenia por un Input.
                var completeButton = cell.appendChild(document.createElement("input"));
                completeButton.setAttribute('class', 'button2');
                //A completeButton le asiganmos los atributos type = submit para el formato como boton y el value
                //= a Completar.
                completeButton.type = "submit", completeButton.value = "Eliminar";
                //Ponemos el boton dentro de la celda.
                row.appendChild(cell);
                //Le agregamos un eventListener que se active al click del boton y que llame a la funcion deleteRegister
                //y le envie el nombre de la tarea que tenga ese boton asignado.
                completeButton.addEventListener("click", function() {
                    console.log(object[fields[0]]);
                    deleteRegister(object[fields[0]], "Finalizada");
                });
            } else if (object[field] != undefined) {
                //Si no se cumple ninguna condicion anterior unicamente insertaremos el texto con la informacion.
                //No se crearan ningun boton.
                cell.appendChild(document.createTextNode(object[field]));
                row.appendChild(cell);
            }
        });
        //Finalmente a tabla le asiganeremos otro nodoHijo que contenga toda la informacion de row.
        table.appendChild(row);
    });
    //Retornamos la tabla creada.
    return table;
}

//En esta funcion  creamos los nuevos registros.
//Se crea un objeto con la informacion que tienen los objetos de data.
//Tarea va a tener el valor que contenga el textArea, el Status lo pondremos como
//Pendiente, Finalizada sera igual a "En Progreso" y Eliminar sera igual a "Eliminar"
//Los elementos Finalizada y Eliminar seran botones en un futuro las Strings asignadas son solo para control.
function newRegister() {
    var newRegister = {
        Tarea: textArea.value,
        Status: "❌",
        Finalizada: "En Progreso",
        Eliminar: "Eliminar",
    };
    //Enviaremos a data un nuevo objeto que es el creado newRegister.
    data.push(newRegister);
    //Llamamos a la funcion para dibujar la tabla.
    drawTable(data);
    //Una vez ingresado el registro, limpiamos el textArea.
    textArea.value = "";
}

//Funcion para crear el input para poner el nombre de la tarea
function toDoText() {
    var textArea = document.createElement("input");
    textArea.setAttribute('type', 'text');
    textArea.setAttribute('class', 'form-control');
    textArea.setAttribute('placeholder', '✍️ Agregar tarea...');
    return textArea;
}

//Funcion para crear el boton para ingresar la nueva tarea
function toDoButton() {
    var submitButton = document.createElement("input");
    submitButton.setAttribute('class', 'button');
    submitButton.type = "submit", submitButton.value = "Subir Tarea";
    return submitButton;
}

//Creamos un nodo llamado app que es el div que tenemos en el HTML.
var app = document.getElementById("app");
//Creamos un hijo al nodo app para dibujar el textArea para ingresar una tarea.
var textArea = app.appendChild(toDoText());
//Creamos un hijo al nodo app para dibujar un boton para ingresar una tarea.
var toDoButton = app.appendChild(toDoButton());

//Registro de tareas;
toDoButton.addEventListener("click", () => {
    if (textArea.value === "") {
        alert("¡Debes ingresar nombre de la tarea!");
    } else {
        newRegister();
    }
});


//Cuando abre la pagina dibuja la tabla.
window.onload = function() {
    var div9 = document.createElement('div'), div10 = document.createElement('div');
    div9.setAttribute('class', 'panel panel-default');
    div10.setAttribute('class', 'panel-heading');
    div10.innerHTML = "Estas son tus tareas:";
    div10.append(div9, buildTable(data));
    app.appendChild(div10);
}

//Funcion que dibuja las tablas.
function drawTable(data) {
    var div9 = document.createElement('div'), div10 = document.createElement('div');
    div9.setAttribute('class', 'panel panel-default');
    div10.setAttribute('class', 'panel-heading');
    div10.innerHTML = "Estas son tus tareas:";
    div10.append(div9, buildTable(data));
    //Le ponemos un hijo a app que dibuje una tabla con la informacion de data.
    app.appendChild(div10);
    //Condicional que sirve para eliminar la tabla original y reemplazarla por la nueva.
    //Hasta este momento app tiene 4 hijos, el text area, el boton, la tabla original y la nueva tabla.
    //Con esta condicional eliminamos el hijo[2] que es la tabla original de otra manera, se seguirian
    //viendo las tablas originales por encima.
    if (app.childNodes.length > 0) {
        app.removeChild(app.childNodes[2]);
    }
}

function deleteRegister(name) {
    //En la variable fields vamos a almacenar los Keys de data (Tarea, Status, Finalizada, Eliminar).
    var fields = Object.keys(data[0]);
    //Recorreremos cada elemento que hay dentro de data que son objetos en este caso y le pondremos un index
    //para saber en que elemento estamos.
    data.forEach(function(object, index) {
        //Ahora dentro del bucle anterior, recorreremos todas las keys de los objetos e iremos almacenando
        //los valores en una variable llamada field.
        fields.forEach(function(field) {
            //Aplicaremos una condicional en la que si, dentro de los objetos del arreglo en el campo field
            //hay una tarea con el mismo nombre que el buscado entonces lo eliminaremos. 
            //En esta condicional tambien tenemos que considerar otro factor, si nosotros ya finalizamos
            //un registro, entonces el arreglo ya va a tener campos undefined porque, los campos sustituidos
            //por los completados se quedaran sin definir. Por eso hay que poner una segunda condicion en la
            //que unicamente valide los datos que sean distintos a undefined.
            if (object[field] === name && object[field] != undefined) {
                //Crearemos un nuevo arreglo donde le almacenaremos el valor de data.
                var newTodos = [...this.data];
                //Luego en el nuevo arreglo newTodos en su campo Index recordando que Index viene de la primera iteracion
                //y nos indica en que elemento del arreglo estamos, lo vamos a igualar a el mismo y pondremos todos
                //sus valores en null.
                newTodos[index] = {...newTodos[index], Tarea: null, Status: null, Finalizada: null, Eliminar: null }
                    //Luego de hacer la copia simplemente a data le vamos a asignar el arreglo sustituido.
                data = newTodos;
            }
        })
    })
    //Llamamos a la funcion para dibujar la tabla.
    drawTable(data);
}
//Funcion para actualizar un valor dentro del arreglo data.
//Recibe un parametro con el nombre name que es el nombre de la tarea que queremos actualizar. 
function updateRegister(name) {
    //En la variable fields vamos a almacenar los Keys de data (Tarea, Status, Finalizada, Eliminar).
    var fields = Object.keys(data[0]);
    //Recorreremos cada elemento que hay dentro de data que son objetos en este caso y le pondremos un index
    //para saber en que elemento estamos.
    data.forEach(function(object, index) {
        //Ahora dentro del bucle anterior, recorreremos todas las keys de los objetos e iremos almacenando
        //los valores en una variable llamada field.
        fields.forEach(function(field) {
            //Aplicaremos una condicional en la que si, dentro de los objetos del arreglo en el campo field
            //hay una tarea con el mismo nombre que el buscado entonces lo sustituiremos.
            if (object[field] === name) {
                //Vamos a crear una varibale newTodos en la que almacenaremos data.
                var newTodos = [...this.data];
                //Luego en el nuevo arreglo newTodos en su campo Index recordando que Index viene de la primera iteracion
                //y nos indica en que elemento del arreglo estamos, lo vamos a igualar a el mismo pero reemplazando el valor
                //de Status por Finalizada.
                newTodos[index] = {...newTodos[index], Tarea: name, Status: "✔️" }
                    //Luego de hacer la copia simplemente a data le vamos a asignar el arreglo sustituido.
                data = newTodos;
            }
        })
    })
    //Llamamos a la funcion para dibujar la tabla.
    drawTable(data);
}

// Creamos un arreglo con los días de la semana.
var weekday = [
    "domingo! 🖖", "lunes! 💪", "martes! 😜", "miércoles! 😌", "jueves! 🤗", "viernes! 🍻", "sábado! 😴"
];

// Obtenemos el día del arreglo.
var n = weekday[new Date().getDay()];

// Agregamos en un arreglo expresiones.
var randomWordArray = [
    "¡Oh por Dios, es ", "¡Whoop, es ", "¡Feliz ", "¡Parece ser ", "¡Increíble, es ", "¡Ten un lindo ", "¡Fabuloso ", "¡Disfruta tu "
];

// Arreglo de emojis.
var randomEmojiArray = [
    '😄', '😃', '😀', '😊', '☺', '😉', '😍', '😘', '😚', '😗', '😙', '😜', '😝', '😛', '😳', '😁', '😔', '😌', '😒', '😞', '😣', '😢', '😂', '😭', '😪', '😥', '😰', '😅', '😓', '😩', '😫', '😨', '😱', '😠', '😡', '😤', '😖', '😆', '😋', '😷', '😎', '😴', '😵', '😲', '😟', '😦', '😧', '😈', '👿', '😮', '😬', '😐', '😕', '😯', '😶', '😇', '😏', '😑', '👲', '👳', '👮', '👷', '💂', '👶', '👦', '👧', '👨', '👩', '👴', '👵', '👱', '👼', '👸', '😺', '😸', '😻', '😽', '😼', '🙀', '😿', '😹', '😾', '👹', '👺', '🙈', '🙉', '🙊', '💀', '👽', '💩', '🔥', '✨', '🌟', '💫', '💥', '💢', '💦', '💧', '💤', '💨', '👂', '👀', '👃', '👅', '👄', '👍', '👎', '👌', '👊', '✊', '✌', '👋', '✋', '👐', '👆', '👇', '👉', '👈', '🙌', '🙏', '☝', '👏', '💪', '🚶', '🏃', '💃', '👫', '👪', '👬', '👭', '💏', '💑', '👯', '🙆', '🙅', '💁', '🙋', '💆', '💇', '💅', '👰', '🙎', '🙍', '🙇', '🎩', '👑', '👒', '👟', '👞', '👡', '👠', '👢', '👕', '👔', '👚', '👗', '🎽', '👖', '👘', '👙', '💼', '👜', '👝', '👛', '👓', '🎀', '🌂', '💄', '💛', '💙', '💜', '💚', '❤', '💔', '💗', '💓', '💕', '💖', '💞', '💘', '💌', '💋', '💍', '💎', '👤', '👥', '💬', '👣', '💭', '🐶', '🐺', '🐱', '🐭', '🐹', '🐰', '🐸', '🐯', '🐨', '🐻', '🐷', '🐽', '🐮', '🐗', '🐵', '🐒', '🐴', '🐑', '🐘', '🐼', '🐧', '🐦', '🐤', '🐥', '🐣', '🐔', '🐍', '🐢', '🐛', '🐝', '🐜', '🐞', '🐌', '🐙', '🐚', '🐠', '🐟', '🐬', '🐳', '🐋', '🐄', '🐏', '🐀', '🐃', '🐅', '🐇', '🐉', '🐎', '🐐', '🐓', '🐕', '🐖', '🐁', '🐂', '🐲', '🐡', '🐊', '🐫', '🐪', '🐆', '🐈', '🐩', '🐾', '💐', '🌸', '🌷', '🍀', '🌹', '🌻', '🌺', '🍁', '🍃', '🍂', '🌿', '🌾', '🍄', '🌵', '🌴', '🌲', '🌳', '🌰', '🌱', '🌼', '🌐', '🌞', '🌝', '🌚', '🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘', '🌜', '🌛', '🌙', '🌍', '🌎', '🌏', '🌋', '🌌', '🌠', '⭐', '☀', '⛅', '☁', '⚡', '☔', '❄', '⛄', '🌀', '🌁', '🌈', '🌊', '🎍', '💝', '🎎', '🎒', '🎓', '🎏', '🎆', '🎇', '🎐', '🎑', '🎃', '👻', '🎅', '🎄', '🎁', '🎋', '🎉', '🎊', '🎈', '🎌', '🔮', '🎥', '📷', '📹', '📼', '💿', '📀', '💽', '💾', '💻', '📱', '☎', '📞', '📟', '📠', '📡', '📺', '📻', '🔊', '🔉', '🔈', '🔇', '🔔', '🔕', '📢', '📣', '⏳', '⌛', '⏰', '⌚', '🔓', '🔒', '🔏', '🔐', '🔑', '🔎', '💡', '🔦', '🔆', '🔅', '🔌', '🔋', '🔍', '🛁', '🛀', '🚿', '🚽', '🔧', '🔩', '🔨', '🚪', '🚬', '💣', '🔫', '🔪', '💊', '💉', '💰', '💴', '💵', '💷', '💶', '💳', '💸', '📲', '📧', '📥', '📤', '✉', '📩', '📨', '📯', '📫', '📪', '📬', '📭', '📮', '📦', '📝', '📄', '📃', '📑', '📊', '📈', '📉', '📜', '📋', '📅', '📆', '📇', '📁', '📂', '✂', '📌', '📎', '✒', '✏', '📏', '📐', '📕', '📗', '📘', '📙', '📓', '📔', '📒', '📚', '📖', '🔖', '📛', '🔬', '🔭', '📰', '🎨', '🎬', '🎤', '🎧', '🎼', '🎵', '🎶', '🎹', '🎻', '🎺', '🎷', '🎸', '👾', '🎮', '🃏', '🎴', '🀄', '🎲', '🎯', '🏈', '🏀', '⚽', '⚾', '🎾', '🎱', '🏉', '🎳', '⛳', '🚵', '🚴', '🏁', '🏇', '🏆', '🎿', '🏂', '🏊', '🏄', '🎣', '☕', '🍵', '🍶', '🍼', '🍺', '🍻', '🍸', '🍹', '🍷', '🍴', '🍕', '🍔', '🍟', '🍗', '🍖', '🍝', '🍛', '🍤', '🍱', '🍣', '🍥', '🍙', '🍘', '🍚', '🍜', '🍲', '🍢', '🍡', '🍳', '🍞', '🍩', '🍮', '🍦', '🍨', '🍧', '🎂', '🍰', '🍪', '🍫', '🍬', '🍭', '🍯', '🍎', '🍏', '🍊', '🍋', '🍒', '🍇', '🍉', '🍓', '🍑', '🍈', '🍌', '🍐', '🍍', '🍠', '🍆', '🍅', '🌽', '🏠', '🏡', '🏫', '🏢', '🏣', '🏥', '🏦', '🏪', '🏩', '🏨', '💒', '⛪', '🏬', '🏤', '🌇', '🌆', '🏯', '🏰', '⛺', '🏭', '🗼', '🗾', '🗻', '🌄', '🌅', '🌃', '🗽', '🌉', '🎠', '🎡', '⛲', '🎢', '🚢', '⛵', '🚤', '🚣', '⚓', '🚀', '✈', '💺', '🚁', '🚂', '🚊', '🚉', '🚞', '🚆', '🚄', '🚅', '🚈', '🚇', '🚝', '🚋', '🚃', '🚎', '🚌', '🚍', '🚙', '🚘', '🚗', '🚕', '🚖', '🚛', '🚚', '🚨', '🚓', '🚔', '🚒', '🚑', '🚐', '🚲', '🚡', '🚟', '🚠', '🚜', '💈', '🚏', '🎫', '🚦', '🚥', '⚠', '🚧', '🔰', '⛽', '🏮', '🎰', '♨', '🗿', '🎪', '🎭', '📍', '🚩', '⬆', '⬇', '⬅', '➡', '🔠', '🔡', '🔤', '↗', '↖', '↘', '↙', '↔', '↕', '🔄', '◀', '▶', '🔼', '🔽', '↩', '↪', 'ℹ', '⏪', '⏩', '⏫', '⏬', '⤵', '⤴', '🆗', '🔀', '🔁', '🔂', '🆕', '🆙', '🆒', '🆓', '🆖', '📶', '🎦', '🈁', '🈯', '🈳', '🈵', '🈴', '🈲', '🉐', '🈹', '🈺', '🈶', '🈚', '🚻', '🚹', '🚺', '🚼', '🚾', '🚰', '🚮', '🅿', '♿', '🚭', '🈷', '🈸', '🈂', 'Ⓜ', '🛂', '🛄', '🛅', '🛃', '🉑', '㊙', '㊗', '🆑', '🆘', '🆔', '🚫', '🔞', '📵', '🚯', '🚱', '🚳', '🚷', '🚸', '⛔', '✳', '❇', '❎', '✅', '✴', '💟', '🆚', '📳', '📴', '🅰', '🅱', '🆎', '🅾', '💠', '➿', '♻', '♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓', '⛎', '🔯', '🏧', '💹', '💲', '💱', '©', '®', '™', '〽', '〰', '🔝', '🔚', '🔙', '🔛', '🔜', '❌', '⭕', '❗', '❓', '❕', '❔', '🔃', '🕛', '🕧', '🕐', '🕜', '🕑', '🕝', '🕒', '🕞', '🕓', '🕟', '🕔', '🕠', '🕕', '🕖', '🕗', '🕘', '🕙', '🕚', '🕡', '🕢', '🕣', '🕤', '🕥', '🕦', '✖', '➕', '➖', '➗', '♠', '♥', '♣', '♦', '💮', '💯', '✔', '☑', '🔘', '🔗', '➰', '🔱', '🔲', '🔳', '◼', '◻', '◾', '◽', '▪', '▫', '🔺', '⬜', '⬛', '⚫', '⚪', '🔴', '🔵', '🔻', '🔶', '🔷', '🔸', '🔹'
];

// Obtenemos un elemento aleatorio del arreglo de expresiones.
var randomWord = randomWordArray[Math.floor(Math.random() * randomWordArray.length)];

// Obtenemos un elemento aleatorio del arreglo de emojis.
var randomEmoji = randomEmojiArray[Math.floor(Math.random() * randomEmojiArray.length)];

// Agregamos el elemento construido al div.
div2.innerHTML = randomWord + n + randomEmoji;
