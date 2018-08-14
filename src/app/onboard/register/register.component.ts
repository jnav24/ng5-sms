import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegisterService} from './register.service';
import {UsersService} from '@app/common/services/users.service';
import {LogService} from '@app/common/services/log.service';
import {UserInterface} from '@app/common/interfaces/user.interface';
import {Router} from '@angular/router';
import {ControlsService} from '@app/common/services/controls.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    @Output() animateTo: EventEmitter<String> = new EventEmitter();
    error: String = '';
    signup: FormGroup;
    allowRegister = true;
    loading: Boolean = false;

    constructor(private fb: FormBuilder,
                private log: LogService,
                private controlsService: ControlsService,
                private router: Router,
                private registerService: RegisterService,
                private usersService: UsersService) { }

    ngOnInit() {
        this.controlsService.allowRegistration().then(res => {
            this.allowRegister = res;
        });

        this.signup = this.fb.group({
            first_name: ['', [Validators.required, Validators.minLength(3)]],
            last_name: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', [Validators.required, Validators.pattern(/\S+@\S+\.\S+/)]],
            password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(24)]],
            confirm_password: ['', [Validators.required, CustomValidator.passwordMatch()]],
        });
    }

    async registerUser() {
        try {
            this.loading = true;
            const response = await this.registerService
                .createNewUser(this.signup.value.email, this.signup.value.password);

            response
                .getIdToken()
                .then(token => {
                    this.animateTo.emit('auth');
                    this.registerService.setIsFromRegister(true);
                    const user: UserInterface = {
                        email: this.signup.value.email,
                        first_name: this.signup.value.first_name,
                        last_name: this.signup.value.last_name,
                        active: true,
                        token: token,
                    };

                    this.usersService
                        .addUser(user, response.uid)
                        .then(res => {})
                        .catch(error => {
                            this.loading = false;
                            const log = {
                                message: error.message,
                                level: 'error',
                                page: 'register.addUser'
                            };
                            this.log.writeLog(log);
                        });
                })
                .catch(error => {
                    this.loading = false;
                    const log = {
                        message: error.message,
                        level: 'error',
                        page: 'register.getIdToken'
                    };
                    this.log.writeLog(log);
                });
        } catch (err) {
            this.loading = false;
            if (err.code === 'auth/email-already-in-use') {
                this.error = 'You already have an account. Did you forget your password?';
            } else {
                this.error = 'An unexpected error has occurred. Please try again.';
            }

            const log = {
                message: `email: ${this.signup.value.email}, message: ${this.error}`,
                level: 'debug',
                page: 'register.createNewUser'
            };
            this.log.writeLog(log);
        }
    }

    animateToLogin() {
        this.animateTo.emit('login');
    }
}

export class CustomValidator {
    static passwordMatch() {
        return (control: AbstractControl) => {
            if (control.value && control.value !== control.root.get('password').value) {
                return { validateConfirm: false };
            }

            return null;
        };
    }
}
