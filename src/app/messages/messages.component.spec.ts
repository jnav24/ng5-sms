import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MessagesComponent } from './messages.component';
import {MomentModule} from 'angular2-moment';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MessagesService} from '@app/messages/messages.service';
import {UsersService} from '@app/common/services/users.service';
import {ControlsService} from '@app/common/services/controls.service';
import {ContactsService} from '@app/common/services/contacts.service';
import {DashboardNavComponent} from '@app/dashboard/dashboard-nav/dashboard-nav.component';
import {MatToolbarModule} from '@angular/material';
import {LoginService} from '@app/onboard/login/login.service';
import {Observable} from 'rxjs/Observable';

class MessagesServiceStub {
    getLatestMessage(mid) {
        return Observable.create(obs => {
            obs.next({message: 'somthing'});
        });
    }

    getMessages(mid) {
        return Observable.create(obs => {
            obs.next([{message: 'somthing'}]);
        });
    }
}
class LoginServiceStub {}
class ContactsServiceStub {
    getContactList() {
        return Observable.create(obs => {
            obs.next([{message: 'somthing'}]);
        });
    }

    getContact(cid) {
        return Observable.create(obs => {
            obs.next({message: 'somthing'});
        });
    }
}
class UsersServiceStub {
    getUserUid() {}
}
class ControlsServiceStub {}

describe('MessagesComponent', () => {
    let component: MessagesComponent;
    let fixture: ComponentFixture<MessagesComponent>;
    let service: MessagesService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                DashboardNavComponent,
                MessagesComponent,
            ],
            imports: [
                FormsModule,
                MatToolbarModule,
                MomentModule,
                ReactiveFormsModule
            ],
            providers: [
                { provide: ContactsService, useClass: ContactsServiceStub },
                { provide: ControlsService, useClass: ControlsServiceStub },
                { provide: MessagesService, useClass: MessagesServiceStub },
                { provide: UsersService, useClass: UsersServiceStub },
                { provide: LoginService, useClass: LoginServiceStub },
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MessagesComponent);
        service = TestBed.get(MessagesService);
        component = fixture.componentInstance;
        component.ngOnInit();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
