import {Injectable} from '@angular/core';
import {FirebaseDbService} from '@app/common/services/firebase-db.service';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFirestore} from 'angularfire2/firestore';
import {UserInterface} from '@app/common/interfaces/user.interface';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs/Observable';
import {LogService} from '@app/common/services/log.service';

@Injectable()
export class UsersService {
    private uid: String;
    private userInfo: UserInterface;

    constructor(private fdb: FirebaseDbService,
                private log: LogService,
                private afs: AngularFirestore,
                private auth: AngularFireAuth,
                private af: AngularFireDatabase) {}

    addUser(data: UserInterface, uid: string): Promise<any> {
        let user;

        if (this.fdb.isFirebase()) {
            user = this.af.object(`/users/${uid}`);
            return user.set(data);
        }

        user = this.afs.collection('users').doc(uid);
        return user.set(data);
    }

    getUserUid(): String {
        return this.uid;
    }

    setUserUid(uid: String) {
        this.uid = uid;
    }

    setUser(user) {
        this.userInfo = user;
    }

    getUser(): UserInterface {
        return this.userInfo;
    }

    getUserByUid(uid: string): Observable<{}> {
        if (this.fdb.isFirebase()) {
            return this.af.list(`/users/${uid}`).valueChanges();
        }

        return this.afs.collection('users').doc(uid).valueChanges();
    }

    getAuth() {
        return this.auth.auth;
    }
}
