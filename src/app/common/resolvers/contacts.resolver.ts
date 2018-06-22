import {ContactsInterface} from '@app/common/interfaces/contacts.interface';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {UsersService} from '@app/common/services/users.service';
import {ContactsService} from '@app/common/services/contacts.service';
import {LogService} from '@app/common/services/log.service';
import {UploadService} from '@app/common/services/upload.service';
import * as _ from 'lodash';
import {Subscriber} from 'rxjs/Subscriber';

@Injectable()
export class ContactsResolver implements Resolve<ContactsInterface> {
    private contacts;
    private contactUrlSubscribe;

    constructor(private usersService: UsersService,
                private uploadService: UploadService,
                private log: LogService,
                private contactsService: ContactsService) {}

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
        try {
            const uid = this.usersService.getUserUid().toString();
            const contactsPromise = await new Promise(resolve => {
                const contactsList = this.contactsService.getContacts();

                if (typeof contactsList === 'undefined' || !contactsList) {
                    this.contacts = this.contactsService
                        .getContactByUid(uid)
                        .map(contacts => {
                            _.forEach(contacts, contact => {
                                contact.url = '';

                                if (typeof contact['image'] !== 'undefined' && contact['image'] !== '') {
                                    this.contactUrlSubscribe = this.uploadService
                                        .getContactImageUrl(uid, contact['image'])
                                        .subscribe(url => {
                                            contact.url = url;
                                        });
                                }
                            });

                            return contacts;
                        })
                        .subscribe(contacts => {
                            this.contactsService.setContacts(contacts);
                            resolve(contacts);
                        });
                } else {
                    resolve(contactsList);
                }

                if (this.contactUrlSubscribe instanceof  Subscriber) {
                    this.contactUrlSubscribe.unsubscribe();
                }
            });

            this.contacts.unsubscribe();
            return contactsPromise;
        } catch (error) {
            const log = {
                level: 'error',
                message: error.message,
                page: 'contacts-resolver.resolve'
            };
            this.log.writeLog(log);
        }
    }
}
