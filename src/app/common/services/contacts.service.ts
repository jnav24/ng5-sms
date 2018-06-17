import { Injectable } from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {ContactsInterface} from '@app/common/interfaces/contacts.interface';
import * as _ from 'lodash';

@Injectable()
export class ContactsService {
    private contacts;

    constructor(private af: AngularFirestore) {}

    getContacts() {
        return this.contacts;
    }

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
        const sortContacts = _.orderBy(contacts, ['first_name'], ['asc']);
        const newContacts = {};

        sortContacts.map(contact => {
            const letter = contact.first_name.split('')[0].toUpperCase();

            if (typeof newContacts[letter] === 'undefined') {
                newContacts[letter] = [];
            }

            newContacts[letter].push(contact);
        });

        return newContacts;
    }
}
