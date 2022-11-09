import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UserListComponent } from './user-list.component';
import { FormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Gender, User } from '../user';
import { of } from 'rxjs';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  let userServiceSpy
  
  const mockUsers: User[] = [
    {
      _id: 11,
      firstname: 'Dr Mighty',
      lastname: 'Fine',
      email: 'Nice@gmail.com',
      phonenumber: '06-44556666',
      birthdate: new Date('12-04-1982'),
      gender: Gender.Male,
    },
    {
      _id: 12,
      firstname: 'Narco',
      lastname: 'Cic',
      email: 'Narco@gmail.com',
      phonenumber: '06-44556666',
      birthdate: new Date('12-04-1982'),
      gender: Gender.Male,
    },
    {
      _id: 13,
      firstname: 'Bombasto',
      lastname: 'Manfred',
      email: 'Bombasto@gmail.com',
      phonenumber: '06-44556666',
      birthdate: new Date('12-04-1982'),
      gender: Gender.Male,
    }
  ]

  const fakeActivatedRoute = {
    snapshot: { data: { } }
  } as ActivatedRoute;



  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['getUsers'])
    userServiceSpy.getUsers.and.returnValue(of(mockUsers)); 
    
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule, FormsModule ],
      declarations: [ UserListComponent ],
      providers: [ 
        {provide: ActivatedRoute, useValue: fakeActivatedRoute},
        {provide: UserService, useValue: userServiceSpy} ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
    })
    .compileComponents();
  });
  

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should have Observable list of users', (done: DoneFn)=>{
  //   component.refreshUsers()
  //   fixture.detectChanges()
  //   component.users$.subscribe((users) => {
  //     expect(users).toEqual((mockUsers));
  //   })
  //   done()
  // })
});
