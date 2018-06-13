import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ResetPasswordService} from '@app/onboard/reset-password/reset-password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
    @Output() animateTo: EventEmitter<String> = new EventEmitter();
    password_reset: FormGroup;
    error: String = '';
    reset: Boolean = false;

    constructor(private fb: FormBuilder,
                private resetPasswordService: ResetPasswordService) { }

    ngOnInit() {
        this.password_reset = this.fb.group({
            email: ['', [Validators.required, Validators.pattern(/\S+@\S+\.\S+/)]],
        });
    }

    resetPassword() {
        this.error = '';
        this.resetPasswordService
            .resetPassword(this.password_reset.value.email)
            .then(response => {
                this.reset = true;
                this.password_reset.reset();

                setTimeout(() => {
                    this.reset = false;
                }, 10000);
            })
            .catch(error => {
                if (error.code === 'auth/user-not-found') {
                    this.error = 'Sorry. Can not find a user with that email.';
                }
                console.log(error);
            });
    }

    animateToLogin() {
        this.animateTo.emit('login');
    }
}
