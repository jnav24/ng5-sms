import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import * as _ from 'lodash';

@Component({
    selector: 'app-flash-message',
    templateUrl: './flash-message.component.html',
    styleUrls: ['./flash-message.component.scss']
})
export class FlashMessageComponent implements OnInit {
    private defaults = {
        status: {
            success: {
                state: 'success',
                title: 'Success!',
                message: 'Halle Berry was successfully added to contacts',
            },
            error: {
                state: 'danger',
                title: 'Oh no!',
                message: 'Unable to add Halle Berry as a contact',
            }
        }
    };
    private duration: Number = 2000;
    private states: String[] = ['success', 'warn', 'danger', 'default'];
    loading: Boolean = true;
    flash;

    constructor(public dialogRef: MatDialogRef<FlashMessageComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {}

    ngOnInit() {
        this.getDuration();
        this.validateStatus();

        this.data.promise
            .then(res => {
                // This condition might be too specific
                if (typeof res['success'] !== 'undefined' && res['success']) {
                    this.loading = false;
                    this.flash = this.validateState(this.data.status.success);
                    setTimeout(() => {
                        this.dialogRef.close({success: true, message: ''});
                    }, this.duration);
                }
            })
            .catch(error => {
                this.flash = this.validateState(this.data.status.error);
                setTimeout(() => {
                    this.dialogRef.close({success: false, message: error});
                }, this.duration);
            });
    }

    private validateState(obj) {
        if (typeof obj.state === 'undefined' || this.states.indexOf(obj.state) < 0) {
            obj.state = 'default';
        }

        return obj;
    }

    private validateStatus() {
        const keys = Object.keys(this.defaults.status);

        _.forEach(keys, key => {
            const statusKeys = Object.keys(this.defaults.status.success);

            if (!this.isString(this.data.status[key])) {
                this.data.status[key] = this.defaults.status[key];
            }

            _.forEach(statusKeys, statusKey => {
                if (!this.isString(this.data.status[key][statusKey])) {
                    this.data.status[key][statusKey] = this.defaults.status[statusKey];
                }
            });
        });

    }

    private isString(value) {
        return (typeof value === 'string' && value !== '');
    }

    private getDuration() {
        if (typeof this.data.duartion !== 'undefined' && Number.isInteger(this.data.duration)) {
            this.duration = this.data.duration;
        }
    }
}
