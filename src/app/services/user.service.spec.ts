import { TestBed } from '@angular/core/testing';
import { USERS } from '../models/mock-users';
import { User } from '../models/user.model';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a Observable with a list of users', (done : DoneFn)=>{
    service.getUsers().subscribe((users : User[]) => {
      console.log(users)
      expect(users.length).toBe(10)
      expect(users[0]._id).toEqual(USERS[0]._id)
      expect(users[1]._id).toEqual(USERS[1]._id)
      expect(users[2]._id).toEqual(USERS[2]._id)
      expect(users[3]._id).toEqual(USERS[3]._id)
      expect(users[4]._id).toEqual(USERS[4]._id)
      expect(users[5]._id).toEqual(USERS[5]._id)
      expect(users[6]._id).toEqual(USERS[6]._id)
      expect(users[7]._id).toEqual(USERS[7]._id)
      expect(users[8]._id).toEqual(USERS[8]._id)
      expect(users[9]._id).toEqual(USERS[9]._id)
      done()
    })
  })

  it('should return a user by given id', (done : DoneFn)=>{
    service.getUserById(16).subscribe((user : User) => {
      expect(user._id).toEqual(16)
      done()
    })
  })

  it('should return a user by given name', (done : DoneFn)=>{
    service.getUserByName('RubberMan').subscribe((user : User) => {
      expect(user.firstName).toEqual('RubberMan')
      done()
    })
  })
});
