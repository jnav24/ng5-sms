import {Injectable} from '@angular/core';
import {FirebaseDbService} from '@app/common/services/firebase-db.service';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFirestore} from 'angularfire2/firestore';
import {LogInterface} from '@app/common/interfaces/log.interface';
import * as moment from 'moment';

@Injectable()
export class LogService {
    constructor(private fdb: FirebaseDbService,
                private af: AngularFireDatabase,
                private afs: AngularFirestore) {}

    writeLog(data: LogInterface): Promise<any> {
        let log;
        data.created = moment().toString();

        if (this.fdb.isFirebase()) {
            log = this.af.object('logs');
            return log.set(data);
        }

        log = this.afs.collection('logs');
        return log.add(data);
    }
}
