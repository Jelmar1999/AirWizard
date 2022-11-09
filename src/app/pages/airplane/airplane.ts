export enum Weight {
    Heavy = 'Heavy',
    B757 = 'B757',
    LargeJet = 'LargeJet',
    LargeCommuter = 'LargeCommuter',
    Medium = 'Medium',
    Small = 'Small'
}

export class Airplane {
    _id: string = '';
    airplanename: string = "";
    model: string = "";
    buildyear: Date= new Date('01-01-1999');
    fuelcapacity: number = 0;
    length: number = 0;
    wingspan: number = 0;
    heigth: number = 0;
    engine: string = ""; 
    weight: Weight = Weight.Small
    
    constructor(airplanename= "", model ="", buildyear=new Date(), fuelcapacity=0, length=0, wingspan=0,height=0, engine ="", weigth= Weight.Small){  
        this.airplanename= airplanename
        this.model = model
        this.buildyear = buildyear
        this.fuelcapacity = fuelcapacity
        this.length = length
        this.wingspan = wingspan
        this.heigth = height
        this.engine = engine
        this.weight = weigth
    }
}