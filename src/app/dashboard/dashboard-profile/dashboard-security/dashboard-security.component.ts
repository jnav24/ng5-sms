import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {FlashMessageComponent} from '@app/dialogs/flash-message/flash-message.component';
import {LoginService} from '@app/onboard/login/login.service';
import {UsersService} from '@app/common/services/users.service';
import {LogService} from '@app/common/services/log.service';
import {LogInterface} from '@app/common/interfaces/log.interface';

@Component({
    selector: 'app-profile-security',
    templateUrl: './dashboard-security.component.html',
    styleUrls: ['./dashboard-security.component.scss']
})
export class DashboardSecurityComponent implements OnInit {
    securityForm: FormGroup;

    constructor(public dialog: MatDialog,
                private log: LogService,
                private loginService: LoginService,
                private usersService: UsersService,
                private fb: FormBuilder) { }

    ngOnInit() {
        this.securityForm = this.fb.group({
            email: ['', [Validators.required, Validators.pattern(/\S+@\S+\.\S+/)]],
            password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(24)]],
            newEmail: ['', [Validators.required, Validators.pattern(/\S+@\S+\.\S+/)]],
            newPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(24)]],
            confirmNewPassword: ['', [Validators.required, CustomValidator.passwordMatch()]]
        });
    }

    updateAuth(): boolean | void {
        if (this.securityForm.value.email === this.securityForm.value.newEmail &&
            this.securityForm.value.password === this.securityForm.value.newPassword) {
            this.dialog.open(FlashMessageComponent, {
                data: {
                    promise: new Promise((resolve, reject) => {
                        reject();
                    }),
                    status: {
                        error: {
                            message: 'Your current and new email and password should not match'
                        }
                    }
                }
            });

            return false;
        }

        this.dialog.open(FlashMessageComponent, {
            data: {
                promise: new Promise((resolve, reject) => {
                   this.loginService
                       .loginUser(this.securityForm.value.email, this.securityForm.value.password)
                       .then(auth => {
                           const emailUpdate = auth.updateEmail(this.securityForm.value.newEmail);
                           const passwordUpdate = auth.updatePassword(this.securityForm.value.newPassword);
                           Promise.all([emailUpdate, passwordUpdate])
                               .then(res => resolve(res))
                               .catch(error => {
                                   const log: LogInterface = {
                                       page: 'edit-profile.security',
                                       level: 'debug',
                                       message: error.message
                                   };
                                   this.log.writeLog(log);
                                   reject();
                               });
                       })
                       .catch(error => {
                           reject();
                       });
                }),
                status: {
                    success: {
                        message: 'Your email and password were updated successfully'
                    },
                    error: {
                        message: 'Unable to update your email and password. Email might have already been taken.'
                    }
                }
            }
        });
    }

    disallowSave() {
        return !this.securityForm.valid;
    }
}

export class CustomValidator {
    static passwordMatch() {
        return (control: AbstractControl) => {
            if (control.value && control.value !== control.root.get('newPassword').value) {
                return { validateConfirm: false };
            }

            return null;
        };
    }
}
