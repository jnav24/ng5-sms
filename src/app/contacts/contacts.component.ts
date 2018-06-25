import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {AddContactComponent} from '@app/dialogs/add-contact/add-contact.component';
import {ContactsService} from '@app/contacts/contacts.service';
import {UsersService} from '@app/common/services/users.service';
import {ContactsInterface} from '@app/common/interfaces/contacts.interface';
import * as _ from 'lodash';
import {UploadService} from '@app/common/services/upload.service';
import {FlashMessageComponent} from '@app/dialogs/flash-message/flash-message.component';

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

    flashMessage(result, id = null, url = '') {
        const flashDialog = this.dialog.open(FlashMessageComponent, {
            data: {
                condition: (docRef) => {
                    return docRef.id;
                },
                promise: this.contactsService.saveContact(result.form, this.usersService.getUserUid().toString()),
                status: {
                    success: {
                        title: 'Success!',
                        message: `${result.form.first_name} ${result.form.last_name} was successfully added to contacts`
                    },
                    error: {
                        title: 'Oh No...',
                        message: `Failed to add ${result.form.first_name} ${result.form.last_name} as a contact`
                    }
                }
            }
        });

        flashDialog
            .afterClosed()
            .toPromise()
            .then(flashResult => {
                if (flashResult.success) {
                    this.saveContact(id, result.form, url);
                } else {
                    // open the dialog again
                }
            });
    }

    addContact() {
        const dialogRef = this.dialog.open(AddContactComponent, {
            width: '800px',
            data: {}
        });

        dialogRef.afterClosed().toPromise().then(result => {
            if (typeof result.form !== 'undefined') {
                if (typeof result.file !== 'undefined') {
                    const filename = this.uploadService.getContactPath(this.usersService.getUserUid().toString(), result.file.name);
                    const upload = this.uploadService.uploadFile(filename, result.file);

                    upload
                        .then(res => {
                            if (res.state === 'success') {
                                result.form.image = this.uploadService.getImageName(filename);
                                this.flashMessage(result, null, res.downloadURL);
                            }
                        })
                        .catch(error => {
                            this.dialog.open(FlashMessageComponent, {
                                data: {
                                    promise: new Promise((resolve, reject) => {
                                        reject('failed');
                                    }),
                                    status: {
                                        error: {
                                            title: 'Error',
                                            message: 'Something unexpected happen while uploading your image.'
                                        }
                                    }
                                }
                            });
                        });
                } else {
                    this.flashMessage(result);
                }
            }
        });
    }

    editContact(int: number, letter: string) {
        const id = this.contacts[letter][int]['id'];
        delete this.contacts[letter][int]['id'];
        if (typeof this.contacts[letter][int].image === 'undefined') {
            this.contacts[letter][int].image = '';
        }

        const dialogRef = this.dialog.open(AddContactComponent, {
            width: '800px',
            data: this.contacts[letter][int]
        });

        dialogRef.afterClosed().subscribe(result => {
            if (typeof result.form !== 'undefined') {
                if (typeof result.file !== 'undefined') {
                    const filename = this.uploadService.getContactPath(this.usersService.getUserUid().toString(), result.file.name);
                    const upload = this.uploadService.uploadFile(filename, result.file);

                    upload.then(res => {
                        if (res.state === 'success') {
                            result.form.image = this.uploadService.getImageName(filename);
                            this.removeContact(int, letter);
                            this.contactsService.updateContact(id, this.usersService.getUserUid().toString(), result.form);
                            this.saveContact(id, result.form, res.downloadURL);
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

    private saveContact(id: string|null, data: ContactsInterface, url: string = '') {
        if (id !== null && id !== '') {
            data.id = id;
        }

        if (url !== '') {
            data['url'] = url;
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
