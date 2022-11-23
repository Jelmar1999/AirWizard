import { Airplane } from "./airplane.model";

export enum Gender {
    Male = 'Male',
    Female = 'Female',
    Other = 'Other'
}

export class User {
    id?: string = '';
    token?: string = '';
    userName: string = '';
    firstName: string = '';
    lastName: string = '';
    email: string = '';
    password: string= '';
    phoneNumber: string = '';
    dateOfBirth: Date= new Date;
    gender: Gender = Gender.Male;
    ownedAirplanes?: Airplane[] | undefined;

    constructor(userName = '', firstname= '', lastname= '',password= '',email='', phonenumber='', birthdate= new Date(), gender= Gender.Male ){
        this.userName = userName
        this.firstName = firstname,
        this.lastName = lastname,
        this.email = email,
        this.password = password;
        this.phoneNumber = phonenumber,
        this.dateOfBirth = birthdate,
        this.gender = gender
    }
}