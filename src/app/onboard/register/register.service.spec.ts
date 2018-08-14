import { TestBed, inject } from '@angular/core/testing';
import { RegisterService } from './register.service';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireModule} from 'angularfire2';
import {environmentConfig} from '@app/config/environment.config';

describe('RegisterService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                AngularFireModule.initializeApp(environmentConfig.firebase),
            ],
            providers: [
                AngularFireDatabase,
                AngularFireAuth,
                RegisterService,
            ]
        });
    });

    it('should be created', inject([RegisterService], (service: RegisterService) => {
        expect(service).toBeTruthy();
    }));
});
