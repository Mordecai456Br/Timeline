// Um evento tem uma data e uma descrição.

class Event {
    constructor(name, date, description){
        this.name = name;
        this.date = date;
        this.description = description;
    }

    howManyTimeAgo(){
        const currentDate = new Date;
        const diferenceDays = Math.floor((currentDate - this.date) / (1000 * 60 * 60 * 24));
    
        console.log(`${this.name} was ${diferenceDays} days ago`)

    }
}

const viagemRecife = new Event("Travel to Recife",new Date(2025,7,11),"viagem para recife");
viagemRecife.howManyTimeAgo();
