import { Injectable } from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';

@Injectable()
export class MessagesService {

  constructor(private af: AngularFirestore) {
      this.af.firestore.settings({timestampsInSnapshots: true});
  }

  getMessages(message_id) {
      console.log(this.af.doc(`/messages/${message_id}`));
      return this.af.doc(`/messages/${message_id}`);
  }
}
