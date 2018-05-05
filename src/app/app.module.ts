// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {AngularFireModule} from 'angularfire2';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

// Config
import { RouterConfig } from '@app/config/router.config';
import {firebaseConfig} from '@app/config/firebase.config';

// Providers
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFirestore} from 'angularfire2/firestore';

// Services
import {MessagesService} from '@app/common/services/messages.service';
import {ControlsService} from '@app/common/services/controls.service';

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
      FormsModule,
      HttpModule,
      RouterModule.forRoot(RouterConfig),
  ],
  providers: [
      AngularFireDatabase,
      AngularFireAuth,
      AngularFirestore,
      ControlsService,
      MessagesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
