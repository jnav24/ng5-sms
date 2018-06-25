// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    MatButtonModule, MatCardModule, MatCheckboxModule, MatIconModule, MatInputModule, MatMenuModule, MatRippleModule,
    MatToolbarModule, MatProgressSpinnerModule, MatGridListModule, MatDialogModule, MatSelectModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFirestore} from 'angularfire2/firestore';
import {AngularFireStorage} from 'angularfire2/storage';
import {MomentModule} from 'angular2-moment';

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
import { MessagesComponent } from './messages/messages.component';
import { DashboardNavComponent } from './dashboard/dashboard-nav/dashboard-nav.component';
import { ContactsComponent } from './contacts/contacts.component';
import { AddContactComponent } from './dialogs/add-contact/add-contact.component';

// Guard
import {DashboardAuthGuard} from '@app/dashboard/dashboard-auth.guard';
import {OnboardGuard} from '@app/onboard/onboard.guard';

// Resolvers
import {UsersResolver} from '@app/common/resolvers/users.resolver';
import {ContactsResolver} from '@app/common/resolvers/contacts.resolver';

// Services
import {LoginService} from '@app/onboard/login/login.service';
import {RegisterService} from '@app/onboard/register/register.service';
import {FirebaseDbService} from '@app/common/services/firebase-db.service';
import {UsersService} from '@app/common/services/users.service';
import {LogService} from '@app/common/services/log.service';
import {ResetPasswordService} from '@app/onboard/reset-password/reset-password.service';
import {ControlsService} from '@app/common/services/controls.service';
import {ContactsService} from '@app/contacts/contacts.service';
import {MessagesService} from '@app/messages/messages.service';
import {UploadService} from '@app/common/services/upload.service';
import { FlashMessageComponent } from './dialogs/flash-message/flash-message.component';




@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        RegisterComponent,
        OnboardComponent,
        LoginComponent,
        ResetPasswordComponent,
        MessagesComponent,
        DashboardNavComponent,
        ContactsComponent,
        AddContactComponent,
        FlashMessageComponent,
    ],
    imports: [
        AngularFireModule.initializeApp(environmentConfig.firebase),
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        MatDialogModule,
        MatSelectModule,
        MatInputModule,
        MatRippleModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatIconModule,
        MatGridListModule,
        MatMenuModule,
        MatProgressSpinnerModule,
        MatToolbarModule,
        MomentModule,
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
        ContactsResolver,
        LogService,
        ResetPasswordService,
        ControlsService,
        ContactsService,
        MessagesService,
        UploadService,
    ],
    entryComponents: [
        AddContactComponent,
        FlashMessageComponent,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
