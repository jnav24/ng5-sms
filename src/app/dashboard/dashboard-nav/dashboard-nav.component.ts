import { Component, OnInit } from '@angular/core';
import {LoginService} from '@app/onboard/login/login.service';

@Component({
    selector: 'app-dashboard-nav',
    templateUrl: './dashboard-nav.component.html',
    styleUrls: ['./dashboard-nav.component.scss']
})
export class DashboardNavComponent implements OnInit {
    constructor(private loginService: LoginService) { }

    ngOnInit() {}

    logout() {
        return this.loginService.logOutAndRedirect();
    }
}
