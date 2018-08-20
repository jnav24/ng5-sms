import {ChatInterface} from '@app/common/interfaces/chat.interface';

export class SetChat {
    static readonly type = '[Chat] add';
    constructor(public payload: ChatInterface) {}
}

export class AddChat {
    static readonly type = '[Chat] add';
    constructor(public payload: ChatInterface[] | {}[]) {}
}

export class UpdateChat {
    static readonly type = '[Chat] update';
    constructor(public payload: ChatInterface) {}
}

export class RemoveChat {
    static readonly type = '[Chat] remove';
    constructor() {}
}
