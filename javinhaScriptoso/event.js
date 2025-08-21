// Um evento tem uma data e uma descrição.

class Event {
    #id;
    #name;
    #date;
    #description;

    constructor(id, name, date, description) {
        this.#id = id;
        this.#name = name;
        this.#date = new Date(date);
        this.#description = description;

    }

    howManyTimeAgo() {
        const currentDate = new Date;
        const diferenceDays = Math.floor((currentDate - this.#date) / (1000 * 60 * 60 * 24));

        return `${this.#name} was ${diferenceDays} days ago`;
    }

    getInfo() {
        return {
            id: this.#id,
            name: this.#name,
            date: {
                year: this.#date.getFullYear(),
                month: this.#date.getMonth() + 1,
                day: this.#date.getDate()
            },
            description: this.#description
        }
    }
}
//const viagemRecife = new Event("Travel to Recife",new Date(2025,7,11),"viagem para recife junto da babson");
//const eclipse = new Event("Eclipse", new Date(2023,9,14),"eclipse na praia do jacaré c maryloponi","ola")
const events = [
    new Event(0, "Travel to Recife", "2025-08-11", "Viagem para recife junto da babson"),
    new Event(1, "Eclipse", "2023-10-14", "Eclipse na praia do jacaré c maryloponi", "ola")
];

module.exports = { events, Event };
