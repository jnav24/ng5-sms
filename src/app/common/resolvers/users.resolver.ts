import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {UsersService} from '@app/common/services/users.service';
import {UserInterface} from '@app/common/interfaces/user.interface';
import {LogService} from '@app/common/services/log.service';
import {LoginService} from '@app/onboard/login/login.service';

@Injectable()
export class UsersResolver implements Resolve<UserInterface> {
    private user;
    constructor(private usersService: UsersService,
                private loginService: LoginService,
                private log: LogService) {}

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
       try {
           const uid = this.usersService.getUserUid().toString();
           const authenticatedUser = await new Promise(resolve => {
               const userInfo = this.usersService.getUser();

               if (typeof userInfo === 'undefined' || !userInfo) {
                   this.user = this.usersService
                       .getUserByUid(uid)
                       .subscribe(user => {
                           this.usersService.setUser(user);
                           resolve(user);
                       });
               } else {
                   resolve(userInfo);
               }
           });

           const auth = this.usersService.getAuth().currentUser;
           auth.getIdToken().then(token => {
              if (token !== authenticatedUser['token']) {
                  if (authenticatedUser['remember_me']) {
                      this.loginService.saveToken(token, uid);
                  } else {
                      this.loginService.logOutAndRedirect();
                  }
              }
           });

           this.user.unsubscribe();
           return authenticatedUser;
       } catch (error) {
           const log = {
               level: 'error',
               message: error.message,
               page: 'users-resolver.resolve'
           };
           this.log.writeLog(log);
       }

    }
}
