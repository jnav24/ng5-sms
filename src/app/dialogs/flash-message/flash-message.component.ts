import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import * as _ from 'lodash';

@Component({
    selector: 'app-flash-message',
    templateUrl: './flash-message.component.html',
    styleUrls: ['./flash-message.component.scss']
})
export class FlashMessageComponent implements OnInit {
    private condition = true;
    private defaults = {
        status: {
            success: {
                state: 'success',
                title: 'Success',
                message: 'Action resulted successfully',
            },
            error: {
                state: 'danger',
                title: 'Error',
                message: 'Something unexpected occurred',
            }
        }
    };
    private duration: Number = 3000;
    private states: String[] = ['success', 'warn', 'danger', 'default'];
    loading: Boolean = true;
    flash;

    constructor(public dialogRef: MatDialogRef<FlashMessageComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {}

    ngOnInit() {
        this.getDuration();
        this.validateStatus();

        this.data.promise
            .then(result => {
                if (this.getPromiseCondition(result)) {
                    this.loading = false;
                    this.flash = this.data.status.success;

                    setTimeout(() => {
                        this.dialogRef.close({success: true, message: ''});
                    }, this.duration);
                }
            })
            .catch(error => {
                this.loading = false;
                this.flash = this.data.status.error;

                setTimeout(() => {
                    this.dialogRef.close({success: false, message: error});
                }, this.duration);
            });
    }

    private getPromiseCondition(result) {
        if (typeof this.data.condition === 'function') {
            return this.data.condition(result);
        }

        return this.condition;
    }

    private validateStatus() {
        const keys = Object.keys(this.defaults.status);

        _.forEach(keys, key => {
            const statusKeys = Object.keys(this.defaults.status.success);

            if (typeof this.data.status[key] === 'undefined') {
                this.data.status[key] = this.defaults.status[key];
            }

            _.forEach(statusKeys, statusKey => {
                if (!this.isString(this.data.status[key][statusKey])) {
                    this.data.status[key][statusKey] = this.defaults.status[key][statusKey];
                }
            });
        });

    }

    private isString(value) {
        return (typeof value === 'string' && value !== '');
    }

    private getDuration() {
        if (typeof this.data.duration !== 'undefined' && Number.isInteger(this.data.duration)) {
            this.duration = this.data.duration;
        }
    }
}
