import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {AngularFireStorage, AngularFireUploadTask} from 'angularfire2/storage';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UploadService {
    private basePath: String = 'test';
    private contactPath: String = 'contacts';

    constructor(private afStore: AngularFireStorage) {}

    uploadFile(filename: string, file: File): AngularFireUploadTask {
        return this.afStore.upload(filename, file);
    }

    getProfilePath(uid: string, name: string): string {
        const file = this.setName(name);
        return `${this.basePath}/${uid}/${file.name}.${file.extension}`;
    }

    getContactPath(uid: string, name: string): string {
        const file = this.setName(name);
        return `${this.basePath}/${uid}/${this.contactPath}/${file.name}.${file.extension}`;
    }

    getImageName(file: string): string {
        const fileList = file.split('/');
        return fileList[fileList.length - 1];
    }

    getProfileImageUrl(uid: string, file: string): Observable<any> {
        const filePath = this.getProfilePath(uid, file);
        return this.afStore.ref(filePath).getDownloadURL();
    }

    getContactImageUrl(uid: string, file: string): Observable<any> {
        const filePath = this.getContactPath(uid, file);
        return this.afStore.ref(filePath).getDownloadURL();
    }

    private setName(name) {
        const nameList = name.split('.');
        const extension = nameList[nameList.length - 1];
        delete nameList[nameList.length - 1];
        name = nameList.join(' ').replace(/[<>=\/._!@#%&-]/g, ' ').replace(/\s+/g, '-').replace(/-$/, '');
        return {name: name, extension: extension};
    }
}
