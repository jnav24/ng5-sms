import { Injectable } from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {MessagesInterface} from '@app/messages/messages.interface';

@Injectable()
export class MessagesService {
    constructor(private afs: AngularFirestore) {
        // const settings = {timestampsInSnapshots: true};
        // afs.firestore.settings(settings);
    }

    getLatestMessage(mid) {
        return this.afs
            .doc(`messages/${mid}`)
            .collection('conversation', ref => ref.orderBy('created', 'desc').limit(1));
    }

    getMessages(message_id) {
        return this.afs
            .collection('messages')
            .doc(`${message_id}`)
            .collection('conversation', ref => ref.orderBy('created', 'asc'));
    }

    saveMessage(mid: string, message: MessagesInterface) {
        this.afs
            .collection('messages')
            .doc(`${mid}`)
            .collection('conversation')
            .add(message);
    }
}
