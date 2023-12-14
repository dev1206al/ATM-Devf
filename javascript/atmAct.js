// Definición de tarjetas y variables
let redCard = {
    name: 'Mali',
    pin: 1206,
    accBalance: 200,
    minSt: [] // Historial de transacciones vacío al inicio
}

let greenCard = {
    name: 'Maui',
    pin: 1234,
    accBalance: 67,
    minSt: [] // Historial de transacciones vacío al inicio
}

let blueCard = {
    name: 'Gera',
    pin: 2905,
    accBalance: 290,
    minSt: [] // Historial de transacciones vacío al inicio
}

let activeCard = null; // Tarjeta activa

// Variables de control de estado
let cardInserted = false;
let wcClicked = false;
let dcClicked = false;
let msClicked = false;

// Elementos del DOM
const rcb = document.getElementById('rcb');
const bcb = document.getElementById('bcb');
const gcb = document.getElementById('gcb');
const cb = document.getElementById('cb');
const wc = document.getElementById('wc');
const dc = document.getElementById('dc');
const ms = document.getElementById('ms');
const pe = document.getElementById('pe');
const withEnter = document.getElementById('withEnter');
const depEnter = document.getElementById('depEnter');
const homeBtn = document.getElementById('homeBtn');
const remCard = document.getElementById('remCard');

// Listeners de eventos para tarjetas
rcb.addEventListener('click', () => {
    // Verifica si la tarjeta está insertada y la marca como insertada si no lo está
    if (cardInserted == false) {
        cardInserted = true;
        // Cambia la apariencia de la tarjeta
        document.getElementById('mainBody').style.visibility = 'visible';
        document.getElementById('rcb').style.backgroundColor = 'red';
        document.getElementById('rcb').innerHTML = 'Insertada';
        document.getElementById('rcb').style.color = 'white';
    }
});

bcb.addEventListener('click', () => {
    // Verifica si la tarjeta está insertada y la marca como insertada si no lo está
    if (cardInserted == false) {
        cardInserted = true;
        // Cambia la apariencia de la tarjeta
        document.getElementById('mainBody').style.visibility = 'visible';
        document.getElementById('bcb').style.backgroundColor = 'blue';
        document.getElementById('bcb').innerHTML = 'Insertada';
        document.getElementById('bcb').style.color = 'white';
    }
});

gcb.addEventListener('click', () => {
    // Verifica si la tarjeta está insertada y la marca como insertada si no lo está
    if (cardInserted == false) {
        cardInserted = true;
        // Cambia la apariencia de la tarjeta
        document.getElementById('mainBody').style.visibility = 'visible';
        document.getElementById('gcb').style.backgroundColor = 'green';
        document.getElementById('gcb').innerHTML = 'Insertada';
        document.getElementById('gcb').style.color = 'white';
    }
});

// Evento para mostrar el ingreso de código PIN
cb.addEventListener('click', () => {
    document.getElementById('mainBody').style.display = 'none';
    document.getElementById('pinBody').style.display = 'flex';
});

// Eventos para diferentes acciones en cajeros automáticos
wc.addEventListener('click', () => {
    // Verifica si alguno de los saldos es menor a 10 y solicita depositar primero
    if (redCard.accBalance < 10 || blueCard.accBalance < 10 || greenCard.accBalance < 10) {
        alert('Tu saldo es inferior a $10MXN. Por favor deposita primero');
    } else {
        // Marca que se hizo clic en "Retiro"
        wcClicked = true;
        // Muestra la pantalla para ingresar el código PIN
        document.getElementById('mainBody').style.display = 'none';
        document.getElementById('pinBody').style.display = 'flex';
    }
});

dc.addEventListener('click', () => {
    // Marca que se hizo clic en "Depósito"
    dcClicked = true;
    // Muestra la pantalla para ingresar el código PIN
    document.getElementById('mainBody').style.display = 'none';
    document.getElementById('pinBody').style.display = 'flex';
});

ms.addEventListener('click', () => {
    // Marca que se hizo clic en "Estado de cuenta"
    msClicked = true;
    // Muestra la pantalla para ingresar el código PIN
    document.getElementById('mainBody').style.display = 'none';
    document.getElementById('pinBody').style.display = 'flex';
});



// Evento al presionar el botón "Enter" para ingresar el PIN
pe.addEventListener('click', () => {
    // Verifica si el PIN ingresado coincide con la tarjeta activa y si la tarjeta está insertada
    if (document.getElementById('pn').value == redCard.pin && document.getElementById('rcb').innerHTML == 'Insertada') {
        activeCard = redCard;
        pinEntered(activeCard);
    } else if (document.getElementById('pn').value == blueCard.pin && document.getElementById('bcb').innerHTML == 'Insertada') {
        activeCard = blueCard;
        pinEntered(activeCard);
    } else if (document.getElementById('pn').value == greenCard.pin && document.getElementById('gcb').innerHTML == 'Insertada') {
        activeCard = greenCard;
        pinEntered(activeCard);
    } else {
        // Alerta de error si el PIN no coincide o la tarjeta no está insertada
        alert('Error de PIN');
    }
});

// Función para manejar el ingreso del PIN
function pinEntered(Card) {
    document.getElementById('pinBody').style.display = 'none';

    // Verifica qué acción se solicitó (Retiro, Depósito, Estado de cuenta)
    if (wcClicked == true) {
        document.getElementById('withBody').style.display = 'flex'; // Muestra pantalla de Retiro
        wcClicked = false;
    } else if (dcClicked == true) {
        document.getElementById('depBody').style.display = 'flex'; // Muestra pantalla de Depósito
        dcClicked = false;
    } else if (msClicked == true) {
        // Muestra información del Estado de cuenta
        document.getElementById('disHeading').innerHTML = `${Card.minSt}`;
        document.getElementById('balance').innerHTML = `Saldo Actual: $ ${Card.accBalance}`;
        document.getElementById('disScreen').style.display = 'flex';
        document.getElementById('pn').value = '';
        msClicked = false;
    } else {
        // Muestra información básica de la tarjeta
        document.getElementById('disHeading').innerHTML = `Hola Sr(a). ${Card.name}, su balance es`;
        document.getElementById('balance').innerHTML = `$ ${Card.accBalance}`;
        document.getElementById('disScreen').style.display = 'flex';
        document.getElementById('pn').value = '';
    }
}


// Evento cuando se hace clic en el botón de Retiro
withEnter.addEventListener('click', () => {
    let enteredPin = parseInt(document.getElementById('pn').value);

    // Verifica si el PIN ingresado coincide con el de la tarjeta activa
    if (enteredPin === activeCard.pin) {
        withAmountEntered(activeCard); // Llama a la función para manejar el retiro
    } else {
        alert('PIN incorrecto'); // Alerta de PIN incorrecto si no coincide
    }
});

// Función para manejar el retiro de dinero
function withAmountEntered(Card) {
    // Verifica si el monto ingresado es válido y si es mayor al saldo actual
    if (document.getElementById('withAmount').value <= 0 || (document.getElementById('withAmount').value) % 1 !== 0) {
        alert('Por favor, ingrese una cantidad válida en múltiplos de 1');
    } else if (document.getElementById('withAmount').value > Card.accBalance) {
        alert('Saldo Insuficiente');
    } else {
        // Verifica que el saldo después del retiro no sea menor a 10
        if (Card.accBalance - parseFloat(document.getElementById('withAmount').value) < 10) {
            alert('El saldo después del retiro no puede ser menor a 10');
        } else {
            // Realiza el retiro y actualiza la información de la tarjeta
            Card.accBalance -= parseFloat(document.getElementById('withAmount').value);
            Card.minSt.push(`<br>${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}
            ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}.${new Date().getMilliseconds()}
            $${document.getElementById('withAmount').value} retiro; balance nuevo: ${Card.accBalance}`);
            if (Card.minSt.length > 5) {
                Card.minSt.splice(0, 1);
            }

            // Actualiza el estado de la tarjeta en la interfaz
            if (Card === redCard) {
                document.getElementById('rcb').innerHTML = 'Insertada';
            } else if (Card === greenCard) {
                document.getElementById('gcb').innerHTML = 'Insertada';
            } else if (Card === blueCard) {
                document.getElementById('bcb').innerHTML = 'Insertada';
                // Puedes agregar actualizaciones adicionales para blueCard si es necesario
                // ...
            }

            // Oculta la sección de retiro y muestra la información actualizada
            document.getElementById('withBody').style.display = 'none';
            document.getElementById('disHeading').innerHTML = `$ ${document.getElementById('withAmount').value} retirado, su saldo es:`;
            document.getElementById('balance').innerHTML = `$ ${Card.accBalance}`;
            document.getElementById('disScreen').style.display = 'flex';
            document.getElementById('pn').value = '';
        }
    }
}


// Evento cuando se hace clic en el botón de Depósito
depEnter.addEventListener('click', () => {
    if (document.getElementById('pn').value == activeCard.pin) {
        depAmountEntered(activeCard); // Llama a la función para manejar el depósito
    } else {
        alert('PIN incorrecto'); // Alerta de PIN incorrecto si no coincide
    }
});

// Función para manejar el depósito de dinero
function depAmountEntered(Card) {
    // Verifica si la cantidad ingresada es válida y si el nuevo saldo no excede el límite
    if (document.getElementById('depAmount').value <= 0 || (document.getElementById('depAmount').value) % 1 !== 0) {
        alert('Por favor, ingrese una cantidad válida en múltiplos de 1');
    } else {
        // Calcula el nuevo saldo después del depósito
        let newBalance = Card.accBalance + parseFloat(document.getElementById('depAmount').value);

        // Verifica que el nuevo saldo no exceda el límite establecido
        if (newBalance > 990) {
            alert('El saldo después del depósito no puede ser mayor a 990');
        } else {
            // Incrementa el saldo de la tarjeta según la cantidad ingresada
            Card.accBalance = newBalance;

            // Registra el depósito en el historial de transacciones de la tarjeta
            Card.minSt.push(`<br>${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}
            ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}.${new Date().getMilliseconds()}
            $${document.getElementById('depAmount').value} deposito, balance nuevo: ${Card.accBalance}`);

            // Si hay más de 5 transacciones en el historial, elimina la más antigua
            if (Card.minSt.length > 5) {
                Card.minSt.splice(0, 1);
            }

            // Oculta la sección de depósito y muestra la información actualizada en la interfaz
            document.getElementById('depBody').style.display = 'none';
            document.getElementById('disHeading').innerHTML = `$ ${document.getElementById('depAmount').value} Depositado, su saldo es:`;
            document.getElementById('balance').innerHTML = `$ ${Card.accBalance}`;
            document.getElementById('disScreen').style.display = 'flex';

            // Limpia el campo del número de PIN en la interfaz
            document.getElementById('pn').value = '';
        }
    }
}

// Evento al hacer clic en el botón "Home"
homeBtn.addEventListener('click', () => {
    // Oculta la pantalla actual y muestra el cuerpo principal
    document.getElementById('disScreen').style.display = 'none';
    document.getElementById('mainBody').style.display = 'flex';
});

// Evento al hacer clic en el botón "Remover Tarjeta"
remCard.addEventListener('click', () => {
    if (document.getElementById('rcb').innerHTML == 'Insertada') {
        // Actualiza la interfaz al remover la tarjeta roja
        document.getElementById('rcb').innerHTML = 'Insertar';
        document.getElementById('rcb').style.backgroundColor = 'white';
        document.getElementById('rcb').style.color = 'black';
        document.getElementById('mainBody').style.visibility = 'hidden';
        cardInserted = false;
    } else if (document.getElementById('gcb').innerHTML == 'Insertada') {
        // Actualiza la interfaz al remover la tarjeta verde
        document.getElementById('gcb').innerHTML = 'Insertar';
        document.getElementById('gcb').style.backgroundColor = 'white';
        document.getElementById('gcb').style.color = 'black';
        document.getElementById('mainBody').style.visibility = 'hidden';
        cardInserted = false;
    } else if (document.getElementById('bcb').innerHTML == 'Insertada') {
        // Actualiza la interfaz al remover la tarjeta azul
        document.getElementById('bcb').innerHTML = 'Insertar';
        document.getElementById('bcb').style.backgroundColor = 'white';
        document.getElementById('bcb').style.color = 'black';
        document.getElementById('mainBody').style.visibility = 'hidden';
        cardInserted = false;
    }
});
