import { Injectable } from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
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
        return this.af.collection('messages').doc(`${message_id}`).collection('conversation', ref => ref.orderBy('created', 'asc'));
    }

    saveMessage(user_id, contact_id, message, message_id) {
        this.af
            .collection('messages')
            .doc(`${message_id}`)
            .collection('conversation')
            .add({
                to: user_id,
                from: contact_id,
                message: message,
                state: 'sent',
                created: moment().unix().toString()
            });
    }
}
