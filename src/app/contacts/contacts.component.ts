import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {AddContactComponent} from '@app/dialogs/add-contact/add-contact.component';
import {ContactsService} from '@app/common/services/contacts.service';
import {UsersService} from '@app/common/services/users.service';
import {ContactsInterface} from '@app/common/interfaces/contacts.interface';
import * as _ from 'lodash';
import {UploadService} from '@app/common/services/upload.service';

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
    contacts = {};
    contactKeys = [];

    constructor(public dialog: MatDialog,
                private usersService: UsersService,
                private uploadService: UploadService,
                private contactsService: ContactsService) { }

    ngOnInit() {
        this.contacts = this.contactsService.getContacts();
        this.setContactKeys();
    }

    addContact() {
        const dialogRef = this.dialog.open(AddContactComponent, {
            width: '800px',
            data: {}
        });

        dialogRef.afterClosed().subscribe(result => {
            if (typeof result.form !== 'undefined') {
                if (typeof result.file !== 'undefined') {
                    const filename = this.uploadService.getProfilePath(this.usersService.getUserUid().toString(), result.file.name);
                    const upload = this.uploadService.uploadFile(filename, result.file);

                    upload.then(res => {
                        if (res.state === 'success') {
                            result.form.image = this.uploadService.getImageName(filename);
                            this.contactsService.saveContact(result.form, this.usersService.getUserUid().toString());
                            this.saveContact(null, result.form);
                        }
                    });
                } else {
                    this.contactsService.saveContact(result.form, this.usersService.getUserUid().toString());
                    this.saveContact(null, result.form);
                }
            }
        });
    }

    editContact(int: number, letter: string) {
        const id = this.contacts[letter][int]['id'];
        delete this.contacts[letter][int]['id'];
        this.contacts[letter][int].image = '';

        const dialogRef = this.dialog.open(AddContactComponent, {
            width: '800px',
            data: this.contacts[letter][int]
        });

        dialogRef.afterClosed().subscribe(result => {
            if (typeof result.form !== 'undefined') {
                if (typeof result.file !== 'undefined') {
                    const filename = this.uploadService.getProfilePath(this.usersService.getUserUid().toString(), result.file.name);
                    const upload = this.uploadService.uploadFile(filename, result.file);

                    upload.then(res => {
                        if (res.state === 'success') {
                            result.form.image = this.uploadService.getImageName(filename);
                            this.removeContact(int, letter);
                            this.contactsService.updateContact(id, this.usersService.getUserUid().toString(), result.form);
                            this.saveContact(id, result.form);
                        }
                    });
                } else {
                    this.removeContact(int, letter);
                    this.contactsService.updateContact(id, this.usersService.getUserUid().toString(), result.form);
                    this.saveContact(id, result.form);
                }
            }
        });
    }

    hasContactImage(contact: ContactsInterface): boolean {
        return typeof contact['image'] !== 'undefined' && contact['image'] !== '';
    }

    private saveContact(id: string|null, data: ContactsInterface) {
        if (id !== null && id !== '') {
            data.id = id;
        }

        const letter = data.first_name.split('')[0].toUpperCase();

        if (typeof this.contacts[letter] === 'undefined') {
            this.contacts[letter] = [];
        }

        this.contacts[letter].push(data);
        this.sortArray(letter);
        this.setContactKeys();
    }

    private removeContact(int: number, letter: string): void {
        this.contacts[letter].splice(int, 1);

        if (!this.contacts[letter].length) {
            delete this.contacts[letter];
        }
    }

    private sortArray(letter: string) {
        this.contacts = _(this.contacts).toPairs().sortBy(0).fromPairs().value();
        this.contacts[letter] = _.orderBy(this.contacts[letter], ['first_name'], ['asc']);
    }

    private setContactKeys() {
        this.contactKeys = Object.keys(this.contacts);
    }
}
