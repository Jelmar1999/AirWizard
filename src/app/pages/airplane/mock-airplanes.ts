import { Airplane, Weight} from './airplane'

export const AIRPLANES: Airplane[] = [
  {
    _id: '1',
    airplanename: 'Comac C919',
    model: 'C919',
    buildyear: new Date("2017-01-01"),
    fuelcapacity: 19156,
    length: 1989,
    wingspan: 510,
    heigth: 490,
    engine: "CFM-56",
    weight: Weight.Small
  },
  {
    _id: '2',
    airplanename: 'Irkut MC-21',
    model: 'MC-21',
    buildyear: new Date('2017-01-01'),
    fuelcapacity: 15805,
    length: 43500,
    wingspan: 610,
    heigth: 500,
    engine: "Pratt & Whitney PW1000G",
    weight: Weight.LargeJet
  },
  {
    _id: '3',
    airplanename: 'Sukhoi Superjet SSJ100',
    model: 'SSJ100',
    buildyear: new Date('1981-01-01'),
    fuelcapacity: 54000,
    length: 1989,
    wingspan: 510,
    heigth: 490,
    engine: "PW1000G",
    weight: Weight.Small
  },
  {
    _id: '4',
    airplanename: 'Ilyushin Il-62',
    model: 'Il-62',
    buildyear: new Date('1997-01-01'),
    fuelcapacity: 34000,
    length: 1989,
    wingspan: 510,
    heigth: 490,
    engine: "CFM-56",
    weight: Weight.Small
  },
  {
    _id: '5',
    airplanename: 'Piaggio P180 Avanti',
    model: 'P180',
    buildyear: new Date('1990-01-01'),
    fuelcapacity: 43000,
    length: 34000,
    wingspan: 467,
    heigth: 320,
    engine: "CFM-56",
    weight: Weight.Medium
  },
  {
    _id: '6',
    airplanename: 'Fokker F28 Fellowship',
    model: 'F28',
    buildyear: new Date('1967-01-01'),
    fuelcapacity: 23000,
    length: 989,
    wingspan: 410,
    heigth: 400,
    engine: "CFM-56",
    weight: Weight.Heavy
  },
]
