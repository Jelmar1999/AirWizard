import { TestBed } from '@angular/core/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { UserService } from './user.service'
import { User, Gender } from '../models/user.model'
import { HttpClient } from '@angular/common/http'
import { of } from 'rxjs'

const mockUserData: User = {
  token: 'secrettoken',
  firstName: 'Piet',
  lastName: 'Piraat',
  userName: 'piraatje',
  email: 'piet@mail.com',
  password: 'secret',
  phoneNumber: '0612345678',
  dateOfBirth: new Date('01-01-2000'),
  gender: Gender.Male
}

const expectedUsers: User[] = [
  {
    id: '1',
    firstName: 'Mees',
    lastName: 'Kees',
    userName: 'keesje',
    email: 'mees@mail.com',
    password: 'secret',
    phoneNumber: '0612345678',
    dateOfBirth: new Date('01-01-2000'),
    gender: Gender.Male
  },
  {
    id: '2',
    firstName: 'Herman',
    lastName: 'Brood',
    userName: 'broodje',
    email: 'herman@mail.com',
    password: 'secret',
    phoneNumber: '0612345678',
    dateOfBirth: new Date('01-01-2000'),
    gender: Gender.Male
  }
]

const expectedUser: User = {
  id: '1',
  firstName: 'Mees',
  lastName: 'Kees',
  userName: 'keesje',
  email: 'mees@mail.com',
  password: 'secret',
  phoneNumber: '0612345678',
  dateOfBirth: new Date('01-01-2000'),
  gender: Gender.Male
}

describe('UserService', () => {
  let service: UserService
  let httpSpy: jasmine.SpyObj<HttpClient>

  beforeEach(() => {
    httpSpy = jasmine.createSpyObj('HttpClient', ['get'])
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: httpSpy }]
    })
    service = TestBed.inject(UserService)
    httpSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should return a list of all users', (done: DoneFn) => {
    httpSpy.get.and.returnValue(of(expectedUsers))

    service.getUsers().subscribe((users: User[]) => {
      expect(users.length).toBe(2)
      expect(users[0].id).toEqual(expectedUsers[0].id)
      done()
    })
  })

  it('should return user by id', (done: DoneFn) => {
    httpSpy.get.and.returnValue(of(expectedUser))
    httpSpy.get.and.returnValue(of(expectedUser))

    service.getUserById('1').subscribe((user: User) => {
      expect(user.id).toEqual(expectedUser.id)
      done()
    })
  })
})
