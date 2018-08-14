export interface UserInterface {
    remember_me?: boolean;
    image?: string;
    image_url?: string;
    email?: string;
    first_name: string;
    last_name: string;
    active?: boolean;
    token?: string;
}
