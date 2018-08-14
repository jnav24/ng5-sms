import { TestBed, inject } from '@angular/core/testing';
import { ResetPasswordService } from './reset-password.service';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireModule} from 'angularfire2';
import {environmentConfig} from '@app/config/environment.config';

describe('ResetPasswordService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                AngularFireModule.initializeApp(environmentConfig.firebase),
            ],
            providers: [
                AngularFireAuth,
                ResetPasswordService
            ]
        });
    });

    it('should be created', inject([ResetPasswordService], (service: ResetPasswordService) => {
        expect(service).toBeTruthy();
    }));
});
