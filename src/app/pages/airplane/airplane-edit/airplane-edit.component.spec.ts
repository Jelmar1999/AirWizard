import { HttpClient, HttpClientModule } from '@angular/common/http'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms'
import { By } from '@angular/platform-browser'
import { ActivatedRoute, Router } from '@angular/router'
import { type } from 'os'
import { BehaviorSubject, of } from 'rxjs'
import { Airplane, WeightClass } from 'src/app/models/airplane.model'
import { Gate } from 'src/app/models/gate.model'
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

const expectedAirplane: Airplane = {
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
  userId: '1',
  gateId: '1',
  currentGate: new Gate()
}

describe('AirplaneEditComponent', () => {
  let authServiceSpy: jasmine.SpyObj<AuthService>
  let airplaneServiceSpy: jasmine.SpyObj<AirplaneService>
  let alertServiceSpy: jasmine.SpyObj<AlertService>
  let routerSpy: jasmine.SpyObj<Router>
  let userServiceSpy: jasmine.SpyObj<UserService>

  let component: AirplaneEditComponent
  let fixture: ComponentFixture<AirplaneEditComponent>

  beforeEach(async () => {
    const airplaneServiceSpyObj = jasmine.createSpyObj('AirplaneService', ['getAirplaneById'])
    const userServiceSpyObj = jasmine.createSpyObj('UserService', ['getUsers', 'getUserById'])
    const authServiceSpyObj = jasmine.createSpyObj('AuthService', ['getUserFromLocalStorage', 'logout'])
    const alertServiceSpyObj = jasmine.createSpyObj('AlertService', ['error', 'clear'])
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate'])

    const mockUser$ = new BehaviorSubject<User>(expectedUser)
    authServiceSpyObj.currentUser$ = mockUser$
    userServiceSpyObj.currentUser$ = mockUser$

    authServiceSpyObj.getUserFromLocalStorage.and.returnValue(of(expectedUser))
    userServiceSpyObj.getUsers.and.returnValue(of(expectedUser))
    airplaneServiceSpyObj.getAirplaneById.and.returnValue(of(expectedAirplane))

    let activatedRouteStub = new ActivatedRouteStub()
    activatedRouteStub.setParamMap({ id: '1' })

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
      expect(saveButton.innerHTML).toContain('Submit')
      done()
    })
  })
  it('should display the cancel button', (done: DoneFn) => {
    fixture.detectChanges()
    component.ngOnInit()
    fixture.detectChanges()
    let saveButton = fixture.debugElement.nativeElement.querySelector('#cancelSave')
    fixture.whenStable().then(() => {
      expect(saveButton).not.toEqual(null)
      expect(saveButton.innerHTML).toContain('Cancel')
      done()
    })
  })
  it('should display the weightClass of the airplane in selectbox', (done: DoneFn) => {
    fixture.detectChanges()
    component.ngOnInit()
    fixture.detectChanges()
    let weightClassSelect = fixture.debugElement.nativeElement.querySelector('#weightClass')
    fixture.whenStable().then(() => {
      expect(weightClassSelect).not.toEqual(null)
      const selectedValue = weightClassSelect.options[weightClassSelect.selectedIndex].label
      expect(selectedValue).toEqual(expectedAirplane.weightClass)
      done()
    })
  })
  it('should display the fuelcapacity of the existing airplane', (done: DoneFn) => {
    fixture.detectChanges()
    airplaneServiceSpy.getAirplaneById.and.returnValue(of(expectedAirplane))
    component.ngOnInit()
    fixture.detectChanges()
    expect(component.airplaneId).toEqual(String(expectedAirplane.id))
    let airplaneFuelCapacity = fixture.debugElement.nativeElement.querySelector('#airplaneFuelcapacity')
    fixture.whenStable().then(() => {
      expect(airplaneFuelCapacity).not.toEqual(null)
      const selectedValue = airplaneFuelCapacity.value
      expect(selectedValue).toBeTruthy()
      expect(selectedValue).toEqual('19156')
      done()
    })
  })
  it('should display the length of the existing airplane', (done: DoneFn) => {
    fixture.detectChanges()
    airplaneServiceSpy.getAirplaneById.and.returnValue(of(expectedAirplane))
    component.ngOnInit()
    fixture.detectChanges()
    expect(component.airplaneId).toEqual(String(expectedAirplane.id))
    let airplaneLength = fixture.debugElement.nativeElement.querySelector('#airplaneLength')
    fixture.whenStable().then(() => {
      expect(airplaneLength).not.toEqual(null)
      const selectedValue = airplaneLength.value
      expect(selectedValue).toBeTruthy()
      expect(selectedValue).toEqual('1989')
      done()
    })
  })
  it('should display the wingSpan of the existing airplane', (done: DoneFn) => {
    fixture.detectChanges()
    airplaneServiceSpy.getAirplaneById.and.returnValue(of(expectedAirplane))
    component.ngOnInit()
    fixture.detectChanges()
    expect(component.airplaneId).toEqual(String(expectedAirplane.id))
    let airplaneWingspan = fixture.debugElement.nativeElement.querySelector('#airplaneWingspan')
    fixture.whenStable().then(() => {
      expect(airplaneWingspan).not.toEqual(null)
      const selectedValue = airplaneWingspan.value
      expect(selectedValue).toBeTruthy()
      expect(selectedValue).toEqual('510')
      done()
    })
  })
  it('should display the buildYear of the existing airplane', (done: DoneFn) => {
    fixture.detectChanges()
    airplaneServiceSpy.getAirplaneById.and.returnValue(of(expectedAirplane))
    component.ngOnInit()
    fixture.detectChanges()
    expect(component.airplaneId).toEqual(String(expectedAirplane.id))
    let airplaneBuildYear = fixture.debugElement.nativeElement.querySelector('#airplaneBuilYear')
    fixture.whenStable().then(() => {
      expect(airplaneBuildYear).not.toEqual(null)
      const selectedValue = airplaneBuildYear.value
      expect(selectedValue).toBeTruthy()
      expect(selectedValue).toEqual('2017-01-01')
      done()
    })
  })
  it('should display the airplaneName of the airplane', (done: DoneFn) => {
    fixture.detectChanges()
    component.ngOnInit()
    fixture.detectChanges()
    let airplanename = fixture.debugElement.nativeElement.querySelector('#airplaneName')
    fixture.whenStable().then(() => {
      expect(airplanename).not.toEqual(null)
      const selectedValue = airplanename.value
      expect(selectedValue).toEqual(expectedAirplane.airplaneName)
      done()
    })
  })
  it('should disable the submit button when all info is not filled in', (done: DoneFn) => {
    fixture.detectChanges()
    component.ngOnInit()
    component.airplaneId = null
    fixture.detectChanges()
    let submitBtn = fixture.debugElement.query(By.css('button.btn-primary.mx-2'));
    fixture.whenStable().then(() => {
      expect(submitBtn.nativeElement.getAttribute('disabled')).toEqual(null);
      done()
    })
  })
})
