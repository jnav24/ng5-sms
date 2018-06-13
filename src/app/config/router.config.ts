import {Route} from '@angular/router';
import {DashboardComponent} from '@app/dashboard/dashboard.component';
import {DashboardAuthGuard} from '@app/dashboard/dashboard-auth.guard';
import {OnboardComponent} from '@app/onboard/onboard.component';
import {UsersResolver} from '@app/common/resolvers/users.resolvers';
import {OnboardGuard} from '@app/onboard/onboard.guard';
import {MessagesComponent} from '@app/messages/messages.component';

export const RouterConfig: Route[] = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: OnboardComponent, canActivate: [OnboardGuard] },
    { path: 'register', component: OnboardComponent, canActivate: [OnboardGuard] },
    { path: 'reset_password', component: OnboardComponent, canActivate: [OnboardGuard] },
    {
        path: 'dashboard',
        component: MessagesComponent,
        // canActivate: [DashboardAuthGuard],
        resolve: { user: UsersResolver },
        children: [
            { path: 'dashboard/messages', component: MessagesComponent, canActivate: [DashboardAuthGuard] }
        ]
    },
    { path: '**', redirectTo: 'login' }
];
