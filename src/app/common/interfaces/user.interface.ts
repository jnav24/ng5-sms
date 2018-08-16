import { ChatInterface } from '@app/common/interfaces/chat.interface';
import { ContactInterface } from '@app/common/interfaces/contact.interface';

export interface UserInterface {
    remember_me?: boolean;
    image?: string;
    image_url?: string;
    email?: string;
    first_name: string;
    last_name: string;
    active?: boolean;
    token?: string;
    twilio_number?: number;
    contacts?: ContactInterface[];
    chat_aggregate?: ChatInterface[];
    chat?: ChatInterface[];
}
