import IUser from './interfaces/IUser';
import uuidv1 from 'uuid/v1';
import moment from 'moment';
import {isNil, isEmpty} from 'lodash';

const PhoneNumberPattern = /\d{3}-\d{3}-\d{4}/

interface ICreateRequest {
    email : string, password : string, phoneNumber: string
}

export default class UserRepository {

    private users : Map<string, IUser>;

    constructor(){
        this.users = new Map<string, IUser>();
    }

    create(createRequest: ICreateRequest) : IUser {
        const {email, password, phoneNumber} = createRequest;
        
        if (isNil(email) || isEmpty(email)){
            throw new Error('Email required');
        }

        if (this.users.has(email)){
            throw new Error(`User ${email} already exists`);
        }

        if (isNil(password) || isEmpty(password)){
            throw new Error('Password required');
        }

        if (!isNil(phoneNumber) && !isEmpty(phoneNumber)) {
            if (!PhoneNumberPattern.test(phoneNumber)){
                throw new Error('Invalid Phone number');
            }
        }

        const now = moment().unix();
        const userId = uuidv1();
        const user = {
            email,
            password,
            phoneNumber, 
            id: userId, 
            created: now, 
            updated: now
        };

        this.users.set(email, user);

        console.log(`Created user #${userId} (${email})`);

        return user;
    }

}