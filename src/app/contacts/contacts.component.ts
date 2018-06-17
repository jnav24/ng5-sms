import { Component, OnInit } from '@angular/core';
import {ContactsInterface} from '@app/common/interfaces/contacts.interface';
import {MatDialog} from '@angular/material';
import {AddContactComponent} from '@app/dialogs/add-contact/add-contact.component';

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
    contacts = {
        A: [
            { first_name: 'Alan', last_name: 'Read', email: 'aread22@test.com', mobile: '(305) 123-4567' }
        ],
        M: [
            { first_name: 'Mark', last_name: 'Henry', email: 'mhenry@test.com', mobile: '(305) 246-9753' },
            { first_name: 'Michael', last_name: 'Navarro', email: 'mnavarro@test.com', mobile: '(954) 321-7654' }
        ]
    };
    contactKeys = [];

    constructor(public dialog: MatDialog) { }

    ngOnInit() {
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
