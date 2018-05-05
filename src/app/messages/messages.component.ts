import { Component, OnInit } from '@angular/core';
import {MessagesService} from '@app/common/services/messages.service';
import {ControlsService} from '@app/common/services/controls.service';
import {ContactsService} from '@app/common/services/contacts.service';
import {environment} from '@app/config/environment.config';
import {UserService} from '@app/common/services/user.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
    contact_list = [];
    user_id: String;
    message_id: String = '8u6qOhvrYFWQqz0eM03Y';
    messages;
    recipient_number: String;
    message: String;

    constructor(private messageService: MessagesService,
                private controlsService: ControlsService,
                private userService: UserService,
                private contactsService: ContactsService) { }

    ngOnInit() {
        this.user_id = environment.user_id;

        // this.messageService
        //     .getMessage(this.message_id)
        //     .valueChanges()
        //     .subscribe(message => console.log(message));

        this.getContactList();
    }

    sendMessage() {
        const user_number = this.controlsService.getTwilioNumber();
        this.messageService.saveMessage(user_number, this.recipient_number, this.message, this.message_id);
    }

    private getContactList() {
        this.userService
            .getContactList(this.user_id)
            .valueChanges()
            .subscribe(user => {
                if (typeof user['contact_ids'] !== 'undefined' && user['contact_ids'].length) {
                    user['contact_ids'].map(contact_id => {
                        this.contactsService
                            .getContact(contact_id)
                            .valueChanges()
                            .subscribe(contact => {
                                contact['message_id'] = this.getMessageIdFromContact(contact['message_ids'], user['message_ids']);

                                this.getLatestMessage(contact['message_id'])
                                    .then(response => {
                                        console.log(response);
                                        contact['latest_message'] = response;
                                    })
                                    .catch(err => {
                                       console.log(err);
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

    getMessages(mid: String): void {
        this.messageService
            .getMessages(mid)
            .valueChanges()
            .subscribe(messages => {
                this.messages = messages;
            });
    }

    private getLatestMessage(mid: String) {
        return this.messageService
            .getLatestMessage(mid)
            .stateChanges()
            .toPromise();
            // .valueChanges()
            // .subscribe(msg => {
            //     return msg;
            // });
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
}
