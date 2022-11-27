import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Gender, User } from '../models/user.model';

import { AuthService } from './auth.service';

const expectedLoginUser: User = {
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

describe('AuthService', () => {
  let service: AuthService;
  let httpSpy: jasmine.SpyObj<HttpClient>

  beforeEach(() => {
    httpSpy = jasmine.createSpyObj('HttpClient', ['get', 'post'])
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: httpSpy }],
      imports: [RouterTestingModule]
    })
    service = TestBed.inject(AuthService);
    httpSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
