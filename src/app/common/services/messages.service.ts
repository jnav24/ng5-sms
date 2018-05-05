import { Injectable } from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';

@Injectable()
export class MessagesService {

  constructor(private af: AngularFirestore) {
      this.af.firestore.settings({timestampsInSnapshots: true});
  }

  getMessage(message_id) {
      return this.af.doc(`/messages/${message_id}`).collection('conversation', ref => ref.where('message', '==', 'hello'));
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
