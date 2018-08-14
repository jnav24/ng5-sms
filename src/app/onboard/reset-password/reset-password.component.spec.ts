import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ResetPasswordComponent } from './reset-password.component';
import {
    MatButtonModule, MatCardModule, MatCheckboxModule, MatIconModule, MatInputModule, MatMenuModule, MatRippleModule,
    MatToolbarModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ResetPasswordService} from '@app/onboard/reset-password/reset-password.service';

class ResetPasswordServiceStub {}

describe('ResetPasswordComponent', () => {
    let component: ResetPasswordComponent;
    let fixture: ComponentFixture<ResetPasswordComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ResetPasswordComponent ],
            imports: [
                FormsModule,
                MatButtonModule,
                MatCardModule,
                MatCheckboxModule,
                MatIconModule,
                MatInputModule,
                MatMenuModule,
                MatRippleModule,
                MatToolbarModule,
                ReactiveFormsModule
            ],
            providers: [
                {provide: ResetPasswordService, useClass: ResetPasswordServiceStub }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ResetPasswordComponent);
        component = fixture.componentInstance;
        component.ngOnInit();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have a valid email', () => {
        const email = 'test@test.com';
        component.password_reset.controls['email'].setValue(email);
        expect(component.password_reset.valid).toBeTruthy();
    });

    it('should have a invalid email', () => {
        const email = 'testtest.com';
        component.password_reset.controls['email'].setValue(email);
        expect(component.password_reset.valid).toBeFalsy();
    });
});
