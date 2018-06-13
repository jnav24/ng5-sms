import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {FirebaseDbService} from '@app/common/services/firebase-db.service';
import {AngularFirestore} from 'angularfire2/firestore';
import {LogService} from '@app/common/services/log.service';

@Injectable()
export class LoginService {
    user: Observable<any>;

    constructor(
        private router: Router,
        private firebaseDb: FirebaseDbService,
        private log: LogService,
        private afs: AngularFirestore,
        private af: AngularFireDatabase,
        private auth: AngularFireAuth) {
        this.user = auth.authState;
    }

    loginUser(email: string, pass: string): Promise<any> {
        return this.auth.auth.signInWithEmailAndPassword(email, pass);
    }

    logOutAndRedirect(): void {
        this.logoutUser()
            .then(auth => {
                this.router.navigate(['login']);
            })
            .catch(error => {
                const log = {
                    message: error.message,
                    level: 'error',
                    page: 'loginService.logOutAndRedirect'
                };
                this.log.writeLog(log);
            });
    }

    logoutUser(): Promise<any> {
        this.removeToken(this.auth.auth.currentUser.uid);
        return this.auth.auth.signOut();
    }

    removeToken(uid: string): Promise<any> {
        let user;

        if (this.firebaseDb.isFirebase()) {
            user = this.af.object(`users/${uid}`);
            return user.update({ token: '' });
        }

        user = this.afs.collection(`users`).doc(uid);
        return user.update({ token: '' });
    }

    setRememberMe(uid: string, value: boolean): Promise<any> {
        let user;
        const data = { remember_me: value };

        if (this.firebaseDb.isFirebase()) {
            user = this.af.object(`users/${uid}`);
            return user.update(data);
        }

        user = this.afs.collection('users').doc(uid);
        return user.update(data);
    }

    saveToken(token: string, uid: string): Promise<any> {
        let user;

        if (this.firebaseDb.isFirebase()) {
            user = this.af.object(`users/${uid}`);
            return user.update({ token: token});
        }

        user = this.afs.collection(`users`).doc(uid);
        return user.update({ token: token});
    }

    redirectUser(): void {
        this.router.navigate(['dashboard']);
    }
}
