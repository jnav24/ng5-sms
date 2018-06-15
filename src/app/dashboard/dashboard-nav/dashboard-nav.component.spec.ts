import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardNavComponent } from './dashboard-nav.component';
import {MatProgressSpinnerModule, MatToolbarModule} from '@angular/material';
import {LoginService} from '../../onboard/login/login.service';

class LoginServiceStub {}

describe('DashboardNavComponent', () => {
    let component: DashboardNavComponent;
    let fixture: ComponentFixture<DashboardNavComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ DashboardNavComponent ],
            imports: [
                MatProgressSpinnerModule,
                MatToolbarModule,
            ],
            providers: [
                { provide: LoginService, useClass: LoginServiceStub }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardNavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
