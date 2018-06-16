import { Component, OnInit } from '@angular/core';
import {ContactsInterface} from '@app/common/interfaces/contacts.interface';

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
    contacts: ContactsInterface[] = [];

    constructor() { }

    ngOnInit() { }

    addContact() {
        alert('Contact added');
    }
}
