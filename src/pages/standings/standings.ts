import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EstatesApiProvider } from '../../providers/estates-api/estates-api';
import _ from 'lodash';
/**
 * Generated class for the StandingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-standings',
  templateUrl: 'standings.html',
})
export class StandingsPage {
  standings: any[];
  team: any = {};
  allStandings: any[];
  divisionFilter = 'division';

  constructor(public navCtrl: NavController, public navParams: NavParams, public eliteApi: EstatesApiProvider) {
  }

  ionViewDidLoad() {
    this.team = this.navParams.get('team');
    let tourneyData = this.eliteApi.getCurrentTourney();
    this.standings = tourneyData.estates;
    this.allStandings = tourneyData.estates;
    this.filterDivision(); 
  }

  getHeader(record, recordIndex, records){
    if (recordIndex === 0 || record.region !== records[recordIndex-1].region) {
      return record.region;
    }
    return null;  
  }

  filterDivision(){
    if(this.divisionFilter === 'all'){
      this.standings = this.allStandings;
    } else {
      this.standings = _.filter(this.allStandings, s => s.region === this.team.region);
    }
  }

}
