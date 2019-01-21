import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthorizationService } from "../../shared/authorization.service";
import { Router } from "@angular/router";
import * as Rellax from "rellax";
import { Http, Headers } from "@angular/http";
import { RestApiservice } from "../../shared/rest-api.service";
import { shallowEqualArrays } from "@angular/router/src/utils/collection";

import "rxjs/add/observable/interval";
import "rxjs/add/operator/startWith";
import "rxjs/add/operator/switchMap";
import { Observable } from "rxjs/Rx";
import { Subscription } from "rxjs/Subscription";
import { GlobalService } from "../../shared/global.service";
import { aws_url } from "../../shared/urls";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.scss"]
})
export class LandingComponent implements OnInit {
  data: Date = new Date();
  focus;
  focus1;
  nextQuestionText: string = "Lock Question!";

  bAuthenticated = false;

  _data: any;
  isCollapsed = false;
  private timerSubscription: Subscription;
  private postsSubscription: Subscription;
  isNextButtonActive = true;

  busy: Subscription;

  isDataLoaded: boolean = false;

  constructor(
    public auth: AuthorizationService,
    public _router: Router,
    public restApi: RestApiservice,
    public globalservice: GlobalService
  ) {}

  ngOnInit() {
    //var rellaxHeader = new Rellax('.rellax-header');

    var body = document.getElementsByTagName("body")[0];
    body.classList.add("landing-page");
    var navbar = document.getElementsByTagName("nav")[0];
    navbar.classList.add("navbar-transparent");

    var authenticatedUser = this.auth.getAuthenticatedUser();
    if (authenticatedUser == null) {
      this._router.navigateByUrl("/login");
      return;
    } else {
      this.refreshData();
      this.bAuthenticated = true;
    }
  }

  subscribeToData() {
    this.timerSubscription = Observable.timer(1000).subscribe(() =>
      this.refreshData()
    );
  }

  refreshData(): any {
    console.log("REFRESHING DATA");

    this.postsSubscription = this.restApi
      .get(aws_url.GET_CURRENT_QUESTION_URL)
      .subscribe(
        data => {
          this._data = data;
          console.log("this._data-->" + JSON.stringify(this._data));
          this._data = Array.from(data);
          // this.subscribeToData();
          this.isDataLoaded = true;
        },
        function(error) {
          console.log(error);
        }
      );
  }

  back() {
    this._router.navigateByUrl("/index");
  }

  doLogout() {
    this.auth.logOut();
  }

  next(question) {
    if (this.nextQuestionText == "Lock Question!") {
      this.isNextButtonActive = false;
      //	lock question

      this.restApi.put(aws_url.LOCK_QUESTION_URL, question).subscribe(
        data => {
          this.nextQuestionText = "Next Question!";
          this.isNextButtonActive = true;
        },
        error => {}
      );
    } else {
      console.log("submitted question id: " + question["question_id"]);

      this.postsSubscription = this.restApi
        .put(aws_url.GET_NEXT_QUESTION_URL, question)
        .subscribe(
          data => {
            console.log("Anuj : " + data);

            if (data == "QUIZ OVER") {
              // this._data = null;
              // this.isDataLoaded = false;
              this._router.navigateByUrl("/quiz-over");
            } else {
              this._data = data;
              this.isDataLoaded = true;
              this.isCollapsed = false;
              this.nextQuestionText = "Lock Question!";
            }
          },
          function(error) {
            console.log(error);
          }
        );
    }
  }

  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("landing-page");
    var navbar = document.getElementsByTagName("nav")[0];
    navbar.classList.remove("navbar-transparent");

    //  this.timerSubscription.unsubscribe();
    //  this.postsSubscription.unsubscribe();
  }
}
