import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {UsersService} from '@app/common/services/users.service';

@Injectable()
export class OnboardGuard implements CanActivate {
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private usersService: UsersService) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> {
        return Observable.create(obs => {
            this.usersService
                .getAuth()
                .onAuthStateChanged(authenticated => {
                    if (authenticated !== null) {
                        this.usersService.setUserUid(authenticated.uid);
                        obs.next(false);
                        this.router.navigate(['dashboard']);
                    }

                    obs.next(true);
                });
        });
    }
}
