// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    MatButtonModule, MatCardModule, MatCheckboxModule, MatIconModule, MatInputModule, MatMenuModule, MatRippleModule,
    MatToolbarModule, MatProgressSpinnerModule, MatTabsModule, MatDialogModule, MatGridListModule, MatTableModule, MatPaginatorModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFirestore} from 'angularfire2/firestore';
import {NgxsModule} from 'ngxs';

// Config
import { RouterConfig } from '@app/config/router.config';
import {environmentConfig} from '@app/config/environment.config';

// Components
import { AppComponent } from '@app/app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardHomeComponent } from './dashboard/dashboard-home/dashboard-home.component';
import { DashboardProfileComponent } from './dashboard/dashboard-profile/dashboard-profile.component';
import { OnboardComponent } from './onboard/onboard.component';
import { LoginComponent } from './onboard/login/login.component';
import { RegisterComponent } from './onboard/register/register.component';
import { ResetPasswordComponent } from './onboard/reset-password/reset-password.component';

// Guard
import {DashboardAuthGuard} from '@app/dashboard/dashboard-auth.guard';
import {OnboardGuard} from '@app/onboard/onboard.guard';

// Resolvers
import {UsersResolver} from '@app/common/resolvers/users.resolvers';

// States
import {UserState} from '@app/common/states/user.state';

// Services
import {LoginService} from '@app/onboard/login/login.service';
import {RegisterService} from '@app/onboard/register/register.service';
import {FirebaseDbService} from '@app/common/services/firebase-db.service';
import {UsersService} from '@app/common/services/users.service';
import {LogService} from '@app/common/services/log.service';
import {ResetPasswordService} from '@app/onboard/reset-password/reset-password.service';
import {ControlsService} from '@app/common/services/controls.service';
import { DashboardEditProfileComponent } from './dashboard/dashboard-profile/dashboard-edit-profile/dashboard-edit-profile.component';
import { FlashMessageComponent } from './dialogs/flash-message/flash-message.component';
import { DashboardSecurityComponent } from './dashboard/dashboard-profile/dashboard-security/dashboard-security.component';
import {UploadService} from '@app/common/services/upload.service';
import {AngularFireStorage} from 'angularfire2/storage';
import { DashboardLogsComponent } from './dashboard/dashboard-logs/dashboard-logs.component';



@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        RegisterComponent,
        OnboardComponent,
        LoginComponent,
        ResetPasswordComponent,
        DashboardProfileComponent,
        DashboardHomeComponent,
        DashboardEditProfileComponent,
        FlashMessageComponent,
        DashboardSecurityComponent,
        DashboardLogsComponent,
    ],
    imports: [
        AngularFireModule.initializeApp(environmentConfig.firebase),
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatDialogModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatTabsModule,
        MatTableModule,
        MatToolbarModule,
        NgxsModule.forRoot([
            UserState
        ]),
        ReactiveFormsModule,
        RouterModule.forRoot(RouterConfig),
    ],
    providers: [
        AngularFireDatabase,
        AngularFireAuth,
        AngularFirestore,
        AngularFireStorage,
        FirebaseDbService,
        LoginService,
        RegisterService,
        OnboardGuard,
        DashboardAuthGuard,
        UsersService,
        UsersResolver,
        LogService,
        ResetPasswordService,
        ControlsService,
        UploadService,
    ],
    entryComponents: [
       FlashMessageComponent,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
