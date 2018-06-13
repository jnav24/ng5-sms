import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoginService} from '@app/onboard/login/login.service';
import {ActivatedRoute} from '@angular/router';
import {UserInterface} from '@app/common/interfaces/user.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
    private userSubscription;
    user: UserInterface;

    constructor(private loginService: LoginService,
                private route: ActivatedRoute) {}

    ngOnInit() {
        this.userSubscription = this.route.data.subscribe(user => this.user = user.user);
    }

    ngOnDestroy() {
        this.userSubscription.unsubscribe();
    }

    logout() {
        return this.loginService.logOutAndRedirect();
    }
}
