import { Airplane } from "./airplane.model";

export enum Gender {
    Male = 'Male',
    Female = 'Female',
    Other = 'Other'
}

export class User {
    _id?: string = '';
    token?: string = '';
    firstName: string = '';
    lastName: string = '';
    password: string= '';
    emailAddress: string = '';
    phoneNumber: string = '';
    dateOfBirth: Date= new Date('01-01-1999');
    gender: Gender = Gender.Male;
    ownedAirplanes!: Airplane[] | undefined;

    constructor(firstname= '', lastname= '',password= '',email='', phonenumber='', birthdate= new Date(), gender= Gender.Male ){
        this.firstName = firstname,
        this.lastName = lastname,
        this.password = password;
        this.emailAddress = email,
        this.phoneNumber = phonenumber,
        this.dateOfBirth = birthdate,
        this.gender = gender
    }
}