import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import {UsersService} from '@app/common/services/users.service';

@Component({
    selector: 'app-onboard',
    templateUrl: './onboard.component.html',
    styleUrls: ['./onboard.component.scss'],
    animations: [
        trigger('animateSwitchForm', [
            state('switch-start', style({
                backgroundColor: '#fff',
                opacity: 1,
                top: '50px',
                zIndex: 1
            })),
            state('switch-finish', style({
                backgroundColor: '#000',
            })),
            transition('switch-start => switch-finish', [
                animate(500, style({
                    backgroundColor: '#cfc',
                    opacity: 0,
                    top: '-999px',
                    zIndex: 1
                }))
            ])
        ]),
        trigger('animateFadeForm', [
            state('fade-start', style({
                opacity: 0
            })),
            state('fade-finish', style({
                opacity: 1
            })),
            transition('fade-start => fade-finish', animate(500))
        ])
    ]
})
export class OnboardComponent implements OnInit {
    animateLoginSwitchState: string;
    animateLoginFadeState: string;
    animateRegisterSwitchState: string;
    animateRegisterFadeState: string;
    animatePasswordSwitchState: string;
    animatePasswordFadeState: string;

    constructor(private route: ActivatedRoute,
                private usersService: UsersService,
                private location: Location) { }

    ngOnInit() {
        if (this.route.snapshot.url.length && typeof this.route.snapshot.url[0].path !== 'undefined') {
            this.animateState(this.route.snapshot.url[0].path);
        } else {
            this.animateState('login');
        }
    }

    animateToRegister() {
        this.animateLoginSwitchState = 'switch-finish';
        this.animateLoginFadeState = 'fade-start';
        this.animateRegisterSwitchState = 'switch-start';
        this.animateRegisterFadeState = 'fade-finish';
    }

    animateToLogin() {
        this.animateLoginSwitchState = 'switch-start';
        this.animateLoginFadeState = 'fade-finish';
        this.animateRegisterSwitchState = 'switch-finish';
        this.animateRegisterFadeState = 'fade-start';
        this.animatePasswordSwitchState = 'switch-finish';
        this.animatePasswordFadeState = 'fade-start';
    }

    animateToResetPassword() {
        this.animateLoginSwitchState = 'switch-finish';
        this.animateLoginFadeState = 'fade-start';
        this.animatePasswordSwitchState = 'switch-start';
        this.animatePasswordFadeState = 'fade-finish';
    }

    animateState(stateName: String) {
        switch (stateName) {
            case 'reset_password':
                this.location.replaceState('reset_password');
                this.animateToResetPassword();
                break;
            case 'register':
                this.location.replaceState('register');
                this.animateToRegister();
                break;
            case 'login':
            default:
                this.location.replaceState('login');
                this.animateToLogin();
                break;
        }
    }
}
