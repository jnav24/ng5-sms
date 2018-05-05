import { Injectable } from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {environment} from '@app/config/environment.config';

@Injectable()
export class ControlsService {
    private twilio;

    constructor(private af: AngularFirestore) {
        this.getTwilioNumberFromFirestore();
    }

    private getTwilioNumberFromFirestore() {
        this.af
            .collection(`/controls`)
            .doc(environment.twilio_id)
            .valueChanges()
            .subscribe(twilio => {
                this.twilio = twilio;
            });
    }

    getTwilioNumber() {
        return this.twilio.twilio_number;
    }
}
