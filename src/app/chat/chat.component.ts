import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from 'ngxs';
import {UserInterface} from '@app/common/interfaces/user.interface';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
    private userSubscription: Subscription;
    public user: UserInterface;

    constructor(private store: Store) { }

    ngOnInit() {
        this.userSubscription = this.store
            .select(state => state.user)
            .subscribe(user => {
                this.user = user;
                console.log(user);
            });
    }

    ngOnDestroy() {
        this.userSubscription.unsubscribe();
    }
}
