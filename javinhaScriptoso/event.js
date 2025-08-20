// Um evento tem uma data e uma descrição.

class Event {
    #name;
    #date;
    #description;
    #password;

    constructor(name, date, description, password){
        this.#name = name;
        this.#date = date;
        this.#description = description;
        this.#password = password;
    }

    howManyTimeAgo(password){
        if (this.#password === null || this.#password === password){
            const currentDate = new Date;
            const diferenceDays = Math.floor((currentDate - this.#date) / (1000 * 60 * 60 * 24));
        
            console.log(`${this.#name} was ${diferenceDays} days ago`)
        }
        else {
            console.log("access denied: incorret password")
        }
    }
    getInfo(password){
        if (this.#password === null || this.#password === password){
            return {
                name: this.#name,
                date: this.#date,
                description: this.#description
            }
        }
        else {
            return "access denied: incorret password"
        }
    }
}
module.exports = Event;
