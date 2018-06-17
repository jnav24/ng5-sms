import {ContactsInterface} from '@app/common/interfaces/contacts.interface';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {UsersService} from '@app/common/services/users.service';
import {ContactsService} from '@app/common/services/contacts.service';

@Injectable()
export class ContactsResolver implements Resolve<ContactsInterface> {
    constructor(private usersService: UsersService,
                private contactsService: ContactsService) {}

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
        try {
            const uid = this.usersService.getUserUid().toString();
            return new Promise(resolve => {
                const contacts = [
                    { first_name: 'Michael', last_name: 'Navarro', email: 'mnavarro@test.com', mobile: '(954) 321-7654' },
                    { first_name: 'Alan', last_name: 'Read', email: 'aread22@test.com', mobile: '(305) 123-4567' },
                    { first_name: 'Mark', last_name: 'Henry', email: 'mhenry@test.com', mobile: '(305) 246-9753' },
                    { first_name: 'Angelo', last_name: 'Henry', email: 'mhenry@test.com', mobile: '(305) 246-9753' },
                    { first_name: 'Azru', last_name: 'Henry', email: 'mhenry@test.com', mobile: '(305) 246-9753' },
                    { first_name: 'Bob', last_name: 'Henry', email: 'mhenry@test.com', mobile: '(305) 246-9753' },
                    { first_name: 'Lola', last_name: 'Henry', email: 'mhenry@test.com', mobile: '(305) 246-9753' },
                    { first_name: 'Coko', last_name: 'Henry', email: 'mhenry@test.com', mobile: '(305) 246-9753' },
                    { first_name: 'Vanessa', last_name: 'Henry', email: 'mhenry@test.com', mobile: '(305) 246-9753' },
                    { first_name: 'Stephen', last_name: 'Henry', email: 'mhenry@test.com', mobile: '(305) 246-9753' },
                    { first_name: 'Robert', last_name: 'Henry', email: 'mhenry@test.com', mobile: '(305) 246-9753' },
                    { first_name: 'Tom', last_name: 'Henry', email: 'mhenry@test.com', mobile: '(305) 246-9753' },
                    { first_name: 'Jorge', last_name: 'Henry', email: 'mhenry@test.com', mobile: '(305) 246-9753' },
                ];
                this.contactsService.setContacts(contacts);
                resolve(contacts);
            });
        } catch (error) {}
    }
}
