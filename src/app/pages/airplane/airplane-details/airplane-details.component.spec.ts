import { HttpClient, HttpClientModule } from '@angular/common/http'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ActivatedRoute, Router } from '@angular/router'
import { BehaviorSubject, of } from 'rxjs'
import { Airplane, WeightClass } from 'src/app/models/airplane.model'
import { Gate } from 'src/app/models/gate.model'
import { Gender, User } from 'src/app/models/user.model'
import { AirplaneService } from 'src/app/services/airplane.service'
import { AuthService } from 'src/app/services/auth.service'
import { UserService } from 'src/app/services/user.service'
import { AlertService } from 'src/app/util/alert/alert.service'
import { ActivatedRouteStub } from 'src/app/util/testing/activated-route-stub'
import { AirplaneDetailsComponent } from './airplane-details.component'

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
    weightClass: WeightClass.Heavy,
    userId: '1',
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
    userId: '2',
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
    userId: '3',
    gateId: '1',
    currentGate: new Gate()
  }
]
const expectedAirplane: Airplane = {
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
  userId: '23242',
  gateId: '1',
  currentGate: new Gate()
}

describe('AirplaneDetailsComponent', () => {
  let authServiceSpy: jasmine.SpyObj<AuthService>
  let airplaneServiceSpy: jasmine.SpyObj<AirplaneService>
  let alertServiceSpy: jasmine.SpyObj<AlertService>
  let routerSpy: jasmine.SpyObj<Router>
  let userServiceSpy: jasmine.SpyObj<UserService>

  let component: AirplaneDetailsComponent
  let fixture: ComponentFixture<AirplaneDetailsComponent>

  beforeEach(async () => {
    const airplaneServiceSpyObj = jasmine.createSpyObj('AirplaneService', ['getAirplanes', 'getAirplaneById'])
    const userServiceSpyObj = jasmine.createSpyObj('UserService', ['getUsers', 'getUserById'])
    const authServiceSpyObj = jasmine.createSpyObj('AuthService', ['getUserFromLocalStorage', 'logout'])
    const alertServiceSpyObj = jasmine.createSpyObj('AlertService', ['succes', 'error', 'clear'])
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate'])

    const mockUser$ = new BehaviorSubject<User>(expectedUser)
    authServiceSpyObj.currentUser$ = mockUser$
    userServiceSpyObj.currentUser$ = mockUser$

    authServiceSpyObj.getUserFromLocalStorage.and.returnValue(of(expectedUser))
    userServiceSpyObj.getUsers.and.returnValue(of(expectedUser))


    let activatedRouteStub = new ActivatedRouteStub()
    activatedRouteStub.setParamMap({ id: null })

    await TestBed.configureTestingModule({
      declarations: [AirplaneDetailsComponent],
      imports: [HttpClientTestingModule],
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
    fixture = TestBed.createComponent(AirplaneDetailsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should display edit and delete button if user is owner', (done: DoneFn) => {
    fixture.detectChanges()
    airplaneServiceSpy.getAirplaneById.and.returnValue(of(expectedAirplanes[0]))
    component.ngOnInit()
    fixture.detectChanges()
    const deleteButton = fixture.debugElement.nativeElement.querySelector('#deleteButton')
    const editButton = fixture.debugElement.nativeElement.querySelector('#editButton')
    expect(deleteButton).not.toEqual(null)
    expect(editButton).not.toEqual(null)
    expect(deleteButton.innerHTML).toEqual('Delete')
    expect(editButton.innerHTML).toEqual('Edit Airplane')
    fixture.destroy()
    done()
  })

  it('should always display the back button', (done: DoneFn) => {
    fixture.detectChanges()
    airplaneServiceSpy.getAirplaneById.and.returnValue(of(expectedAirplanes[0]))
    component.ngOnInit()
    fixture.detectChanges()
    const btn = fixture.debugElement.nativeElement.querySelector('#goBackButton')
    expect(btn).not.toEqual(null)
    fixture.destroy()
    done()
  })

  it('should display all information correctly', (done: DoneFn) => {
    fixture.detectChanges()
    airplaneServiceSpy.getAirplaneById.and.returnValue(of(expectedAirplanes[0]))
    component.ngOnInit()
    fixture.detectChanges()
    const li = fixture.debugElement.nativeElement.querySelector('#model')
    const li1 = fixture.debugElement.nativeElement.querySelector('#fuelcapacity')
    const li2 = fixture.debugElement.nativeElement.querySelector('#length')
    const li3 = fixture.debugElement.nativeElement.querySelector('#wingspan')
    const li4 = fixture.debugElement.nativeElement.querySelector('#height')
    const li5 = fixture.debugElement.nativeElement.querySelector('#engine')
    const li6 = fixture.debugElement.nativeElement.querySelector('#weigthClass')
    expect(li).not.toEqual(null)
    expect(li1).not.toEqual(null)
    expect(li2).not.toEqual(null)
    expect(li3).not.toEqual(null)
    expect(li4).not.toEqual(null)
    expect(li5).not.toEqual(null)
    expect(li6).not.toEqual(null)
    expect(li.innerHTML).toEqual('Model: C919')
    expect(li1.innerHTML).toEqual('Fuelcapacity (In Liters): 19156 L')
    expect(li2.innerHTML).toEqual('Length (In m): 1989 m')
    expect(li3.innerHTML).toEqual('Wingspan (In m): 510 m')
    expect(li4.innerHTML).toEqual('Height (In m): 490 m')
    expect(li5.innerHTML).toEqual('Engine: CFM-56')
    expect(li6.innerHTML).toEqual('Weight Class: Heavy')
    fixture.destroy()
    done()
  })

  it('should display the name of the airplane', (done: DoneFn) => {
    fixture.detectChanges()
    airplaneServiceSpy.getAirplaneById.and.returnValue(of(expectedAirplanes[0]))
    component.ngOnInit()
    fixture.detectChanges()
    const li = fixture.debugElement.nativeElement.querySelector('#airplaneName')
    expect(li.innerHTML).toContain(expectedAirplanes[0].airplaneName)
    fixture.destroy()
    done()
  })

  it('should not display edit and delete button if user is not the owner', (done: DoneFn) => {
    fixture.detectChanges()
    airplaneServiceSpy.getAirplaneById.and.returnValue(of(expectedAirplane))
    component.ngOnInit()
    fixture.detectChanges()
    expect(component.isOwner).toBe(false)
    const deleteButton = fixture.debugElement.nativeElement.querySelector('#deleteButton')
    const editButton = fixture.debugElement.nativeElement.querySelector('#editButton')
    expect(deleteButton).toEqual(null)
    expect(editButton).toEqual(null)
    fixture.destroy()
    done()
  })
})
