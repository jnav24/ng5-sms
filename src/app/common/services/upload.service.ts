import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {AngularFireStorage} from 'angularfire2/storage';

@Injectable()
export class UploadService {
    private basePath: String = 'test/';

    constructor(private afStore: AngularFireStorage) {}

    uploadFile(uid: string, file: File) {
        // const storageRef = firebase.storage().ref();
        // storageRef.child(`${this.basePath}/`).put();
        const filename = 'test.jpg';
        this.afStore.upload(`${this.basePath}/${uid}/${filename}`, file);
    }
}
