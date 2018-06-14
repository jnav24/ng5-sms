import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MessagesComponent } from './messages.component';
import {MomentModule} from 'angular2-moment';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MessagesService} from '@app/messages/messages.service';
import {UsersService} from '@app/common/services/users.service';
import {ControlsService} from '@app/common/services/controls.service';
import {ContactsService} from '@app/common/services/contacts.service';

class MessagesServiceStub {}
class ContactsServiceStub {
    getContactList() {}
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
            declarations: [ MessagesComponent ],
            imports: [
                FormsModule,
                MomentModule,
                ReactiveFormsModule
            ],
            providers: [
                { provide: ContactsService, useClass: ContactsServiceStub },
                { provide: ControlsService, useClass: ControlsServiceStub },
                { provide: MessagesService, useClass: MessagesServiceStub },
                { provide: UsersService, useClass: UsersServiceStub },
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
