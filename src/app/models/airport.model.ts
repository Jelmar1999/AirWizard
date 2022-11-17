import { Gate } from "./gate.model";

export class Airport {
    _id?: string = '';
    airportName: string = "";
    address: string = "";
    gates: Gate[] | undefined
    
    constructor(airporName= "", address = "", ){  
        this.airportName= airporName
        this.address = address
    }
}