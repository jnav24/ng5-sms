import { State, Action, StateContext, Selector } from 'ngxs';
import {ChatInterface} from '@app/common/interfaces/chat.interface';
import {AddChat, SetChat} from '@app/common/actions/chat.action';

@State<ChatInterface[] | {}[]>({
    name: 'chat',
    defaults: []
})
export class ChatState {
    @Selector()
    static getChat(state: ChatInterface) {
        return state;
    }

    @Action(SetChat)
    setChat({ setState }: StateContext<ChatInterface>, { payload }: SetChat) {
        setState(payload);
    }

    @Action(AddChat)
    addChat({ setState }: StateContext<ChatInterface>, { payload }: AddChat) {}
}
