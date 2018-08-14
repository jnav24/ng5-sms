import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginService} from './login.service';
import {LogService} from '@app/common/services/log.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    @Output() animateTo: EventEmitter<String> = new EventEmitter();
    error: String = '';
    login: FormGroup;
    loading: Boolean = false;

    constructor(private fb: FormBuilder,
                private log: LogService,
                private loginService: LoginService) { }

    ngOnInit() {
        this.login = this.fb.group({
            email: ['', [Validators.required, Validators.pattern(/\S+@\S+\.\S+/)]],
            password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(24)]],
            remember_me: ['', []]
        });
    }

    logUserIn() {
        this.loading = true;
        this.loginService
            .loginUser(this.login.value.email, this.login.value.password)
            .then(auth => {
                this.loginService.setIsFromLogin(true);
                auth.getIdToken().then(token => {
                    if (this.login.value.remember_me) {
                        this.loginService.setRememberMe(auth.uid, true);
                    } else {
                        this.loginService.setRememberMe(auth.uid, false);
                    }

                    this.loginService.saveToken(token, auth.uid);
                    this.animateTo.emit('auth');
                });
            })
            .catch(error => {
                this.error = 'Email and/or password is invalid';
                this.loading = false;
                const log = {
                    level: 'error',
                    page: 'login.logUserIn',
                    message: error.message
                };
                this.log.writeLog(log);
            });
    }

    animateToRegister() {
        this.animateTo.emit('register');
    }

    animateToResetPassword() {
        this.animateTo.emit('reset_password');
    }
}
