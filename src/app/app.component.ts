import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//import { HomePage } from '../pages/home/home';
//import { ListPage } from '../pages/list/list';
import { MyTeamsPage, TournamentsPage, TeamHomePage } from '../pages/pages';
import { UserSettingsProvider } from '../providers/user-settings/user-settings';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { EstatesApiProvider } from '../providers/estates-api/estates-api';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = MyTeamsPage;
  favoriteTeams: any[];

  //pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,public userSettings: UserSettingsProvider, public loadingController: LoadingController, public eliteApi: EstatesApiProvider,public events: Events) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    //this.pages = [
    //  { title: 'Home', component: HomePage },
    //  { title: 'List', component: ListPage }
    //];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.refreshFavorites();
      this.events.subscribe('favorites:changed', () => this.refreshFavorites());
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  goHome() {
    this.nav.push(MyTeamsPage);
  }

  goToTournaments() {
    this.nav.push(TournamentsPage);
  }

  refreshFavorites() {

    this.userSettings.getAllFavorites().then(favs => this.favoriteTeams = favs);
  }

  goToTeam(favorite) {
    let loader = this.loadingController.create({
      content: 'Getting data...',
      dismissOnPageChange: true
    });
    loader.present();
    this.eliteApi.getTournamentData(favorite.tournamentId).subscribe(l => this.nav.push(TeamHomePage, favorite.team));
  }
}
