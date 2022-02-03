const path = require('path');
const fs = require('fs');

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {

    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimosCuatro = [];

        this.init();
    }


    get toJSON() {
        return {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimosCuatro: this.ultimosCuatro
        }
    }

    init() {
        const {hoy, ultimo, tickets, ultimosCuatro} = require('../data/data.json');
        if (hoy === this.hoy) {
            this.ultimo = ultimo;
            this.tickets = tickets;
            this.ultimosCuatro = ultimosCuatro;
        } else {
            this.guardarDB();
        }
    }

    guardarDB() {
        const dbPath = path.join(__dirname, '../data/data.json');
        fs.writeFileSync(dbPath, JSON.stringify(this.toJSON));
    }

    siguiente() {
        this.ultimo += 1;
        const ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        this.guardarDB();
        return `Ticket ${ticket.numero}`;
    }

    atenderTicket(escritorio) {
        if (this.tickets.length === 0) {
            return null;
        }
        const ticket = this.tickets.shift();
        ticket.escritorio = escritorio;

        this.ultimosCuatro.unshift(ticket);

        if (this.ultimosCuatro > 4) {
            this.ultimosCuatro.splice(-1, 1);
        }

        this.guardarDB();
        return ticket;
    }
}

module.exports = {
    TicketControl
}