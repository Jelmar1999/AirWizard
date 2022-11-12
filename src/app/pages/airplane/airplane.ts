export enum Weight {
    Heavy = 'Heavy',
    B757 = 'B757',
    LargeJet = 'LargeJet',
    LargeCommuter = 'LargeCommuter',
    Medium = 'Medium',
    Small = 'Small'
}

export class Airplane {
    id: string = "00000000-0000-0000-0000-000000000000"
    airplaneName: string = "";
    model: string = "";
    buildYear: Date= new Date('01-01-1999');
    fuelCapacity: number = 0;
    length: number = 0;
    wingspan: number = 0;
    heigth: number = 0;
    engine: string = ""; 
    weight: Weight = Weight.Small
    
    constructor(airplanename= "", model ="", buildyear=new Date(), fuelcapacity=0, length=0, wingspan=0,height=0, engine ="", weigth= Weight.Small){  
        this.airplaneName= airplanename
        this.model = model
        this.buildYear = buildyear
        this.fuelCapacity = fuelcapacity
        this.length = length
        this.wingspan = wingspan
        this.heigth = height
        this.engine = engine
        this.weight = weigth
    }
}