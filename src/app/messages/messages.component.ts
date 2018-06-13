import { Component, OnInit, OnDestroy } from '@angular/core';
import {ControlsService} from '@app/common/services/controls.service';
import {ContactsService} from '@app/common/services/contacts.service';
import {MessagesInterface} from '@app/messages/messages.interface';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as moment from 'moment';
import {MessagesService} from '@app/messages/messages.service';
import {UsersService} from '@app/common/services/users.service';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit, OnDestroy {
    contact_list = [];
    conversation;
    user_id: String;
    messages: Observable<any>;
    recipient;
    message: String;
    selected_int = 0;
    subscription_contacts;

    constructor(private messageService: MessagesService,
                private controlsService: ControlsService,
                private usersService: UsersService,
                private contactsService: ContactsService) { }

    ngOnInit() {
        this.subscription_contacts = this.getContactList();
    }

    ngOnDestroy() {
        this.subscription_contacts.unsubscribe();
    }

    sendMessage() {
        const message: MessagesInterface = {
            to: this.recipient['id'],
            from: this.usersService.getUserUid(),
            message: this.message,
            state: 'sent',
            created: moment().unix().toString()
        };

        this.messageService
            .saveMessage(this.recipient['message_id'], message);
        this.message = '';
        this.setScrollBar();
    }

    private getContactList() {
        this.contactsService
            .getContactList(this.usersService.getUserUid())
            .valueChanges()
            .subscribe(user => {
                if (this.validateUser(user)) {
                    user['contact_ids'].map(contact_id => {
                        this.contactsService
                            .getContact(contact_id)
                            .valueChanges()
                            .subscribe(contact => {
                                contact['id'] = contact_id;
                                contact['message_id'] = this.getMessageIdFromContact(contact['message_ids'], user['message_ids']);

                                this.getLatestMessage(contact['message_id'])
                                    .subscribe(msg => {
                                        contact['latest_message'] = msg.shift();
                                        contact['latest_message']['created'] = moment.unix(contact['latest_message']['created']);
                                    });

                                delete contact['message_ids'];
                                const int = this.getArrayColumnSearch('message_id', contact['message_id'], this.contact_list);
                                if (int > -1) {
                                    this.contact_list[int] = contact;
                                } else {
                                    this.contact_list.push(contact);
                                }
                            });
                    });
                }
            });
    }

    getContactMessages(mid: String, int: number): void {
        this.getMessages(mid);
        this.getContactByMessageId(mid);
        this.contact_list[this.selected_int].selected = false;
        this.contact_list[int].selected = true;
        this.selected_int = int;
        setTimeout(() => {
            this.setScrollBar();
        }, 500);
    }

    private getMessages(mid: String): void {
        this.messages = this.messageService
            .getMessages(mid)
            .valueChanges()
            .map(messages => {
                return messages.map(message => {
                    message['created'] = moment.unix(message['created']);
                    return message;
                });
            });
    }

    private getContactByMessageId(mid: String): void {
        const int = this.getArrayColumnSearch('message_id', mid, this.contact_list);
        this.recipient = this.contact_list[int];
    }

    private getLatestMessage(mid: String): Observable<any> {
        return this.messageService
            .getLatestMessage(mid)
            .valueChanges();
    }

    private getMessageIdFromContact(contact_messages: String[], user_messages: String[]): String {
        return contact_messages.filter(message => {
            return user_messages.indexOf(message) !== -1;
        }).shift();
    }

    private getArrayColumnSearch(column: string, find: String, search: Object[]): number {
        return search.map(element => {
            return element[column];
        }).indexOf(find);
    }

    private setScrollBar() {
        const element = document.getElementById('message-container');

        if (typeof element !== 'undefined' && element !== null) {
            element.scrollTop = element.scrollHeight;
        }
    }

    private validateUser(user) {
        return user && Object.keys(user).length && typeof user['contact_ids'] !== 'undefined' && user['contact_ids'].length;
    }
}
