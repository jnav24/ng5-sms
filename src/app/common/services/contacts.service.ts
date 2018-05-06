import { Injectable } from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';

@Injectable()
export class ContactsService {
    constructor(private af: AngularFirestore) {}

    getAllContacts() {}

    getContact(contact_id) {
        return this.af.doc(`contacts/${contact_id}`);
    }
}