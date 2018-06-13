import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';

@Injectable()
export class RegisterService {
    constructor(private auth: AngularFireAuth) {}

    createNewUser(email: string, pass: string): Promise<any> {
        return this.auth.auth.createUserWithEmailAndPassword(email, pass);
    }
}
