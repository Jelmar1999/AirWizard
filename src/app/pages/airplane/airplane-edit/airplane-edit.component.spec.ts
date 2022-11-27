import { HttpClient, HttpClientModule } from '@angular/common/http'
import { HttpClientTestingModule, HttpTestingController  } from '@angular/common/http/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { type } from 'os'
import { BehaviorSubject, of } from 'rxjs'
import { Airplane, WeightClass } from 'src/app/models/airplane.model'
import { Gender, User } from 'src/app/models/user.model'
import { AirplaneService } from 'src/app/services/airplane.service'
import { AuthService } from 'src/app/services/auth.service'
import { UserService } from 'src/app/services/user.service'
import { AlertService } from 'src/app/util/alert/alert.service'
import { ActivatedRouteStub } from 'src/app/util/testing/activated-route-stub'
import { AirplaneEditComponent } from './airplane-edit.component'

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
  }
]

describe('AirplaneEditComponent', () => {
  let authServiceSpy: jasmine.SpyObj<AuthService>
  let airplaneServiceSpy: jasmine.SpyObj<AirplaneService>
  let alertServiceSpy: jasmine.SpyObj<AlertService>
  let routerSpy: jasmine.SpyObj<Router>
  let userServiceSpy: jasmine.SpyObj<UserService>
  
  let component: AirplaneEditComponent
  let fixture: ComponentFixture<AirplaneEditComponent>

  beforeEach(async () => {
    const airplaneServiceSpyObj = jasmine.createSpyObj('AirplaneService', ['getAirplanes'])
    const userServiceSpyObj = jasmine.createSpyObj('UserService', ['getUsers', 'getUserById'])
    const authServiceSpyObj = jasmine.createSpyObj('AuthService', ['getUserFromLocalStorage', 'logout'])
    const alertServiceSpyObj = jasmine.createSpyObj('AlertService', ['error', 'clear'])
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate'])

    const mockUser$ = new BehaviorSubject<User>(expectedUser)
    authServiceSpyObj.currentUser$ = mockUser$
    userServiceSpyObj.currentUser$ = mockUser$

    authServiceSpyObj.getUserFromLocalStorage.and.returnValue(of(expectedUser))
    userServiceSpyObj.getUsers.and.returnValue(of(expectedUser))
    airplaneServiceSpyObj.getAirplanes.and.returnValue(of(expectedAirplanes))

    let activatedRouteStub = new ActivatedRouteStub()
    activatedRouteStub.setParamMap({ id: null })

    await TestBed.configureTestingModule({
      declarations: [AirplaneEditComponent],
      imports: [HttpClientTestingModule, FormsModule],
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
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AirplaneEditComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should display the save button', (done: DoneFn) => {
    fixture.detectChanges()
    component.ngOnInit()
    fixture.detectChanges()
    let saveButton = fixture.debugElement.nativeElement.querySelector('#saveAirplane')
    fixture.whenStable().then(() => {
      expect(saveButton).not.toEqual(null)
      expect(saveButton.innerHTML).toContain('Submit');
      done()
    })
  })
})
