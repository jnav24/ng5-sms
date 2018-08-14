import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoginService} from '@app/onboard/login/login.service';
import {ActivatedRoute, RouterOutlet} from '@angular/router';
import {UserInterface} from '@app/common/interfaces/user.interface';
import {animate, group, query, state, style, transition, trigger} from '@angular/animations';
import {RegisterService} from '@app/onboard/register/register.service';
import {UsersService} from '@app/common/services/users.service';
import {Store} from 'ngxs';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [
        trigger('fromLogin', [
            transition('* => login', animate('1250ms ease-in', style({
                opacity: 0,
                top: '-9999px'
            }))),
            transition('* => logout', animate('1250ms ease-out', style({
                opacity: 1,
                top: '0'
            }))),
        ]),
        trigger('showMenu', [
            transition('* => login', [
                query(':self', style({ transform: 'translateY(-100%)' })),
                query('.nav__logo, .nav__profile', style({ opacity: 0 })),
                query(':self', animate('500ms 350ms ease-out', style({
                    transform: 'translateY(0)'
                }))),
                query('.nav__logo, .nav__profile', animate(500, style({ opacity: 1 }))),
            ]),
            transition('* => logout', [
                query(':self', style({ transform: 'translateY(0)' })),
                query('.nav__logo, .nav__profile', style({ opacity: 0 })),
                query(':self', animate('500ms 150ms ease-in', style({
                    transform: 'translateY(-100%)'
                }))),
                query('.nav__logo, .nav__profile', animate(500, style({ opacity: 0 }))),
            ]),
        ]),
        trigger('fadeIn', [
            state('logout', style({
                opacity: 0,
                transform: 'translateY(-50%)'
            })),
            state('login', style({
                opacity: 1,
                transform: 'translateY(0)'
            })),
            transition('* => login', [
                animate('500ms 800ms ease-out')
            ]),
            transition('* => logout', [
                animate('500ms ease-in')
            ])
        ]),
        trigger('routerTransition', [
            transition('* <=> *', [
                query(':enter, :leave', style({ position: 'absolute', width: '100%' })),
                group([
                    query(':enter', [
                        style({ opacity: 0, transform: 'translateX(25%)' }),
                        animate('500ms ease-in-out', style({ opacity: 1, transform: 'translateX(0)' }))
                    ]),
                    query(':leave', [
                        style({ opacity: 1, transform: 'translateX(0)' }),
                        animate('200ms ease-out', style({ opacity: 0, transform: 'translateX(-25%)' }))
                    ], { optional: true}),
                ])
            ]),
        ])
    ]
})
export class DashboardComponent implements OnInit, OnDestroy {
    fromLoginState: String;
    showMenuState: String;
    fadeState: String;
    showLoginAnimate: Boolean = false;
    showMenuAnimate: Boolean = false;
    user: UserInterface;
    private userSubscription: Subscription;

    constructor(private loginService: LoginService,
                private registerService: RegisterService,
                private usersService: UsersService,
                private store: Store,
                private route: ActivatedRoute) {}

    ngOnInit() {
        this.userSubscription = this.store
            .select(state => state.user)
            .subscribe(user => this.user = user);
        this.animateFromLogin();
    }

    ngOnDestroy() {
        this.userSubscription.unsubscribe();
    }

    private animateFromLogin() {
        if (this.loginService.isFromLogin() || this.registerService.isFromRegister()) {
            this.showLoginAnimate = true;
            this.fromLoginState = 'login';
            this.showMenuState = 'login';
            this.fadeState = 'login';
            this.loginService.setIsFromLogin(false);
        }
    }

    setAnimateState() {
        if (this.fromLoginState === 'logout') {
            this.showLoginAnimate = true;
        } else {
            this.showLoginAnimate = false;
        }
    }

    setMenuAnimateState() {
        if (this.showMenuState === 'logout') {
            this.showMenuAnimate = true;
        }
    }

    getRouteState(outlet: RouterOutlet) {
        return outlet.activatedRouteData['page'];
    }

    hasImage() {
        return typeof this.user.image !== 'undefined' && this.user.image.trim().length;
    }

    logout() {
        this.fromLoginState = 'logout';
        this.showMenuState = 'logout';
        this.fadeState = 'logout';
        setTimeout(() => {
            return this.loginService.logOutAndRedirect();
        }, 2000);
    }
}
