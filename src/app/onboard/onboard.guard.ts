import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {UsersService} from '@app/common/services/users.service';
import {LoginService} from '@app/onboard/login/login.service';
import {RegisterService} from '@app/onboard/register/register.service';

@Injectable()
export class OnboardGuard implements CanActivate {
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private loginService: LoginService,
        private registerService: RegisterService,
        private usersService: UsersService) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> {
        return Observable.create(obs => {
            this.usersService
                .getAuth()
                .onAuthStateChanged(authenticated => {
                    if (authenticated !== null) {
                        this.usersService.setUserUid(authenticated.uid);
                        if (this.loginService.isFromLogin() || this.registerService.isFromRegister()) {
                            setTimeout(() => {
                                obs.next(false);
                                this.router.navigate(['dashboard']);
                            }, 1200);
                        } else {
                            obs.next(false);
                            this.router.navigate(['dashboard']);
                        }
                    }

                    obs.next(true);
                });
        });
    }
}
