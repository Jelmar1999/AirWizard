import { Gate } from "./gate.model";
import { User } from "./user.model";

export class Airport {
    id?: string = '';
    airportName: string = "";
    address: string = "";
    buildYear: Date= new Date('1999-01-01');
    country: string = "";
    gates: Gate[] | undefined = [];
    owner: User | undefined
    ownerName : string = "";
    
    constructor(airporName= "", address = "", buildyear = new Date()){  
        this.airportName= airporName
        this.buildYear = buildyear
        this.address = address
    }
}