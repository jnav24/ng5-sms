import { Injectable } from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';

@Injectable()
export class ControlsService {
    private twilio;

    constructor(private af: AngularFirestore) {
        this.getTwilioNumberFromFirestore();
    }

    private getTwilioNumberFromFirestore() {
        this.af
            .collection(`/controls`)
            .doc('NehjULdopYgLs7k7sNvt')
            .valueChanges()
            .subscribe(twilio => {
                this.twilio = twilio;
            });
    }

    getTwilioNumber() {
        return this.twilio.twilio_number;
    }
}
