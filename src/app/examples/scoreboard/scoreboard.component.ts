import { Component, OnInit, ViewChildren, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { AuthorizationService } from "../../shared/authorization.service";
import { GlobalService } from "../../shared/global.service";

import { Router } from '@angular/router';
import * as Rellax from 'rellax';
import { Http, Headers } from "@angular/http";
import { RestApiservice } from "../../shared/rest-api.service";
import { shallowEqualArrays } from '@angular/router/src/utils/collection';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Rx';
import { Subscription } from "rxjs/Subscription";
import { aws_url } from 'app/shared/urls';

import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnInit {
	private timerSubscription: Subscription;
	private postsSubscription: Subscription;
  
  data : Date = new Date();
   constructor(public auth: AuthorizationService,public _router: Router,public restApi: RestApiservice, public globalservice:GlobalService) { }
    
   error ='';

   isDataLoaded;

   p: number = 1;
   collection; 
   
  ngOnInit() {
   this.getTeam() ;
  }

  refresh()
  {
    this.getTeam() ;
  }

  subscribeToData() {
		this.timerSubscription = Observable.timer(1000)
			.subscribe(() => this.getTeam());
	}

  getTeam() 
	{
    this.restApi.get(aws_url.GET_TEAM_URL).subscribe(
      (data) => {   
        this.collection=data;    
       console.log("Data"+data);
       this.isDataLoaded=true;
       this.subscribeToData();
      },
      (err) => {
        console.log(err);
        this.error = "Not able to find team. Please try again.";
      }
    );
	}



  back()
  {
  this._router.navigateByUrl('/index');
  }
  ngOnDestroy() {
	
		this.timerSubscription.unsubscribe();
		this.postsSubscription.unsubscribe();
	}


}
