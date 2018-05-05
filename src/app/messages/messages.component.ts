import { Component, OnInit } from '@angular/core';
import {MessagesService} from '@app/common/services/messages.service';
import {ControlsService} from '@app/common/services/controls.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
    message_id: String = '8u6qOhvrYFWQqz0eM03Y';
    messages;
    recipient_number: String;
    message: String;

    constructor(private messageService: MessagesService,
                private controlsService: ControlsService) { }

    ngOnInit() {
        this.messageService
            .getMessages(this.message_id)
            .valueChanges()
            .subscribe(messages => {
                this.messages = messages;
            });
    }

    sendMessage() {
        const user_number = this.controlsService.getTwilioNumber();
        this.messageService.saveMessage(user_number, this.recipient_number, this.message, this.message_id);
    }
}
