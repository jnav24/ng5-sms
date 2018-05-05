import { Injectable } from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';

@Injectable()
export class ControlsService {
    private twilio_number: String;

    constructor(private af: AngularFirestore) {
        this.getTwilioNumberFromFirestore();
    }

    private getTwilioNumberFromFirestore() {
        this.af
            .collection(`/controls`)
            .doc('NehjULdopYgLs7k7sNvt')
            .valueChanges()
            .subscribe(number => {
                this.twilio_number = number.twilio_number;
            });
    }

    getTwilioNumber() {
        return this.twilio_number;
    }
}
