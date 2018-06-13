import {Injectable} from '@angular/core';
import {environmentConfig} from '@app/config/environment.config';

@Injectable()
export class FirebaseDbService {
    isFirebase() {
        this.verifyConfig(environmentConfig['firebase-type']);
        return environmentConfig['firebase-type']['set'] === 'firebase';
    }

    isFirestore() {
        this.verifyConfig(environmentConfig['firebase-type']);
        return environmentConfig['firebase-type']['set'] === 'firestore';
    }

    private verifyConfig(value) {
        let errMsg;

        if (!environmentConfig['firebase-type']) {
            errMsg = 'Missing Firebase Settings';
            console.error(errMsg);
            throw errMsg;
        }

        if (environmentConfig['firebase-type']['options'].indexOf(environmentConfig['firebase-type']['set']) < 0) {
            errMsg = 'Firebase settings are not valid.';
            console.error(errMsg);
            throw errMsg;
        }
    }
}
