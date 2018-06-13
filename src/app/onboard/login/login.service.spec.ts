import { TestBed, inject } from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import { LoginService } from './login.service';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireModule} from 'angularfire2';
import {environmentConfig} from '@app/config/environment.config';
import {FirebaseDbService} from '@app/common/services/firebase-db.service';
import {AngularFirestore} from 'angularfire2/firestore';
import {OnboardComponent} from '@app/onboard/onboard.component';
import {Route} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {LogService} from '@app/common/services/log.service';


const routes: Route[] = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: OnboardComponent },
    { path: '**', redirectTo: 'login' }
];

describe('LoginService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                OnboardComponent,
            ],
            imports: [
                AngularFireModule.initializeApp(environmentConfig.firebase),
                RouterTestingModule.withRoutes(routes),
            ],
            providers: [
                AngularFireDatabase,
                AngularFireAuth,
                AngularFirestore,
                LoginService,
                LogService,
                FirebaseDbService,
            ],
            schemas: [NO_ERRORS_SCHEMA]
        });
    });

    it('should be created', inject([LoginService], (service: LoginService) => {
        expect(service).toBeTruthy();
    }));
});
