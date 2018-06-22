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
    imageFile: File;
    image: string;

    constructor(private fb: FormBuilder,
                public dialogRef: MatDialogRef<AddContactComponent>,
                 @Inject(MAT_DIALOG_DATA) public data: any) {}

    ngOnInit() {
        this.contact = this.fb.group({
            first_name: ['', [Validators.required, Validators.minLength(3)]],
            last_name: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', [CustomValidator.checkEmail()]],
            phoneType: ['', []],
            image: ['', [CustomValidator.checkImage()]]
        });

        if (Object.keys(this.data).length) {
            this.image = this.data.url || '';
            this.contact.setValue({
                email: this.data.email,
                first_name: this.data.first_name,
                image: '',
                last_name: this.data.last_name,
                phoneType: this.data.phoneType
            });
            this.title = 'Edit';
        }
    }

    close(contact = {}) {
        this.dialogRef.close(contact);
    }

    addContact() {
        const results = {
            form: this.contact.value,
            file: this.imageFile
        };
        this.close(results);
    }

    checkRequired() {
       if (this.contact.value.phoneType !== '') {
           this.contact.addControl('phone', this.fb.control('', [Validators.required, Validators.pattern(/[0-9]{10}/)]));
       }
    }

    detectFiles(event) {
        this.imageFile = event.target.files[0];
        this.loadPreview(this.imageFile);
    }

    loadPreview(file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener('load', () => {
            this.image = reader.result;
        }, false);
    }

    hasContactImage(): boolean {
        return typeof this.image !== 'undefined' && this.image !== '';
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

    static checkImage() {
        return (control: AbstractControl) => {
            const acceptedTypes = [
                'png',
                'jpg',
                'jpeg'
            ];
            const fileList = control.value.split('.');
            const extension = fileList[fileList.length - 1];

            if (control.value && acceptedTypes.indexOf(extension) < 0) {
                return { validateConfirm: false };
            }

            return null;
        };
    }
}
