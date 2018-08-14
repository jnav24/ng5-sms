import {Injectable} from '@angular/core';
import {AngularFireStorage, AngularFireUploadTask} from 'angularfire2/storage';
import {environmentConfig} from '@app/config/environment.config';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UploadService {
    private basePath: String;

    constructor(private afStore: AngularFireStorage) {
        this.basePath = environmentConfig.firebaseStorageBuckets.profile;
    }

    getProfilePath(uid: string, name: string): string {
        const file = this.sanitizeFileName(name);
        return `${this.basePath}/${uid}/${file.name}.${file.extension}`;
    }

    uploadFile(filename: string, file: File): AngularFireUploadTask {
        return this.afStore.upload(filename, file);
    }

    deleteFile(path: string): Observable<any> {
        return this.afStore.ref(path).delete();
    }

    getImageName(file: string): string {
        const fileList = file.split('/');
        return fileList[fileList.length - 1];
    }

    getProfileImageUrl(uid: string, file: string): Observable<any> {
        const filePath = this.getProfilePath(uid, file);
        return this.afStore.ref(filePath).getDownloadURL();
    }

    private sanitizeFileName(name: string) {
        const nameList = name.split('.');
        const extension = nameList[nameList.length - 1];
        delete nameList[nameList.length - 1];
        name = nameList.join(' ').replace(/[<>=\/._!@#$&-]/g, ' ').replace(/\s+/g, '-').replace(/-$/, '');
        return {name, extension};
    }
}
