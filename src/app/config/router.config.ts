import {Route} from '@angular/router';
import {DashboardComponent} from '@app/dashboard/dashboard.component';
import {DashboardAuthGuard} from '@app/dashboard/dashboard-auth.guard';
import {OnboardComponent} from '@app/onboard/onboard.component';
import {UsersResolver} from '@app/common/resolvers/users.resolver';
import {OnboardGuard} from '@app/onboard/onboard.guard';
import {MessagesComponent} from '@app/messages/messages.component';
import {ContactsComponent} from '@app/contacts/contacts.component';

export const RouterConfig: Route[] = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: OnboardComponent, canActivate: [OnboardGuard] },
    { path: 'register', component: OnboardComponent, canActivate: [OnboardGuard] },
    { path: 'reset_password', component: OnboardComponent, canActivate: [OnboardGuard] },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [DashboardAuthGuard],
        resolve: { user: UsersResolver }
    },
    { path: 'dashboard/messages', component: MessagesComponent, canActivate: [DashboardAuthGuard] },
    { path: 'dashboard/contacts', component: ContactsComponent, canActivate: [DashboardAuthGuard], resolve: { user: UsersResolver } },
    { path: '**', redirectTo: 'login' }
];
