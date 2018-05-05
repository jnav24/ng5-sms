// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {AngularFireModule} from 'angularfire2';

// Config
import { RouterConfig } from '@app/config/router.config';
import {firebaseConfig} from '@app/config/firebase.config';

// Components
import { AppComponent } from '@app/app.component';
import { MessagesComponent } from '@app/messages/messages.component';


@NgModule({
  declarations: [
      AppComponent,
      MessagesComponent
  ],
  imports: [
      AngularFireModule.initializeApp(firebaseConfig),
      BrowserModule,
      RouterModule.forRoot(RouterConfig),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
