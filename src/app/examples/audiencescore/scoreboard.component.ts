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

  
  error ='';

  isDataLoaded;

  p: number = 1;
  collection; 
  data : Date = new Date();

   constructor(public auth: AuthorizationService,public _router: Router,public restApi: RestApiservice, public globalservice:GlobalService) { }
    
   
  ngOnInit() {
    this.isDataLoaded=true;

  }




  back()
  {
  this._router.navigateByUrl('/index');
  }
  ngOnDestroy() {

	}


}
