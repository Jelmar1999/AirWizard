export enum WeightClass {
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
    wingSpan: number = 0;
    heigth: number = 0;
    engine: string = ""; 
    weightClass: WeightClass = WeightClass.Small
    
    constructor(airplaneName= "", model ="", buildYear=new Date(), fuelCapacity=0, length=0, wingSpan=0,height=0, engine ="", weightClass= WeightClass.Small){  
        this.airplaneName= airplaneName
        this.model = model
        this.buildYear = buildYear
        this.fuelCapacity = fuelCapacity
        this.length = length
        this.wingSpan = wingSpan
        this.heigth = height
        this.engine = engine
        this.weightClass = weightClass
    }
}