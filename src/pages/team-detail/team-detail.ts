import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController  } from 'ionic-angular';
import _ from 'lodash';
import moment from 'moment';
import { EstatesApiProvider } from '../../providers/estates-api/estates-api';
import { UserSettingsProvider } from '../../providers/user-settings/user-settings';

/**
 * Generated class for the TeamDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.html',
})
export class TeamDetailPage {
  dateFilter: string;
  team: any = {};
  games: any[];
  teamStanding: any = {}; 
  allGames: any[];
  useDateFilter = false;
  isFollowing = false;
  imageUrl = "https://firebasestorage.googleapis.com/v0/b/elite-schedule-app-ff69c.appspot.com/o/pexels-photo-106399.jpeg?alt=media&token=3aeb14f5-d533-4ae4-98bb-ed8c0f71c0f1";

  private tourneyData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public eliteApi: EstatesApiProvider, public alertController: AlertController, public toastController: ToastController, public userSettings: UserSettingsProvider) {
    
  }

  ionViewDidLoad() {
    
    this.team = this.navParams.get('team');    
    this.tourneyData = this.eliteApi.getCurrentTourney();
    this.userSettings.isFavoriteTeam(this.team.refNumber).then(value => this.isFollowing = value);
  }

  toggleFollow() {
    if(this.isFollowing) {
      let confirm = this.alertController.create({
        title: "Remove?",
        message: "Are you sure you want to remove from saved estates?",
        buttons: [
          {
            text: "Yes",
            handler: () => {
              this.isFollowing = false;
              this.userSettings.unfavoriteTeam(this.team);

              let toast = this.toastController.create({
                message: "You have removed this estated from saved estates",
                duration: 2000,
                position: "bottom"
              });
              toast.present();
            }
          },
          {
            text: "No"
          }
        ]
      });
      confirm.present();
    } else {
      this.isFollowing = true;
      this.userSettings.favoriteTeam(
        this.team, 
        this.tourneyData.location.id, 
        this.tourneyData.location.name
      );
    }
  }

  refreshAll(refresher){
    this.eliteApi.refreshCurrentTourney().subscribe(() => {
      refresher.complete();
      this.ionViewDidLoad();
    });
  }

  
}
