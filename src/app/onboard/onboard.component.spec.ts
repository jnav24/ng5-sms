import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OnboardComponent } from './onboard.component';
import {LoginComponent} from '@app/onboard/login/login.component';
import {RegisterComponent} from '@app/onboard/register/register.component';
import {
    MatButtonModule, MatCardModule, MatCheckboxModule, MatIconModule, MatInputModule, MatMenuModule, MatRippleModule,
    MatToolbarModule, MatProgressSpinnerModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginService} from '@app/onboard/login/login.service';
import {RegisterService} from '@app/onboard/register/register.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {By} from '@angular/platform-browser';
import {ResetPasswordComponent} from '@app/onboard/reset-password/reset-password.component';
import { Route } from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {UsersService} from '@app/common/services/users.service';
import {LogService} from '@app/common/services/log.service';
import {ResetPasswordService} from '@app/onboard/reset-password/reset-password.service';
import {ControlsService} from '@app/common/services/controls.service';

const routes: Route[] = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: OnboardComponent },
    { path: 'reset_password', component: OnboardComponent },
    { path: 'register', component: OnboardComponent },
    { path: '**', redirectTo: 'login' }
];

class RegisterServiceStub {}
class LoginServiceStub {}
class UsersServiceStub {}
class LogServiceStub {}
class ControlsServiceStub {
    allowRegistration() {
        return new Promise((resolve) => {
            resolve(true);
        });
    }
}
class ResetPasswordServiceStub {}

describe('OnboardComponent', () => {
    let component: OnboardComponent;
    let fixture: ComponentFixture<OnboardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                OnboardComponent,
                LoginComponent,
                RegisterComponent,
                ResetPasswordComponent,
            ],
            imports: [
                BrowserAnimationsModule,
                FormsModule,
                MatButtonModule,
                MatCardModule,
                MatCheckboxModule,
                MatIconModule,
                MatInputModule,
                MatProgressSpinnerModule,
                MatMenuModule,
                MatRippleModule,
                MatToolbarModule,
                ReactiveFormsModule,
                RouterTestingModule.withRoutes(routes)
            ],
            providers: [
                { provide: LoginService, useClass: LoginServiceStub },
                { provide: RegisterService, useClass: RegisterServiceStub },
                { provide: UsersService, useClass: UsersServiceStub },
                { provide: LogService, useClass: LogServiceStub },
                { provide: ResetPasswordService, useClass: ResetPasswordServiceStub },
                { provide: ControlsService, useClass: ControlsServiceStub },
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OnboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have login component', () => {
        const loginTag = fixture.debugElement.query(By.css('app-login'));
        expect(loginTag).not.toBeNull();
    });

    it('should have register component', () => {
        const registerTag = fixture.debugElement.query(By.css('app-register'));
        expect(registerTag).not.toBeNull();
    });

    it('should have reset component', () => {
        const registerTag = fixture.debugElement.query(By.css('app-reset-password'));
        expect(registerTag).not.toBeNull();
    });
});
