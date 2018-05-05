import {Route} from '@angular/router';
import {MessagesComponent} from '@app/messages/messages.component';

export const RouterConfig: Route[] = [
    { path: '', component: MessagesComponent},
    { path: '**', redirectTo: ''}
];
