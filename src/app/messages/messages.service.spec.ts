import { TestBed, inject } from '@angular/core/testing';
import { MessagesService } from './messages.service';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase} from 'angularfire2/database';
import {environmentConfig} from '@app/config/environment.config';
import {AngularFireModule} from 'angularfire2';
import {AngularFirestore} from 'angularfire2/firestore';

describe('MessagesService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                AngularFireModule.initializeApp(environmentConfig.firebase),
            ],
            providers: [
                AngularFireDatabase,
                AngularFireAuth,
                AngularFirestore,
                MessagesService
            ]
        });
    });

    it('should be created', inject([MessagesService], (service: MessagesService) => {
        expect(service).toBeTruthy();
    }));
});
