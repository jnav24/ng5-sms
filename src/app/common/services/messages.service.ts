import { Injectable } from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';

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
      return this.af.collection('messages').doc(`${message_id}`).collection('conversation');
    }

    saveMessage(send_to, send_from, message, message_id) {
      const user_id = 1;
      const contact_id = 2;

      this.af
          .collection('messages')
          .doc(`${message_id}`)
          .collection('conversation')
          .add({
             to: user_id,
             from: contact_id,
             message: message
          });
    }
}
