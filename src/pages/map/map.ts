import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EstatesApiProvider } from '../../providers/estates-api/estates-api';
declare var window: any;
/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  map: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public eliteApi: EstatesApiProvider ) {
  }

  ionViewDidLoad(){
    let team = this.navParams.data.team;

    this.map = {
      lat: team.latitude,
      lng: team.longitude,
      zoom: 12,
      markerLabel: team.region 
    };

  }

  getDirections() { 
    window.location = `geo:${this.map.lat},${this.map.lng};u=35`; 
  }

}
