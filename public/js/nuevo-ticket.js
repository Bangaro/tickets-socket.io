const lblNuevoTicket = document.getElementById('lblNuevoTicket');
const btnCrear = document.getElementById('btnCrear');

const socket = io();


socket.on('connect', () => {

    btnCrear.disabled = false;

});

socket.on('disconnect', () => {
    btnCrear.disabled = true;
});


socket.on('enviar-mensaje', (payload) => {
    console.log(payload)
})

socket.on('ultimo-ticket', (ultimoTicket) =>{
    lblNuevoTicket.innerText = `Último ticket: ${ultimoTicket}`;
})


btnCrear.addEventListener('click', () => {

    socket.emit('siguiente-ticket', null, (ticket) => {
        lblNuevoTicket.innerText = ticket;
    });

});
