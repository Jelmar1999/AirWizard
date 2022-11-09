import { Gate } from "../gate/gate";

export class Airport {
    _id: string = '';
    airportname: string = "";
    addres: string = "";
    gates: Gate[] | undefined
    
    constructor(airportname= "", addres = "", ){  
        this.airportname= airportname
        this.addres = addres
    }
}