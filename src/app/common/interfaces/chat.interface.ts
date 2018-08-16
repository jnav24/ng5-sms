export interface ChatInterface {
    created: string;
    from: string;
    message: string;
    state: 'sent' | 'read' | 'unread';
    to: string;
}
