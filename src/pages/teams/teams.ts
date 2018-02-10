import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { TeamHomePage  } from '../pages';
import { EstatesApiProvider } from '../../providers/estates-api/estates-api';
import _ from 'lodash';
/**
 * Generated class for the TeamsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})
export class TeamsPage {
  private allTeams: any;
  private allTeamDivisions: any;
  teams: any = [];
  location: string = "";
  //  {id: 1, name: 'HC Elite'},
  //  {id: 2, name: 'Team Takeover'},
  //  {id: 3, name: 'DC Thunder'}
  //];
  queryText: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public eliteApi: EstatesApiProvider, public loadingController: LoadingController) {
  }

  ionViewDidLoad() {
    let selectedTourney = this.navParams.data;
    this.location = selectedTourney.name;
    let loader = this.loadingController.create({
      content: 'Getting estates...'
    });
    loader.present().then(() => {
      this.eliteApi.getTournamentData(selectedTourney.id).subscribe(data => {
        this.allTeams = data.estates;
        // subdivide the teams into divisions
        this.allTeamDivisions =
          _.chain(data.estates)
          .groupBy('region')
          .toPairs()
          .map(item => _.zipObject(['region', 'type'], item))
          .value();
          this.teams = this.allTeamDivisions;     
          loader.dismiss();   
      });
    });
  }


  itemTapped($event, team) {
    this.navCtrl.push(TeamHomePage , {team: team});
  }

  updateTeams(){
    let queryTextLower = this.queryText.toLowerCase();
    let filteredTeams = [];
    _.forEach(this.allTeamDivisions, td => {
      let teams = _.filter(td.type, t => (<any>t).refNumber.toLowerCase().includes(queryTextLower));
      if (teams.length) {
        filteredTeams.push({ region: td.region, type: teams });
      }
    });

    this.teams = filteredTeams;
  }

}
