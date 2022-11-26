import { HttpClientModule } from '@angular/common/http'
import { HttpClientTestingModule, HttpTestingController  } from '@angular/common/http/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ActivatedRoute, Router } from '@angular/router'
import { BehaviorSubject, of } from 'rxjs'
import { Airplane, WeightClass } from 'src/app/models/airplane.model'
import { Gender, User } from 'src/app/models/user.model'
import { AirplaneService } from 'src/app/services/airplane.service'
import { AuthService } from 'src/app/services/auth.service'
import { UserService } from 'src/app/services/user.service'
import { AlertService } from 'src/app/util/alert/alert.service'
import { ActivatedRouteStub } from 'src/app/util/testing/activated-route-stub'

import { AirplaneListComponent } from './airplane-list.component'

const expectedUser: User = {
  id: '1',
  firstName: 'Mees',
  lastName: 'Kees',
  userName: 'keezer',
  email: 'mees@mail.com',
  password: 'secret',
  phoneNumber: '0612345678',
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
    weightClass: WeightClass.Small
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
    weightClass: WeightClass.LargeJet
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
    weightClass: WeightClass.Small
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
    weightClass: WeightClass.Small
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
    weightClass: WeightClass.Medium
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
    weightClass: WeightClass.Heavy
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
    const airplaneServiceSpyObj = jasmine.createSpyObj('AirplaneService', ['getAirplanes'])
    const userServiceSpyObj = jasmine.createSpyObj('UserService', ['getUsers'])
    const authServiceSpyObj = jasmine.createSpyObj('AuthService', [
        'getUserFromLocalStorage', 
        'validateToken', 
        'logout'])
    const alertServiceSpyObj = jasmine.createSpyObj('AlertService', ['error', 'clear'])
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate'])

    const mockUser$ = new BehaviorSubject<User>(expectedUser)
    authServiceSpyObj.currentUser$ = mockUser$

    authServiceSpyObj.getUserById.and.returnValue(of(expectedUser))
    airplaneServiceSpyObj.getAirplanes.and.returnValue(of(expectedAirplanes))

    let activatedRouteStub = new ActivatedRouteStub()
    activatedRouteStub.setParamMap({ id: null })

    await TestBed.configureTestingModule({
      declarations: [AirplaneListComponent],
      imports: [HttpClientTestingModule, HttpClientModule],
      providers: [
        { provide: AirplaneService, useValue: airplaneServiceSpyObj },
        { provide: AuthService, useValue: authServiceSpyObj },
        { provide: AlertService, useValue: alertServiceSpyObj },
        { provide: UserService, useValue: userServiceSpyObj },
        { provide: Router, useValue: routerSpyObj },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ]
    }).compileComponents()
    airplaneServiceSpy = TestBed.inject(AirplaneService) as jasmine.SpyObj<AirplaneService>
    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AirplaneListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
