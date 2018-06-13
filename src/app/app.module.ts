// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    MatButtonModule, MatCardModule, MatCheckboxModule, MatIconModule, MatInputModule, MatMenuModule, MatRippleModule,
    MatToolbarModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFirestore} from 'angularfire2/firestore';

// Config
import { RouterConfig } from '@app/config/router.config';
import {environmentConfig} from '@app/config/environment.config';

// Components
import { AppComponent } from '@app/app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OnboardComponent } from './onboard/onboard.component';
import { LoginComponent } from './onboard/login/login.component';
import { RegisterComponent } from './onboard/register/register.component';
import { ResetPasswordComponent } from './onboard/reset-password/reset-password.component';

// Guard
import {DashboardAuthGuard} from '@app/dashboard/dashboard-auth.guard';
import {OnboardGuard} from '@app/onboard/onboard.guard';

// Resolvers
import {UsersResolver} from '@app/common/resolvers/users.resolvers';

// Services
import {LoginService} from '@app/onboard/login/login.service';
import {RegisterService} from '@app/onboard/register/register.service';
import {FirebaseDbService} from '@app/common/services/firebase-db.service';
import {UsersService} from '@app/common/services/users.service';
import {LogService} from '@app/common/services/log.service';
import {ResetPasswordService} from '@app/onboard/reset-password/reset-password.service';
import {ControlsService} from '@app/common/services/controls.service';



@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        RegisterComponent,
        OnboardComponent,
        LoginComponent,
        ResetPasswordComponent,
    ],
    imports: [
        AngularFireModule.initializeApp(environmentConfig.firebase),
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        MatInputModule,
        MatRippleModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatIconModule,
        MatMenuModule,
        MatToolbarModule,
        ReactiveFormsModule,
        RouterModule.forRoot(RouterConfig),
    ],
    providers: [
        AngularFireDatabase,
        AngularFireAuth,
        AngularFirestore,
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
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
