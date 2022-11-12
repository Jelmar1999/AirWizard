import { Airplane, Weight} from './airplane'

export const AIRPLANES: Airplane[] = [
  {
    id: '1',
    airplaneName: 'Comac C919',
    model: 'C919',
    buildYear: new Date("2017-01-01"),
    fuelCapacity: 19156,
    length: 1989,
    wingspan: 510,
    heigth: 490,
    engine: "CFM-56",
    weight: Weight.Small
  },
  {
    id: '2',
    airplaneName: 'Irkut MC-21',
    model: 'MC-21',
    buildYear: new Date('2017-01-01'),
    fuelCapacity: 15805,
    length: 43500,
    wingspan: 610,
    heigth: 500,
    engine: "Pratt & Whitney PW1000G",
    weight: Weight.LargeJet
  },
  {
    id: '3',
    airplaneName: 'Sukhoi Superjet SSJ100',
    model: 'SSJ100',
    buildYear: new Date('1981-01-01'),
    fuelCapacity: 54000,
    length: 1989,
    wingspan: 510,
    heigth: 490,
    engine: "PW1000G",
    weight: Weight.Small
  },
  {
    id: '4',
    airplaneName: 'Ilyushin Il-62',
    model: 'Il-62',
    buildYear: new Date('1997-01-01'),
    fuelCapacity: 34000,
    length: 1989,
    wingspan: 510,
    heigth: 490,
    engine: "CFM-56",
    weight: Weight.Small
  },
  {
    id: '5',
    airplaneName: 'Piaggio P180 Avanti',
    model: 'P180',
    buildYear: new Date('1990-01-01'),
    fuelCapacity: 43000,
    length: 34000,
    wingspan: 467,
    heigth: 320,
    engine: "CFM-56",
    weight: Weight.Medium
  },
  {
    id: '6',
    airplaneName: 'Fokker F28 Fellowship',
    model: 'F28',
    buildYear: new Date('1967-01-01'),
    fuelCapacity: 23000,
    length: 989,
    wingspan: 410,
    heigth: 400,
    engine: "CFM-56",
    weight: Weight.Heavy
  },
]
