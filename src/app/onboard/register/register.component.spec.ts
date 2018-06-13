import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import {
    MatButtonModule,
    MatCardModule, MatCheckboxModule, MatIconModule, MatInputModule, MatMenuModule, MatRippleModule,
    MatToolbarModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RegisterService} from './register.service';
import {By} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UsersService} from '@app/common/services/users.service';
import {LogService} from '@app/common/services/log.service';
import {Route} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {ControlsService} from '@app/common/services/controls.service';

class RegisterServiceStub {
    createNewUser() {}
}

class UsersServiceStub {}
class LogServiceStub {}
class ControlsServiceStub {
    allowRegistration() {
        return new Promise((resolve) => {
            resolve(true);
        });
    }
}
const routes: Route[] = [];

describe('RegisterComponent', () => {
    let component: RegisterComponent;
    let service: RegisterService;
    let fixture: ComponentFixture<RegisterComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                RegisterComponent,
            ],
            imports: [
                BrowserAnimationsModule,
                FormsModule,
                MatButtonModule,
                MatCardModule,
                MatCheckboxModule,
                MatIconModule,
                MatInputModule,
                MatMenuModule,
                MatRippleModule,
                MatToolbarModule,
                ReactiveFormsModule,
                RouterTestingModule.withRoutes(routes),
            ],
            providers: [
                { provide: RegisterService, useClass: RegisterServiceStub },
                { provide: UsersService, useClass: UsersServiceStub },
                { provide: LogService, useClass: LogServiceStub },
                { provide: ControlsService, useClass: ControlsServiceStub },
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RegisterComponent);
        service = TestBed.get(RegisterService);
        component = fixture.componentInstance;
        component.ngOnInit();
    });

    it('form invalid when empty', () => {
        expect(component.signup.valid).toBeFalsy();
    });

    it('first name field validity', () => {
        const fname = component.signup.controls['first_name'];
        expect(fname.valid).toBeFalsy();
    });

    it('last name field validity', () => {
        const lname = component.signup.controls['last_name'];
        expect(lname.valid).toBeFalsy();
    });

    it('email field validity', () => {
        const email = component.signup.controls['email'];
        expect(email.valid).toBeFalsy();
    });

    it('password field validity', () => {
        const password = component.signup.controls['password'];
        expect(password.valid).toBeFalsy();
    });

    it('should be invalid if passwords do not match', () => {
        const fname = 'Bruce';
        const lname = 'Wayne';
        const email = 'test@test.com';
        const password = 'password';
        const confirm_password = 'Password';
        fixture.detectChanges();
        component.signup.controls['first_name'].setValue(fname);
        component.signup.controls['last_name'].setValue(lname);
        component.signup.controls['email'].setValue(email);
        component.signup.controls['password'].setValue(password);
        component.signup.controls['confirm_password'].setValue(confirm_password);
        // const directive = fixture.debugElement.query(By.directive(RegisterValidationDirective));
        // directive.triggerEventHandler('change', { validateConfirm: false });
        expect(component.signup.valid).toBeFalsy();
    });

    it('should valid if passwords do match', () => {
        const fname = 'Bruce';
        const lname = 'Wayne';
        const email = 'test@test.com';
        const password = 'password';
        const confirm_password = 'password';
        fixture.detectChanges();
        component.signup.controls['first_name'].setValue(fname);
        component.signup.controls['last_name'].setValue(lname);
        component.signup.controls['email'].setValue(email);
        component.signup.controls['password'].setValue(password);
        component.signup.controls['confirm_password'].setValue(confirm_password);
        // const directive = fixture.debugElement.query(By.directive(RegisterValidationDirective));
        // directive.triggerEventHandler('change', { validateConfirm: true });
        expect(component.signup.valid).toBeTruthy();
    });
});
