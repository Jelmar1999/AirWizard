import { Airplane } from '../../pages/airplane/airplane';
import { Airport } from '../../pages/airport/airport';

export class Gate {
    _id: string = '';
    gatename: string = "";
    waitingroomcapacity: number = 0 
    currentairplane!: Airplane
    airport: Airport | undefined
    
    constructor(gatename= "", waitingroomcapacity = 0, ){  
        this.gatename= gatename
        this.waitingroomcapacity = waitingroomcapacity
    }
}