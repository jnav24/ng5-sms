import { Component, OnInit } from '@angular/core';
import {MessagesService} from '@app/common/services/messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
    message_id: String = 'QuWx8ZawwrxJHkdb63jk';
    messages;

    constructor(private messageService: MessagesService) { }

    ngOnInit() {
        this.messageService
            .getMessages(this.message_id)
            .valueChanges()
            .subscribe(messages => {
                this.messages = messages;
            })
        ;
    }
}
