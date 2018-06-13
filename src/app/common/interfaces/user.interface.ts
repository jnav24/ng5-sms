export interface UserInterface {
    remember_me?: boolean;
    image?: string;
    email: string;
    first_name: string;
    last_name: string;
    active: boolean;
    token: string;
}
