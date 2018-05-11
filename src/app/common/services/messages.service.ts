import { Injectable } from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {MessagesInterface} from '@app/messages/messages.model';
import * as moment from 'moment';

@Injectable()
export class MessagesService {
    constructor(private af: AngularFirestore) {
        this.af.firestore.settings({timestampsInSnapshots: true});
    }

    getLatestMessage(mid) {
        return this.af
            .doc(`messages/${mid}`)
            .collection('conversation', ref => ref.orderBy('created', 'desc').limit(1));
    }

    getMessages(message_id) {
        return this.af
            .collection('messages')
            .doc(`${message_id}`)
            .collection('conversation', ref => ref.orderBy('created', 'asc'));
    }

    saveMessage(mid: string, message: MessagesInterface) {
        this.af
            .collection('messages')
            .doc(`${mid}`)
            .collection('conversation')
            .add(message);
    }
}
