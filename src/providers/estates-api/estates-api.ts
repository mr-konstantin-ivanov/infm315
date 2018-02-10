import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

/*
  Generated class for the EstatesApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EstatesApiProvider {
  private baseUrl = 'https://infm315.firebaseio.com/';
  currentTourney: any = {};
  private tourneyData = {};

  constructor(public http: HttpClient) {
    console.log('Hello EstatesApiProvider Provider');
  }

  getTournaments(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/locations.json`)
      .do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getTournamentData(tourneyId, forceRefresh: boolean = false) : Observable<any> {
    if (!forceRefresh && this.tourneyData[tourneyId]) {
        this.currentTourney = this.tourneyData[tourneyId];
        console.log('**no need to make HTTP call, just return the data'); 
        return Observable.of(this.currentTourney);
    }

    // don't have data yet
    console.log('**about to make HTTP call');
    return this.http.get(`${this.baseUrl}/locations-data/${tourneyId}.json`)
        .map(response => {
            this.tourneyData[tourneyId] = response;
            this.currentTourney = this.tourneyData[tourneyId];
            return this.currentTourney;
        });
}

  getCurrentTourney(){
    return this.currentTourney;
  }

  private handleError(err: HttpErrorResponse) {
    console.error(err);
    return Observable.throw(err);
  }

  refreshCurrentTourney() : Observable<any>{
    return this.getTournamentData(this.currentTourney.tournament.id, true); 
  }

}
