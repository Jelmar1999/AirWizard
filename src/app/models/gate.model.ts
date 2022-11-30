import { Airplane } from './airplane.model';
import { Airport } from './airport.model';

export class Gate {
    id: string = '';
    gateName: string = "";
    waitingRoomCapacity: number = 0 
    currentAirplane!: Airplane
    airport: Airport | undefined
    airportName: string =""
    airportId: string = ""
    userId: string = ""
    
    constructor(gateName= "", waitingRoomCapacity = 0, ){  
        this.gateName= gateName
        this.waitingRoomCapacity = waitingRoomCapacity
    }
}