import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';

@Injectable()
export class RegisterService {
    private fromRegister: Boolean = false;

    constructor(private auth: AngularFireAuth) {}

    createNewUser(email: string, pass: string): Promise<any> {
        return this.auth.auth.createUserWithEmailAndPassword(email, pass);
    }

    setIsFromRegister(value: Boolean) {
        this.fromRegister = value;
    }

    isFromRegister(): Boolean {
        return this.fromRegister;
    }
}
