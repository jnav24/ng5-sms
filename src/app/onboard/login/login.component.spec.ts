import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
    MatButtonModule, MatCardModule, MatCheckboxModule, MatIconModule, MatInputModule, MatMenuModule, MatRippleModule,
    MatToolbarModule, MatProgressSpinnerModule
} from '@angular/material';
import {LoginService} from './login.service';
import {LogService} from '@app/common/services/log.service';

class LoginServiceStub {
    loginUser(email, password) {}
}

class LogServiceStub {}

class AuthStub {
    uid;
    getIdToken() {}
}

describe('LoginComponent', () => {
    let component: LoginComponent;
    let service: LoginService;
    let fixture: ComponentFixture<LoginComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ LoginComponent ],
            imports: [
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
                ReactiveFormsModule
            ],
            providers: [
                { provide: LoginService, useClass: LoginServiceStub },
                { provide: LogService, useClass: LogServiceStub }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        service = TestBed.get(LoginService);
        component = fixture.componentInstance;
        component.ngOnInit();
    });

    it('form invalid when empty', () => {
        expect(component.login.valid).toBeFalsy();
    });

    it('email field validity', () => {
        const email = component.login.controls['email'];
        expect(email.valid).toBeFalsy();
    });

    it('email field validity', () => {
        let errors = {};
        const email = component.login.controls['email'];
        errors = email.errors || {};
        expect(errors['required']).toBeTruthy();
    });

    it('should have a valid form', () => {
        component.login.controls['email'].setValue('test@test.com');
        component.login.controls['password'].setValue('123456789');
        expect(component.login.valid).toBeTruthy();
    });

    it('should have submit the form', () => {
        const promise = new Promise((resolve, reject) => {
            const auth = new AuthStub();
            auth.uid = 12345;
            resolve(auth);
        });
        const spyLogin = spyOn(service, 'loginUser').and.returnValue(promise);
        const email = 'test@test.com';
        const password = '123456789';
        component.login.controls['email'].setValue(email);
        component.login.controls['password'].setValue(password);
        component.logUserIn();
        expect(spyLogin).toHaveBeenCalledWith(email, password);
    });
});
