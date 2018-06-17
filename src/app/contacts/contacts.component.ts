import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {AddContactComponent} from '@app/dialogs/add-contact/add-contact.component';
import {ContactsService} from '@app/common/services/contacts.service';
import {UsersService} from '@app/common/services/users.service';

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
            if (result !== '' && typeof result !== 'undefined') {
                this.contactsService.saveContact(result, this.usersService.getUserUid().toString());
                const letter = result.first_name.split('')[0].toUpperCase();
                if (typeof this.contacts[letter] === 'undefined') {
                    this.contacts[letter] = [];
                }

                this.contacts[letter].push(result);
                this.setContactKeys();
            }
        });
    }

    setContactKeys() {
        this.contactKeys = Object.keys(this.contacts);
    }
}
