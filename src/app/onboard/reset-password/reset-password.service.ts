import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';

@Injectable()
export class ResetPasswordService {
    constructor(private auth: AngularFireAuth) { }

    resetPassword(email) {
        return this.auth.auth.sendPasswordResetEmail(email);
    }
}
