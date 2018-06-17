import {ContactsInterface} from '@app/common/interfaces/contacts.interface';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {UsersService} from '@app/common/services/users.service';
import {ContactsService} from '@app/common/services/contacts.service';
import {LogService} from '@app/common/services/log.service';

@Injectable()
export class ContactsResolver implements Resolve<ContactsInterface> {
    private contacts;

    constructor(private usersService: UsersService,
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
                        .subscribe(contacts => {
                            this.contactsService.setContacts(contacts);
                            resolve(contacts);
                        });
                } else {
                    resolve(contactsList);
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
