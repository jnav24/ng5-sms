import { Injectable } from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {ContactsInterface} from '@app/common/interfaces/contacts.interface';
import * as _ from 'lodash';
import {FirebaseDbService} from '@app/common/services/firebase-db.service';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable()
export class ContactsService {
    private contacts;
    private tableName = 'contacts_v2';

    constructor(private fdb: FirebaseDbService,
                private afs: AngularFirestore,
                private af: AngularFireDatabase) {}

    getContacts() {
        return this.contacts;
    }

    getContactByUid(uid: string) {
        if (this.fdb.isFirebase()) {
            return this.af.object(`${this.tableName}/${uid}`).valueChanges();
        }

        return this.afs
            .collection(this.tableName)
            .doc(uid)
            .collection('contacts')
            .snapshotChanges()
            .map(actions => {
                return actions.map(a => {
                    const data = a.payload.doc.data();
                    const id = a.payload.doc.id;
                    return { id, ...data };
                });
            });
    }

    updateContact(cid: string, uid: string, data: ContactsInterface) {
        if (this.fdb.isFirestore()) {
            return this.afs
                .collection(this.tableName)
                .doc(uid)
                .collection('contacts')
                .doc(cid)
                .set(data);
        }
    }

    saveContact(contact: ContactsInterface, uid: string) {
        if (this.fdb.isFirebase()) {
            this.af
                .object(`${this.tableName}/${uid}`);
            // .add(contact);
        }

        return this.afs
            .collection(this.tableName)
            .doc(uid)
            .collection('contacts')
            .add(contact);
    }

    getContact(contact_id) {
        return this.afs.doc(`contacts/${contact_id}`).valueChanges();
    }

    getContactList(uid) {
        return this.afs.doc(`/users/${uid}`).valueChanges();
    }

    setContacts(contacts) {
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
