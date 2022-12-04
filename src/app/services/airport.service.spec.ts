import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Airplane, WeightClass } from '../models/airplane.model';
import { Airport } from '../models/airport.model';

import { User, Gender } from '../models/user.model';
import { AirplaneService } from './airplane.service';
import { AirportService } from './airport.service';


const mockUserData: User = {
  id: '1',
  token: "secrettoken",
  firstName:'Piet',
  lastName:'Piraat',
  userName: 'piraatje',
  email:'piet@mail.com',
  password:'secret',
  phoneNumber:'0612345678',
  dateOfBirth: new Date('01-01-2000'),
  gender: Gender.Male
}

const expectedAirports: Airport[] = [
    {
        id: '1',
        airportName: 'Rotterdam Airport',
        address: 'De laan 43',
        country: 'The Netherlands',
        gates: undefined,
        owner: {
          id: '1',
          token: "secrettoken",
          firstName:'Piet',
          lastName:'Piraat',
          userName: 'piraatje',
          email:'piet@mail.com',
          password:'secret',
          phoneNumber:'0612345678',
          dateOfBirth: new Date('01-01-2000'),
          gender: Gender.Male
        },
        ownerName: 'Piet Piraatje',
        buildYear: new Date('2017-01-01'),
        ownerId: '1'
      },
      {
        id: '2',
        airportName: 'Den Haag Airport',
        address: 'Den haagseweg 21',
        country: 'The Netherlands',
        gates: undefined,
        owner: {
          id: '1',
          token: "secrettoken",
          firstName:'Piet',
          lastName:'Piraat',
          userName: 'piraatje',
          email:'piet@mail.com',
          password:'secret',
          phoneNumber:'0612345678',
          dateOfBirth: new Date('01-01-2000'),
          gender: Gender.Male
        },
        ownerName: 'Piet Piraatje',
        buildYear: new Date('2017-01-01'),
        ownerId: '1'
      },
      {
        id: '3',
        airportName: 'Schiphol',
        address: 'Laan 67',
        country: 'The Netherlands',
        gates: undefined,
        owner: {
          id: '1',
          token: "secrettoken",
          firstName:'Piet',
          lastName:'Piraat',
          userName: 'piraatje',
          email:'piet@mail.com',
          password:'secret',
          phoneNumber:'0612345678',
          dateOfBirth: new Date('01-01-2000'),
          gender: Gender.Male
        },
        ownerName: 'Piet Piraatje',
        buildYear: new Date('2017-01-01'),
        ownerId: '1'
      }
]


const expectedAirport = {
    id: '1',
    airportName: 'Rotterdam Airport',
    address: 'De laan 43',
    country: 'The Netherlands',
    gates: undefined,
    owner: mockUserData,
    ownerName: 'Piet Piraatje',
    buildYear: new Date('2017-01-01'),
    ownerId: '1'
}

describe('AirportService', () => {
  let service: AirportService;
  let httpSpy: jasmine.SpyObj<HttpClient>

  beforeEach(() => {
    httpSpy = jasmine.createSpyObj('HttpClient', ['get'])

    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: httpSpy }]
    })
    service = TestBed.inject(AirportService);
    httpSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should return a list of airports', (done: DoneFn) => {
    httpSpy.get.and.returnValue(of(expectedAirports))

    service.getAirports(mockUserData, '1').subscribe((airports: Airport[]) => {
      expect(airports.length).toBe(3)
      expect(airports[0].id).toEqual(expectedAirport.id)
      done()
    })
  })

  it('should return a airport by id', (done: DoneFn) => {
    httpSpy.get.and.returnValue(of(expectedAirport))

    service.getAirportById(mockUserData, '1').subscribe((airport: Airport) => {
      expect(airport.id).toEqual(expectedAirport.id)
      done()
    })
  })
});
