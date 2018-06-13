import {TestBed, async, ComponentFixture, fakeAsync} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterConfig } from '@app/config/router.config';
import { AppComponent } from './app.component';
import {OnboardComponent} from '@app/onboard/onboard.component';
import {DashboardComponent} from '@app/dashboard/dashboard.component';
import {Router, RouterOutlet, Route} from '@angular/router';
import {Location} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
    MatButtonModule, MatCardModule, MatCheckboxModule, MatIconModule, MatInputModule, MatMenuModule, MatRippleModule,
    MatToolbarModule
} from '@angular/material';
import {By} from '@angular/platform-browser';
import {RegisterComponent} from '@app/onboard/register/register.component';
import {ResetPasswordComponent} from '@app/onboard/reset-password/reset-password.component';
import {LoginComponent} from '@app/onboard/login/login.component';
import {DashboardAuthGuard} from '@app/dashboard/dashboard-auth.guard';
import {OnboardGuard} from '@app/onboard/onboard.guard';

const routes: Route[] = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: OnboardComponent },
    { path: 'reset_password', component: OnboardComponent },
    { path: 'register', component: OnboardComponent },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [DashboardAuthGuard],
        children: [
            { path: ':uid', component: DashboardComponent }
        ]
    },
    { path: '**', redirectTo: 'login' }
];

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let router: Router;
    let location: Location;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                OnboardComponent,
                LoginComponent,
                RegisterComponent,
                ResetPasswordComponent,
                DashboardComponent
            ],
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
                ReactiveFormsModule,
                RouterTestingModule.withRoutes(routes)
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        router = TestBed.get(Router);
        location = TestBed.get(Location);
        fixture = TestBed.createComponent(AppComponent);
        router.initialNavigation();
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create an app', () => {
        expect(component).toBeTruthy();
    });

    it('should have a router outlet', () => {
        const outlet = fixture.debugElement.query(By.directive(RouterOutlet));
        expect(outlet).not.toBeNull();
    });

    it('navigate to "" redirects you to login page', <any>fakeAsync(() => {
        router.navigate([''])
            .then(() => {
                expect(router.url).toEqual('/');
            });
    }));

    it('random string should redirect you to login page', <any>fakeAsync(() => {
        router.navigate(['pizza'])
            .then(() => {
                expect(router.url).toEqual('/');
            });
    }));

    it('"login" should redirect you to login page', <any>fakeAsync(() => {
        router.navigate(['login'])
            .then(() => {
                expect(router.url).toEqual('/');
            });
    }));

    it('"dashboard" should redirect you to login page', <any>fakeAsync(() => {
        router.navigate(['dashboard'])
            .then(() => {
                expect(router.url).toEqual('/');
            });
    }));

    it('should contain a route for /login', () => {
        expect(RouterConfig).toContain({ path: 'login', component: OnboardComponent, canActivate: [OnboardGuard] });
    });

    it('should contain a route for /register', () => {
        expect(RouterConfig).toContain({ path: 'register', component: OnboardComponent, canActivate: [OnboardGuard] });
    });

    it('should contain a route for /reset_password', () => {
        expect(RouterConfig).toContain({ path: 'reset_password', component: OnboardComponent, canActivate: [OnboardGuard] });
    });
});
