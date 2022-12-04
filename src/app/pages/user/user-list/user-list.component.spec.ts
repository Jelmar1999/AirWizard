import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ActivatedRoute } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { UserListComponent } from './user-list.component'
import { FormsModule } from '@angular/forms'
import { UserService } from '../../../services/user.service'
import { Gender, User } from '../../../models/user.model'
import { of } from 'rxjs'
import { HttpClientTestingModule } from '@angular/common/http/testing'

describe('UserListComponent', () => {
  let component: UserListComponent
  let fixture: ComponentFixture<UserListComponent>
  let spyUserService

  const fakeUsers: User[] = [
    {
      id: "1",
      firstName: 'Jelmar',
      lastName: 'Dekker',
      userName: 'adminJelmar',
      password: "secret",
      email: 'jelmardekker@mail.com',
      phoneNumber: '0612345678',
      dateOfBirth: new Date('1999-05-10'),
      gender: Gender.Male
    },
    {
      id: "2",
      firstName: 'Test',
      lastName: 'Test',
      userName: 'testAdmin',
      password: "secret",
      email: 'test@test.com',
      phoneNumber: '0687654321',
      dateOfBirth: new Date('1969-02-22'),
      gender: Gender.Male
    },
    {
      id: "3",
      firstName: 'Bob',
      lastName: 'de Vries',
      userName: 'devriesmeester',
      password: "secret",
      email: 'bob@mail.com',
      phoneNumber: '0654672318',
      dateOfBirth: new Date('1958-08-29'),
      gender: Gender.Male
    }
  ]

  const fakeActivatedRoute = {
    snapshot: { data: {} }
  } as ActivatedRoute

  beforeEach(async () => {
    spyUserService = jasmine.createSpyObj('UserService', ['getUsers'])
    spyUserService.getUsers.and.returnValue(of(fakeUsers))
    
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule,  HttpClientTestingModule],
      declarations: [UserListComponent],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        { provide: UserService, useValue: spyUserService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
    fixture.destroy()
  })

})
