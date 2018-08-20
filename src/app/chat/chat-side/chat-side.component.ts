import { Component, OnInit } from '@angular/core';
import { Store } from 'ngxs';

@Component({
    selector: 'app-chat-side',
    templateUrl: './chat-side.component.html',
    styleUrls: ['./chat-side.component.scss']
})
export class ChatSideComponent implements OnInit {
    public chats;

    constructor(private store: Store) { }

    ngOnInit() {
        this.chats = this.store.select(store => store.chat);
    }
}
