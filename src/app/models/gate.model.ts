import { Airplane } from './airplane.model';
import { Airport } from './airport.model';

export class Gate {
    _id: string = '';
    gateName: string = "";
    waitingRoomCapacity: number = 0 
    currentAirplane!: Airplane
    airport: Airport | undefined
    
    constructor(gateName= "", waitingRoomCapacity = 0, ){  
        this.gateName= gateName
        this.waitingRoomCapacity = waitingRoomCapacity
    }
}