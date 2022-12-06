import { HttpClient, HttpClientModule } from '@angular/common/http'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router'
import { BehaviorSubject, of } from 'rxjs'
import { Airplane, WeightClass } from 'src/app/models/airplane.model'
import { Gate } from 'src/app/models/gate.model'
import { Gender, User } from 'src/app/models/user.model'
import { AirplaneService } from 'src/app/services/airplane.service'
import { AuthService } from 'src/app/services/auth.service'
import { UserService } from 'src/app/services/user.service'
import { AlertService } from 'src/app/util/alert/alert.service'
import { ActivatedRouteStub } from 'src/app/util/testing/activated-route-stub'

import { AirplaneListComponent } from './airplane-list.component'

const expectedUser: User = {
  id: 'b5973afe-d368-453a-bbd0-fba55f815960',
  firstName: 'Mees',
  lastName: 'Kees',
  userName: 'keezer',
  email: 'mees@mail.com',
  password: 'secret',
  phoneNumber: '0612345678',
  dateOfBirth: new Date('01-01-2000'),
  gender: Gender.Male
}

const airplanes: Airplane[] = [
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
    currentGate: new Gate()
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
    userId: 'b5973afe-d368-453a-bbd0-fba55f815960',
    gateId: '1',
    currentGate: new Gate()
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
    userId: 'b5973afe-d368-453a-bbd0-fba55f815960',
    gateId: '1',
    currentGate: new Gate()
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
    userId: '4',
    gateId: '1',
    currentGate: new Gate()
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
    userId: '5',
    gateId: '1',
    currentGate: new Gate()
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
    userId: '3',
    gateId: '1',
    currentGate: new Gate()
  }
]

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
    currentGate: new Gate()
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
    userId: 'b5973afe-d368-453a-bbd0-fba55f815960',
    gateId: '1',
    currentGate: new Gate()
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
    userId: 'b5973afe-d368-453a-bbd0-fba55f815960',
    gateId: '1',
    currentGate: new Gate()
  }
]
describe('AirplaneListComponent', () => {
  let authServiceSpy: jasmine.SpyObj<AuthService>
  let airplaneServiceSpy: jasmine.SpyObj<AirplaneService>
  let alertServiceSpy: jasmine.SpyObj<AlertService>
  let routerSpy: jasmine.SpyObj<Router>
  let userServiceSpy: jasmine.SpyObj<UserService>

  let component: AirplaneListComponent
  let fixture: ComponentFixture<AirplaneListComponent>

  beforeEach(async () => {
    const airplaneServiceSpyObj = jasmine.createSpyObj('AirplaneService', ['getAirplanes', 'getAirplanesFromUser'])
    const userServiceSpyObj = jasmine.createSpyObj('UserService', ['getUserById'])
    const authServiceSpyObj = jasmine.createSpyObj('AuthService', ['getUserFromLocalStorage', 'logout'])
    const alertServiceSpyObj = jasmine.createSpyObj('AlertService', ['error', 'clear'])
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate', 'url'])

    const mockUser$ = new BehaviorSubject<User>(expectedUser)
    authServiceSpyObj.currentUser$ = mockUser$
    userServiceSpyObj.currentUser$ = mockUser$

    authServiceSpyObj.getUserFromLocalStorage.and.returnValue(of(expectedUser))
    airplaneServiceSpyObj.getAirplanes.and.returnValue(of(airplanes))
    airplaneServiceSpyObj.getAirplanesFromUser.and.returnValue(of(airplanes))

    let activatedRouteStub = new ActivatedRouteStub()
    activatedRouteStub.setParamMap({ id: null })

    await TestBed.configureTestingModule({
      declarations: [AirplaneListComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: AirplaneService, useValue: airplaneServiceSpyObj },
        { provide: AuthService, useValue: authServiceSpyObj },
        { provide: AlertService, useValue: alertServiceSpyObj },
        { provide: UserService, useValue: userServiceSpyObj },
        { provide: Router, useValue: routerSpyObj },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: ActivatedRoute, useValue: { snapshot: { url: '/airplanes' } } }
      ]
    }).compileComponents()
    airplaneServiceSpy = TestBed.inject(AirplaneService) as jasmine.SpyObj<AirplaneService>
    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AirplaneListComponent)
    component = fixture.componentInstance
    component.urlAirplanes = null
    component.lookingAtOwnPlanes = true
    airplaneServiceSpy.getAirplanesFromUser.and.returnValue(of(expectedAirplanes))
    component.airplanes = expectedAirplanes
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should display add new airplane button', (done: DoneFn) => {
    const newButton = fixture.debugElement.nativeElement.querySelector('#newAirplaneButton')
    expect(newButton).not.toEqual(null)
    expect(newButton.innerHTML).toEqual('Add Airplane')
    fixture.destroy()
    done()
  })

  it('should contain correct amount of users airplanes', (done: DoneFn) => {
    fixture.detectChanges()
    expect(component.airplanes.length).toBe(3)
    fixture.destroy()
    done()
  })

  it('should display correct airplane name', (done: DoneFn) => {
    fixture.detectChanges()
    expect(component.airplanes[0].airplaneName).toEqual('Comac C919')
    fixture.destroy()
    done()
  })

  it('should display all information correctly', (done: DoneFn) => {
    fixture.detectChanges()
    const li1 = fixture.debugElement.nativeElement.querySelector('#airplaneModel')
    const li2 = fixture.debugElement.nativeElement.querySelector('#airplaneWeigthClass')
    const li3 = fixture.debugElement.nativeElement.querySelector('#airplaneEngine')
    const li4 = fixture.debugElement.nativeElement.querySelector('#airplaneBuildYear')

    expect(li1).not.toEqual(null)
    expect(li2).not.toEqual(null)
    expect(li3).not.toEqual(null)
    expect(li4).not.toEqual(null)

    expect(li1.innerHTML).toEqual('C919')
    expect(li2.innerHTML).toEqual('Small')
    expect(li3.innerHTML).toEqual('CFM-56')
    expect(li4.innerHTML).toEqual('Sun Jan 01 2017')

    fixture.destroy()
    done()
  })
})
