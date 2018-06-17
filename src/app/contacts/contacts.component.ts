import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {AddContactComponent} from '@app/dialogs/add-contact/add-contact.component';
import {ContactsService} from '@app/common/services/contacts.service';

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
    contacts = {};
    contactKeys = [];

    constructor(public dialog: MatDialog,
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
            if (result !== '') {
                const letter = result.first_name.split('')[0].toUpperCase();
                if (typeof this.contacts[letter] === 'undefined') {
                    this.contacts[letter] = [];
                }

                this.contacts[letter].push(result);
                this.setContactKeys();
                console.log(this.contacts);
                console.log(this.contacts[letter]);
                console.log(this.contactKeys);
            }
        });
    }

    setContactKeys() {
        this.contactKeys = Object.keys(this.contacts);
    }
}
