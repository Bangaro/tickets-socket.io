const lblEscritorio = document.querySelector('h1');
const btnNuevo = document.querySelector('button');
const lblTicket = document.querySelector('small');
const divAlerta = document.querySelector('.alert');
const lblPendientes = document.getElementById('lblPendientes');

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}


const escritorio = searchParams.get('escritorio');
lblEscritorio.innerText = `${escritorio}`;

divAlerta.style.display = 'none';

const socket = io();


socket.on('connect', () => {

    btnNuevo.disabled = false;

});

socket.on('disconnect', () => {
    btnNuevo.disabled = true;
});


socket.on('enviar-mensaje', (payload) => {
    console.log(payload)
})

socket.on('tickets-pendientes', (ticketsPendientes) => {
    if(ticketsPendientes === 0){
        lblPendientes.style.display = 'none';
    }else{
        lblPendientes.style.display = 'block';
        lblPendientes.innerText = `${ticketsPendientes}`;
    }
})

btnNuevo.addEventListener('click', () => {

    socket.emit('atender-ticket', {escritorio}, ({ok, ticket, msg}) => {
        if (!ok) {
            lblTicket.innerText = 'Nadie';
            return divAlerta.style.display = '';
        }
        lblTicket.innerText = `Ticket ${ticket.numero}`;

    });

});
