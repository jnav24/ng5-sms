import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Store} from 'ngxs';
import {LogService} from '@app/common/services/log.service';
import {UsersService} from '@app/common/services/users.service';
import {AddChat} from '@app/common/actions/chat.action';
import {ChatInterface} from '@app/common/interfaces/chat.interface';

@Injectable()
export class ChatAggregateResolver implements Resolve<ChatInterface[]> {
    private chat;

    constructor(private usersService: UsersService,
                private store: Store,
                private log: LogService) {}

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
        try {
            const uid = this.usersService.getUserUid().toString();
            const aggregatedChat = await new Promise(resolve => {
                this.chat = this.usersService
                    .getUserAggregatedChat(uid)
                    .subscribe(chats => {
                        this.store.dispatch(new AddChat(chats));
                        resolve(chats);
                    });
            });

            this.chat.unsubscribe();
            return aggregatedChat;
        } catch (error) {
            const log = {
                level: 'error',
                message: error.message,
                page: 'chat-aggregate-resolver.resolve'
            };
            this.log.writeLog(log);
        }
    }
}
