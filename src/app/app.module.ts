import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Media } from '@ionic-native/media/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { AlertHabitPage } from './alert-habit/alert-habit.page';
import { AlertPage } from './alert/alert.page';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChainPage } from './chain/chain.page';
import { ChainsPage } from './chains/chains.page';
import { HabitPage } from './habit/habit.page';
import { IconSelectComponent } from './icon-select/icon-select.component';

@NgModule({
  declarations: [
    AlertHabitPage,
    AlertPage,
    AppComponent,
    ChainPage,
    ChainsPage,
    HabitPage,
    IconSelectComponent,
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    FormsModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Media,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
