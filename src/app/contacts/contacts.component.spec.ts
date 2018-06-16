import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactsComponent } from './contacts.component';
import {DashboardNavComponent} from '../dashboard/dashboard-nav/dashboard-nav.component';
import {MatToolbarModule} from '@angular/material';
import {LoginService} from '../onboard/login/login.service';

class LoginServiceStub {}
describe('ContactsComponent', () => {
    let component: ContactsComponent;
    let fixture: ComponentFixture<ContactsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ContactsComponent,
                DashboardNavComponent,
            ],
            imports: [
                MatToolbarModule
            ],
            providers: [
                { provide: LoginService, useClass: LoginServiceStub }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ContactsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
