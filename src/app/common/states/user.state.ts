import { State, Action, StateContext, Selector } from 'ngxs';

import {UserInterface} from '@app/common/interfaces/user.interface';
import {AddUser, RemoveUser, UpdateUser} from '@app/common/actions/user.action';

const userDefaults: UserInterface = {
    first_name: '',
    last_name: ''
};

@State<UserInterface>({
    name: 'user',
    defaults: userDefaults
})
export class UserState {
    @Selector()
    static getUser(state: UserInterface) {
        return state;
    }

    @Action(AddUser)
    addUser({ setState }: StateContext<UserInterface>, { payload }: AddUser) {
        setState(payload);
    }

    @Action(UpdateUser)
    updateUser({ patchState }: StateContext<UserInterface>, { payload }: UpdateUser) {
        patchState(payload);
    }

    @Action(RemoveUser)
    removeUser({ setState }: StateContext<UserInterface>) {
        setState(userDefaults);
    }
}
