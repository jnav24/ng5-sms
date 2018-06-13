import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFirestore} from 'angularfire2/firestore';
import {FirebaseDbService} from '@app/common/services/firebase-db.service';
import {LogService} from '@app/common/services/log.service';

@Injectable()
export class ControlsService {
    constructor(private fdb: FirebaseDbService,
                private log: LogService,
                private af: AngularFireDatabase,
                private afs: AngularFirestore) {}

    async allowRegistration() {
        try {
            let results;

            if (this.fdb.isFirebase()) {
                results = await this.af.database
                    .ref('controls/registration')
                    .once('value');

                if (typeof results.val()['allow'] !== 'undefined') {
                    return results.val()['allow'];
                }

                return false;
            }

            results = await this.afs
                .collection('controls')
                .doc('registration')
                .ref.get();

            if (results.exists && typeof results.data()['allow'] !== 'undefined') {
                return results.data()['allow'];
            }

            return false;
        } catch (error) {
            const log = {
                level: 'debug',
                message: error.message,
                page: 'controlsService.allowRegistration'
            };
            this.log.writeLog(log);
            return false;
        }
    }
}
