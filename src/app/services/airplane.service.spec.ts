import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { Airplane, WeightClass } from '../models/airplane.model';
import { Gate } from '../models/gate.model';

import { User, Gender } from '../models/user.model';
import { AirplaneService } from './airplane.service';


const mockUserData: User = {
  id: 'b5973afe-d368-453a-bbd0-fba55f815960',
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

const expectedAirplanes: Airplane[] = [
    {
        id: '1',
        airplaneName: 'Comac C919',
        model: 'C919',
        buildYear: new Date('2017-01-01'),
        fuelCapacity: 19156,
        length: 1989,
        wingSpan: 510,
        height: 490,
        engine: 'CFM-56',
        weightClass: WeightClass.Small,
        userId: 'b5973afe-d368-453a-bbd0-fba55f815960',
        gateId: '1',
        currentGate: new Gate
      },
      {
        id: '2',
        airplaneName: 'Irkut MC-21',
        model: 'MC-21',
        buildYear: new Date('2017-01-01'),
        fuelCapacity: 15805,
        length: 43500,
        wingSpan: 610,
        height: 500,
        engine: 'Pratt & Whitney PW1000G',
        weightClass: WeightClass.LargeJet,
        userId: '2',
        gateId: '1',
        currentGate: new Gate
      },
      {
        id: '3',
        airplaneName: 'Sukhoi Superjet SSJ100',
        model: 'SSJ100',
        buildYear: new Date('1981-01-01'),
        fuelCapacity: 54000,
        length: 1989,
        wingSpan: 510,
        height: 490,
        engine: 'PW1000G',
        weightClass: WeightClass.Small,
        userId: '2',
        gateId: '1',
        currentGate: new Gate
      },
      {
        id: '4',
        airplaneName: 'Ilyushin Il-62',
        model: 'Il-62',
        buildYear: new Date('1997-01-01'),
        fuelCapacity: 34000,
        length: 1989,
        wingSpan: 510,
        height: 490,
        engine: 'CFM-56',
        weightClass: WeightClass.Small,
        userId: '3',
        gateId: '1',
        currentGate: new Gate
      },
      {
        id: '5',
        airplaneName: 'Piaggio P180 Avanti',
        model: 'P180',
        buildYear: new Date('1990-01-01'),
        fuelCapacity: 43000,
        length: 34000,
        wingSpan: 467,
        height: 320,
        engine: 'CFM-56',
        weightClass: WeightClass.Medium,
        userId: '4',
        gateId: '1',
        currentGate: new Gate
      },
      {
        id: '6',
        airplaneName: 'Fokker F28 Fellowship',
        model: 'F28',
        buildYear: new Date('1967-01-01'),
        fuelCapacity: 23000,
        length: 989,
        wingSpan: 410,
        height: 400,
        engine: 'CFM-56',
        weightClass: WeightClass.Heavy,
        userId: 'b5973afe-d368-453a-bbd0-fba55f815960',
        gateId: '1',
        currentGate: new Gate
      }
]


const expectedAirplane = {
    id: '1',
    airplaneName: 'Comac C919',
    model: 'C919',
    buildYear: new Date('2017-01-01'),
    fuelCapacity: 19156,
    length: 1989,
    wingSpan: 510,
    height: 490,
    engine: 'CFM-56',
    weightClass: WeightClass.Small,
    userId: 'b5973afe-d368-453a-bbd0-fba55f815960',
    gateId: '1',
    currentGate: new Gate
}

describe('AirplaneService', () => {
  let service: AirplaneService;
  let httpSpy: jasmine.SpyObj<HttpClient>

  beforeEach(() => {
    httpSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete'])

    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: httpSpy }]
    })
    service = TestBed.inject(AirplaneService);
    httpSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should return a list of airplanes', (done: DoneFn) => {
    httpSpy.get.and.returnValue(of(expectedAirplanes))

    service.getAirplanes(mockUserData, '1').subscribe((airplanes: Airplane[]) => {
      expect(airplanes.length).toBe(6)
      expect(airplanes[0].id).toEqual(expectedAirplane.id)
      done()
    })
  })

  it('should return a airplane by id', (done: DoneFn) => {
    httpSpy.get.and.returnValue(of(expectedAirplane))

    service.getAirplaneById(mockUserData, '1').subscribe((airplane: Airplane) => {
      expect(airplane.id).toEqual(expectedAirplane.id)
      expect(airplane.userId).toEqual("b5973afe-d368-453a-bbd0-fba55f815960")
      done()
    })
  })

  it('should return all airplanes from user', (done: DoneFn) => {
    httpSpy.get.and.returnValue(of(expectedAirplane))

    service.getAirplanesFromUser(mockUserData, mockUserData).subscribe({
      complete: () => {
        expect(httpSpy.get.calls.count()).toBe(1)
        done()
      },
      error: (e) => {
        done.fail('an error occured')
      }
    })
  })

  it('should return a error when the server returns a 404', (done: DoneFn) => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404,
      statusText: 'Not Found'
    })

    httpSpy.delete.and.returnValue(throwError(() => errorResponse))

    service.deleteAirplaneById(mockUserData, '1').subscribe({
      complete: () => {
        done.fail('expected an error')
      },
      error: (e) => {
        expect(e.error).toContain(errorResponse.error)
        done()
      }
    })
  })
  
  it('should send a post request to the api', (done: DoneFn) => {
    httpSpy.post.and.returnValue(of('Match created'))
    service.addAirplane(mockUserData, expectedAirplane).subscribe({
      complete: () => {
        expect(httpSpy.post.calls.count()).toBe(1)
        done()
      },
      error: (e) => {
        done.fail('an error occured')
      }
    })
  })
  it('should send a update request to the api', (done: DoneFn) => {
    httpSpy.put.and.returnValue(of('Match created')) 
    service.updateAirplane(mockUserData, expectedAirplane).subscribe({
      complete: () => {
        expect(httpSpy.put.calls.count()).toBe(1)
        done()
      },
      error: (e) => {
        done.fail('an error occured')
      }
    })
  })

  it('should send a delete request to the api', (done: DoneFn) => {
    httpSpy.delete.and.returnValue(of('Match created')) 
    service.deleteAirplaneById(mockUserData, '1').subscribe({
      complete: () => {
        expect(httpSpy.delete.calls.count()).toBe(1)
        done()
      },
      error: (e) => {
        done.fail('an error occured')
      }
    })
  })
});
