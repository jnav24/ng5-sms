import {ContactsInterface} from '@app/common/interfaces/contacts.interface';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {UsersService} from '@app/common/services/users.service';

@Injectable()
export class ContactsResolver implements Resolve<ContactsInterface> {
    constructor(private usersService: UsersService) {}

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
        try {
            const uid = this.usersService.getUserUid().toString();
            return new Promise(resolve => { resolve(); });
        } catch (error) {}
    }
}
