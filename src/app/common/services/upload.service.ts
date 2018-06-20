import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {AngularFireStorage} from 'angularfire2/storage';

@Injectable()
export class UploadService {
    private basePath: String = 'test/';

    constructor(private afStore: AngularFireStorage) {}

    uploadFile(uid: string, file: File) {
        const filename = this.setName(file.name);
        return this.afStore.upload(`${this.basePath}/${uid}/${filename}`, file);
    }

    private setName(name) {
        return name;
    }
}
