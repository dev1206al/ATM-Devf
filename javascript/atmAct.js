let redCard = {
    name: 'Mali',
    pin: 1206,
    accBalance: 200,
    minSt: []
}

let greenCard = {
    name: 'Maui',
    pin: 1234,
    accBalance: 67,
    minSt: []
}
let blueCard = {
    name: 'Gera',
    pin: 2905,
    accBalance: 290,
    minSt: []
}
let activeCard = null;

let cardInserted = false;

let wcClicked = false;
let dcClicked = false;
let msClicked = false;

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

rcb.addEventListener('click', () => {
    if (cardInserted == false) {
        cardInserted = true;
        document.getElementById('mainBody').style.visibility = 'visible';
        document.getElementById('rcb').style.backgroundColor = 'red';
        document.getElementById('rcb').innerHTML = 'Insertada';
        document.getElementById('rcb').style.color = 'white';

    }

});
bcb.addEventListener('click', () => {
    if (cardInserted == false) {
        cardInserted = true;
        document.getElementById('mainBody').style.visibility = 'visible';
        document.getElementById('bcb').style.backgroundColor = 'blue';
        document.getElementById('bcb').innerHTML = 'Insertada';
        document.getElementById('bcb').style.color = 'white';
    }


});
gcb.addEventListener('click', () => {
    if (cardInserted == false) {
        cardInserted = true;
        document.getElementById('mainBody').style.visibility = 'visible';
        document.getElementById('gcb').style.backgroundColor = 'green';
        document.getElementById('gcb').innerHTML = 'Insertada';
        document.getElementById('gcb').style.color = 'white';
    }


});

cb.addEventListener('click', () => {
    document.getElementById('mainBody').style.display = 'none';
    document.getElementById('pinBody').style.display = 'flex';
});

wc.addEventListener('click', () => {
    if (redCard.accBalance < 10 || blueCard.accBalance < 10 || greenCard.accBalance < 10) {
        alert('Tu saldo es inferior a $10MXN. Por favor deposite primero');
    }
    else {
        wcClicked = true;
        document.getElementById('mainBody').style.display = 'none';
        document.getElementById('pinBody').style.display = 'flex';
    }

});

dc.addEventListener('click', () => {
    dcClicked = true;
    document.getElementById('mainBody').style.display = 'none';
    document.getElementById('pinBody').style.display = 'flex';
});

ms.addEventListener('click', () => {
    msClicked = true;
    document.getElementById('mainBody').style.display = 'none';
    document.getElementById('pinBody').style.display = 'flex';
});

//Pin Entred Section
pe.addEventListener('click', () => {
    

    if (document.getElementById('pn').value == redCard.pin && document.getElementById('rcb').innerHTML == 'Insertada') {
        activeCard = redCard;
        pinEntred(activeCard);
    } else if (document.getElementById('pn').value == blueCard.pin && document.getElementById('bcb').innerHTML == 'Insertada') {
        activeCard = blueCard;
        pinEntred(activeCard);
    } else if (document.getElementById('pn').value == greenCard.pin && document.getElementById('gcb').innerHTML == 'Insertada') {
        activeCard = greenCard;
        pinEntred(activeCard);
    } else {
        alert('Error de PIN');
    }
});

function pinEntred(Card) {
    document.getElementById('pinBody').style.display = 'none';
    if (wcClicked == true) {
        document.getElementById('withBody').style.display = 'flex';
        wcClicked = false;
    }
    else if (dcClicked == true) {
        document.getElementById('depBody').style.display = 'flex';
        dcClicked = false;
    }
    else if (msClicked == true) {
        document.getElementById('disHeading').innerHTML = `${Card.minSt}`;
        document.getElementById('balance').innerHTML = `Saldo Actual: $ ${Card.accBalance}`;
        document.getElementById('disScreen').style.display = 'flex';
        document.getElementById('pn').value = '';
        msClicked = false;

    }

    //Balance Check:-
    else {
        document.getElementById('disHeading').innerHTML = `Hola Sr(a). ${Card.name}, su balance es`;
        document.getElementById('balance').innerHTML = `$ ${Card.accBalance}`;
        document.getElementById('disScreen').style.display = 'flex';
        document.getElementById('pn').value = '';
    }
    //_*_
}
//_*_

//Withdraw Section:-

withEnter.addEventListener('click', () => {
    let enteredPin = parseInt(document.getElementById('pn').value);

    if (enteredPin === activeCard.pin) {
        withAmountEntered(activeCard);
    } else {
        alert('PIN incorrecto');
    }
});

function withAmountEntered(Card) {
    if (document.getElementById('withAmount').value <= 0 || (document.getElementById('withAmount').value) % 1 !== 0) {
        alert('Por favor, ingrese una cantidad válida en múltiplos de 1');
    } else if (document.getElementById('withAmount').value > Card.accBalance) {
        alert('Saldo Insuficiente');
    } else {
        // Verifica que el saldo después del retiro no sea menor a 10.
        if (Card.accBalance - parseFloat(document.getElementById('withAmount').value) < 10) {
            alert('El saldo después del retiro no puede ser menor a 10');
        } else {
            Card.accBalance -= parseFloat(document.getElementById('withAmount').value);
            Card.minSt.push(`<br>${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}
            ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}.${new Date().getMilliseconds()}
            $${document.getElementById('withAmount').value} retiro; balance nuevo: ${Card.accBalance}`);
            if (Card.minSt.length > 5) {
                Card.minSt.splice(0, 1);
            }

            // Actualizaciones para el estado de la tarjeta
            if (Card === redCard) {
                document.getElementById('rcb').innerHTML = 'Insertada';
            } else if (Card === greenCard) {
                document.getElementById('gcb').innerHTML = 'Insertada';
            } else if (Card === blueCard) {
                document.getElementById('bcb').innerHTML = 'Insertada';
                // Puedes agregar actualizaciones adicionales para blueCard si es necesario
                // ...
            }

            document.getElementById('withBody').style.display = 'none';
            document.getElementById('disHeading').innerHTML = `$ ${document.getElementById('withAmount').value} retirado, su saldo es:`;
            document.getElementById('balance').innerHTML = `$ ${Card.accBalance}`;
            document.getElementById('disScreen').style.display = 'flex';
            document.getElementById('pn').value = '';
        }
    }
}


//_*_

//Deposit Section:-
depEnter.addEventListener('click', () => {
    if (document.getElementById('pn').value == activeCard.pin) {
        depAmountEntered(activeCard);
    } else {
        alert('PIN incorrecto');
    }
});

function depAmountEntered(Card) {
    // Verifica si la cantidad ingresada es menor o igual a cero o no es un múltiplo de 10.
    if (document.getElementById('depAmount').value <= 0 || (document.getElementById('depAmount').value) % 1 !== 0) {
        alert('Por favor ingrese una cantidad válida en el múltiplo de 1');
    }
    else {
        // Calcula el nuevo saldo después del depósito.
        let newBalance = Card.accBalance + parseFloat(document.getElementById('depAmount').value);

        // Verifica que el nuevo saldo no sea mayor a 990.
        if (newBalance > 990) {
            alert('El saldo después del depósito no puede ser mayor a 990');
        } else {
            // Incrementa el saldo de la tarjeta según la cantidad ingresada.
            Card.accBalance = newBalance;

            // Registra el depósito en el historial de transacciones de la tarjeta.
            Card.minSt.push(`<br>${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}
            ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}.${new Date().getMilliseconds()}
            $${document.getElementById('depAmount').value} deposito, balance nuevo: ${Card.accBalance}`);

            // Si hay más de 5 transacciones en el historial, elimina la más antigua.
            if (Card.minSt.length > 5) {
                Card.minSt.splice(0, 1);
            }

            // Oculta la sección de depósito en tu interfaz.
            document.getElementById('depBody').style.display = 'none';

            // Actualiza la información en la interfaz.
            document.getElementById('disHeading').innerHTML = `$ ${document.getElementById('depAmount').value} Depositado, su saldo es:`;
            document.getElementById('balance').innerHTML = `$ ${Card.accBalance}`;
            document.getElementById('disScreen').style.display = 'flex';

            // Limpia el campo del número de PIN en tu interfaz.
            document.getElementById('pn').value = '';
        }
    }
}

//_*_

homeBtn.addEventListener('click', () => {
    document.getElementById('disScreen').style.display = 'none';
    document.getElementById('mainBody').style.display = 'flex';
});

remCard.addEventListener('click', () => {
    if (document.getElementById('rcb').innerHTML == 'Insertada') {
        document.getElementById('rcb').innerHTML = 'Insertar';
        document.getElementById('rcb').style.backgroundColor = 'white';
        document.getElementById('rcb').style.color = 'black';
        document.getElementById('mainBody').style.visibility = 'hidden';
        cardInserted = false;

    }else if(document.getElementById('gcb').innerHTML == 'Insertada'){
        document.getElementById('gcb').innerHTML = 'Insertar';
        document.getElementById('gcb').style.backgroundColor = 'white';
        document.getElementById('gcb').style.color = 'black';
        document.getElementById('mainBody').style.visibility = 'hidden';
        cardInserted = false;

    } else if (document.getElementById('bcb').innerHTML == 'Insertada'){
        document.getElementById('bcb').innerHTML = 'Insertar';
        document.getElementById('bcb').style.backgroundColor = 'white';
        document.getElementById('bcb').style.color = 'black';
        document.getElementById('mainBody').style.visibility = 'hidden';
        cardInserted = false;

    }
});
