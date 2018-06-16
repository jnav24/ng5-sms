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
    contacts: ContactsInterface[] = [];

    constructor(public dialog: MatDialog) { }

    ngOnInit() { }

    addContact() {
        const dialogRef = this.dialog.open(AddContactComponent, {
            width: '800px',
            data: {}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            console.log(result);
        });
    }
}
