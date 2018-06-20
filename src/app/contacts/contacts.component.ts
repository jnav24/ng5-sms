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
                console.log(result);
                if (typeof result.file !== 'undefined') {
                    const url = this.uploadService.uploadFile(this.usersService.getUserUid().toString(), result.file);
                    console.log(url);
                }
                // const url = this.uploadService.uploadFile(result.file);
                // replace result.form.image = url;
                // this.contactsService.saveContact(result, this.usersService.getUserUid().toString());
                // this.saveContact(null, result);
            }
        });
    }

    editContact(int: number, letter: string) {
        const id = this.contacts[letter][int]['id'];
        delete this.contacts[letter][int]['id'];
        this.contacts[letter][int].image = '';
console.log(this.contacts[letter][int]);
        const dialogRef = this.dialog.open(AddContactComponent, {
            width: '800px',
            data: this.contacts[letter][int]
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            // if (result !== '' && typeof result !== 'undefined') {
            //     this.removeContact(int, letter);
            //     this.contactsService.updateContact(id, this.usersService.getUserUid().toString(), result);
            //     this.saveContact(id, result);
            // }
        });
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
