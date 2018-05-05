import { Injectable } from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';

@Injectable()
export class UserService {
    constructor(private af: AngularFirestore) { }

    getContactList(uid) {
        return this.af.doc(`/users/${uid}`);
    }
}
