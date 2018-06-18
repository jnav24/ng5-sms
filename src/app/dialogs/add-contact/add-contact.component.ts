import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-add-contact',
    templateUrl: './add-contact.component.html',
    styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {
    phoneTypes = [
        { type: 'mobile', value: 'Mobile' },
        { type: 'home', value: 'Home' },
        { type: 'work', value: 'Work' },
    ];
    contact: FormGroup;
    title: String = 'Add';

    constructor(private fb: FormBuilder,
                public dialogRef: MatDialogRef<AddContactComponent>,
                 @Inject(MAT_DIALOG_DATA) public data: any) {}

    ngOnInit() {
        this.contact = this.fb.group({
            first_name: ['', [Validators.required, Validators.minLength(3)]],
            last_name: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', [CustomValidator.checkEmail()]],
            phoneType: ['', []]
        });

        if (Object.keys(this.data).length) {
            this.contact.setValue(this.data);
            this.title = 'Edit';
        }
    }

    close(contact = '') {
        this.dialogRef.close(contact);
    }

    addContact() {
        this.close(this.contact.value);
    }

    checkRequired() {
       if (this.contact.value.phoneType !== '') {
           this.contact.addControl('phone', this.fb.control('', [Validators.required, Validators.pattern(/[0-9]{10}/)]));
       }
    }
}

export class CustomValidator {
    static checkEmail() {
        return (control: AbstractControl) => {
            const regex = /\S+@\S+\.\S+/;
            if (control.value && !regex.test(control.value)) {
                return { validateConfirm: false };
            }

            return null;
        };
    }
}
