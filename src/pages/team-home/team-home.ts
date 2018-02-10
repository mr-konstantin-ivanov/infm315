import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TeamDetailPage, StandingsPage, MapPage } from '../pages';

/**
 * Generated class for the TeamHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-team-home',
  templateUrl: 'team-home.html',
})
export class TeamHomePage {

  teamDetailTab: any;
  standingsTab: any;
  teamMapTab: any;
  team: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.teamDetailTab = TeamDetailPage;
    this.standingsTab = StandingsPage;
    this.teamMapTab = MapPage;
    this.team = this.navParams.get('team');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamHomePage');
  }

  goHome() {
    this.navCtrl.popToRoot();
  }

}
