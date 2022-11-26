// import { TestBed } from '@angular/core/testing';
// import { USERS } from '../models/mock-users';
// import { User } from '../models/user.model';
// import { UserService } from './user.service';

// describe('UserService', () => {
//   let service: UserService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(UserService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });

//   it('should return a Observable with a list of users', (done : DoneFn)=>{
//     service.getUsers().subscribe((users : User[]) => {
//       console.log(users)
//       expect(users.length).toBe(10)
//       expect(users[0].id).toEqual(USERS[0].id)
//       expect(users[1].id).toEqual(USERS[1].id)
//       expect(users[2].id).toEqual(USERS[2].id)
//       expect(users[3].id).toEqual(USERS[3].id)
//       expect(users[4].id).toEqual(USERS[4].id)
//       expect(users[5].id).toEqual(USERS[5].id)
//       expect(users[6].id).toEqual(USERS[6].id)
//       expect(users[7].id).toEqual(USERS[7].id)
//       expect(users[8].id).toEqual(USERS[8].id)
//       expect(users[9].id).toEqual(USERS[9].id)
//       done()
//     })
//   })

//   it('should return a user by given id', (done : DoneFn)=>{
//     service.getUserById('16').subscribe((user : User) => {
//       expect(user.id).toEqual('16')
//       done()
//     })
//   })
// });
