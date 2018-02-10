import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import {IonicStorageModule } from '@ionic/storage';
import { AgmCoreModule } from '@agm/core';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyTeamsPage, TournamentsPage, TeamDetailPage, TeamsPage, StandingsPage, TeamHomePage, MapPage } from '../pages/pages';
import { EstatesApiProvider } from '../providers/estates-api/estates-api';
import { UserSettingsProvider } from '../providers/user-settings/user-settings';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    MyTeamsPage,
    TournamentsPage,
    TeamDetailPage,
    TeamsPage,
    TeamHomePage,
    StandingsPage,
    MapPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot({
      name: '__mydb',
         driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAi91xerL_8t_7tnCR7GstQ2W0uxUT6ILk'
    })
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    MyTeamsPage,
    TournamentsPage,
    TeamDetailPage,
    TeamsPage,
    TeamHomePage,
    StandingsPage,
    MapPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EstatesApiProvider,
    UserSettingsProvider
  ]
})
export class AppModule {}
