import { Airplane } from './airplane.model';
import { Airport } from './airport.model';

export enum Direction {
    North = 'North',
    East = 'East',
    South = 'South',
    West = 'West'
}

export class Gate {
    id: string = '';
    gateName: string = "";
    waitingRoomCapacity: number = 0 
    isAvailable: boolean = true
    direction: Direction = Direction.North
    airplaneId: string = ""
    currentAirplane!: Airplane | undefined
    airport: Airport | undefined
    airportName: string =""
    airportId: string = ""
    userId: string = ""
    
    constructor(gateName= "", waitingRoomCapacity = 0 ){  
        this.gateName= gateName
        this.waitingRoomCapacity = waitingRoomCapacity
    }
}