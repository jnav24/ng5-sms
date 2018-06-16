import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'app-add-contact',
    templateUrl: './add-contact.component.html',
    styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {
    constructor(public dialogRef: MatDialogRef<AddContactComponent>,
                 @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {}

    close() {
        this.dialogRef.close();
    }

    addContact() {
        this.close();
    }
}
