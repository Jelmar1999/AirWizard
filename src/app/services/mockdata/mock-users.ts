import { Gender, User } from './user.model'

export const USERS: User[] = [
  {
    id: '11',
    firstName: 'Dr Mighty',
    lastName: 'Fine',
    userName: 'MGFine',
    password: 'password',
    email: 'Nice@gmail.com',
    phoneNumber: '06-44556666',
    dateOfBirth: new Date('12-04-1982'),
    gender: Gender.Male,
  },
  {
    id: '16',
    firstName: 'RubberMan',
    lastName: 'Elastic',
    userName: 'EMan',
    password: 'password',
    email: 'RubberMan@gmail.com',
    phoneNumber: '06-44556666',
    dateOfBirth: new Date('12-04-1982'),
    gender: Gender.Male,
  },
  {
    id: '17',
    firstName: 'Dynama',
    lastName: 'Danger',
    userName: 'DDanger',
    password: 'password',
    email: 'Dynama@gmail.com',
    phoneNumber: '06-44556666',
    dateOfBirth: new Date('12-04-1982'),
    gender: Gender.Male,
  },
]
