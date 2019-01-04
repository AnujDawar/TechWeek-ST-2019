import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-audience',
  templateUrl: './audience.component.html',
  styleUrls: ['./audience.component.scss']
})
export class AudienceComponent implements OnInit {
  data: Date = new Date();
  focus;
  focus1;

  bAuthenticated = false;

  // USER_RESPONSE_URL="https://csq4s4nraf.execute-api.ap-south-1.amazonaws.com/dev/userresponses";

  _data: any;
  private timerSubscription: Subscription;
  private postsSubscription: Subscription;
  choice_decr = '';
  busy: Subscription;
  error = '';

  isDataLoaded: boolean = false;
  //  url ='https://csq4s4nraf.execute-api.ap-south-1.amazonaws.com/dev/question';

  constructor(public auth: AuthorizationService, public _router: Router, public restApi: RestApiservice, public globalService: GlobalService) { }

  submit(form: NgForm) {
    const choice_id = form.value.choice;
    const question = this._data[0].question;
    const question_id = this._data[0].question_id;
    const choice_str_val = this.choice_decr;

    console.log("Choice -->" + choice_id);
    console.log("choice_val -->" + this.choice_decr);
    console.log("question_id -->" + question_id);
    // if(!this.isFormValid(teamForm))
    // 	return;


    const jsonData = {
      "user_email": this.globalService.localStorageItem('email'),
      "question_id": question_id,
      "answer_time": new Date(),
      "choice_id": choice_id,
      "is_correct": 1,
      "choice_descr": choice_str_val,
    };
    this.restApi.post(aws_url.STORE_USER_RESPONSE_URL, jsonData).subscribe(
      (data) => {
        console.log("Data" + data);

      },
      (err) => {
        console.log(err);
        this.error = "Not able to create team. Please try again.";
      }
    );

  }

  setChoiceDescr(choice_decr) {
    console.log("choice_decr-->" + choice_decr);
    this.choice_decr = choice_decr;
  }


  ngOnInit() {
    //var rellaxHeader = new Rellax('.rellax-header');

    var body = document.getElementsByTagName('body')[0];
    body.classList.add('landing-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');

    var authenticatedUser = this.auth.getAuthenticatedUser();
    if (authenticatedUser == null) {
      this._router.navigateByUrl('/login');
      return;
    } else {
      this.refreshData();
      this.bAuthenticated = true;
    }

  }

  subscribeToData() {
    this.timerSubscription = Observable.timer(1000)
      .subscribe(() => this.refreshData());

  }

  refreshData(): any {
    this.postsSubscription = this.restApi.get(aws_url.GET_CURRENT_QUESTION_URL).subscribe(
      (data) => {
        this._data = data;
        console.log("this._data-->" + this._data);
        this._data = Array.from(data);
        this.subscribeToData();
        this.isDataLoaded = true;

      },
      function (error) {
        console.log(error);
      }
    );
  }

  back() {
    this._router.navigateByUrl('/index');
  }


  doLogout() {
    this.auth.logOut();
  }


  ngOnDestroy() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('landing-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');

    this.timerSubscription.unsubscribe();
    this.postsSubscription.unsubscribe();
  }

}
