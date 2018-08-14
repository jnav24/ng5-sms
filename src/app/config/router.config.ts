import {Route} from '@angular/router';
import {DashboardComponent} from '@app/dashboard/dashboard.component';
import {DashboardAuthGuard} from '@app/dashboard/dashboard-auth.guard';
import {OnboardComponent} from '@app/onboard/onboard.component';
import {UsersResolver} from '@app/common/resolvers/users.resolvers';
import {OnboardGuard} from '@app/onboard/onboard.guard';
import {DashboardHomeComponent} from '@app/dashboard/dashboard-home/dashboard-home.component';
import {DashboardProfileComponent} from '@app/dashboard/dashboard-profile/dashboard-profile.component';
import {DashboardLogsComponent} from '@app/dashboard/dashboard-logs/dashboard-logs.component';

export const RouterConfig: Route[] = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: OnboardComponent, canActivate: [OnboardGuard] },
    { path: 'register', component: OnboardComponent, canActivate: [OnboardGuard] },
    { path: 'reset_password', component: OnboardComponent, canActivate: [OnboardGuard] },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [DashboardAuthGuard],
        resolve: { user: UsersResolver },
        children: [
            { path: '', component: DashboardHomeComponent, data: { page: 'home'} },
            { path: 'edit/profile', component: DashboardProfileComponent, data: { page: 'edit-profile'} },
            { path: 'logs', component: DashboardLogsComponent, data: { page: 'logs'} }
        ]
    },
    { path: '**', redirectTo: 'login' }
];
