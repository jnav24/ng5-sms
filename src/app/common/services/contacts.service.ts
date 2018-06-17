import { Injectable } from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {ContactsInterface} from '@app/common/interfaces/contacts.interface';

@Injectable()
export class ContactsService {
    private contacts: ContactsInterface[];

    constructor(private af: AngularFirestore) {}

    getAllContacts() {}

    getContact(contact_id) {
        return this.af.doc(`contacts/${contact_id}`).valueChanges();
    }

    getContactList(uid) {
        return this.af.doc(`/users/${uid}`).valueChanges();
    }

    setContacts(contacts: ContactsInterface[]) {
        this.contacts = this.sortContacts(contacts);
    }

    private sortContacts(contacts: ContactsInterface[]) {
        console.log(contacts);
        return contacts;
    }
}
