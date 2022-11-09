export enum Gender {
    Male = 'Male',
    Female = 'Female',
    Other = 'Other'
}

export class User {
    _id: string = '';
    firstname: string = '';
    lastname: string = '';
    password: string= '';
    email: string = '';
    phonenumber: string = '';
    birthdate: Date= new Date('01-01-1999');
    gender: Gender = Gender.Male;
    token?: string

    constructor(firstname= '', lastname= '',password= '',email='', phonenumber='', birthdate= new Date(), gender= Gender.Male ){
        this.firstname = firstname,
        this.lastname = lastname,
        this.password = password;
        this.email = email,
        this.phonenumber = phonenumber,
        this.birthdate = birthdate,
        this.gender = gender
    }
}