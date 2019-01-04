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

	bAuthenticated = false;

	_data: any;
	private timerSubscription: Subscription;
	private postsSubscription: Subscription;

	busy: Subscription;

	isDataLoaded: boolean = false;

	//  url = 'https://0sn0th0du1.execute-api.ap-south-1.amazonaws.com/dev/question/read/current';
	//  url ='https://csq4s4nraf.execute-api.ap-south-1.amazonaws.com/dev/question';
	//  nextquestionurl="https://csq4s4nraf.execute-api.ap-south-1.amazonaws.com/dev/question/next";

	constructor(
		private auth: AuthorizationService,
		private _router: Router,
		private restApi: RestApiservice,
		private globalservice: GlobalService
	) { }

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
					console.log("this._data-->" + this._data);
					this._data = Array.from(data);
					// this.subscribeToData();
					this.isDataLoaded = true;
				},
				function (error) {
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
		console.log("submitted question id: " + question["question_id"]);

		this.postsSubscription = this.restApi
			.put(aws_url.GET_NEXT_QUESTION_URL, question)
			.subscribe(
				data => {
					console.log("Anuj : " + data);

					if (data == "QUIZ OVER") {
						// this._data = null;
						// this.isDataLoaded = false;
						this._router.navigateByUrl('/quiz-over');
					} else {
						this._data = data;
						this.isDataLoaded = true;
					}
				},
				function (error) {
					console.log(error);
				}
			);
	}

	// ngOnInit() {
	//   console.log("inside component");

	//    this.refreshData();
	// this.next(1);
	/*
	var authenticatedUser = this.auth.getAuthenticatedUser();
	if (authenticatedUser == null) {
	  return;
	}
	authenticatedUser.getSession( (err, session) => {
	  if (err) {
		console.log(err);
		return;
	  }
	  const token = session.getIdToken().getJwtToken();      
	  const headers = new Headers();
	  headers.append('Authorization', token);      
	  var that = this;
	  this.auth.getAuthenticatedUser().getSession((err, session) => {
		if (err) {
		  console.log(err);
		  return;
		}
		const token = session.getIdToken().getJwtToken();        
		const headers = new Headers();
		headers.append('Authorization', token);        
		this.http.get('https://csq4s4nraf.execute-api.ap-south-1.amazonaws.com/dev/question', { headers: headers })
		  .subscribe(
		  response => { 
			console.log("response.json()-->"+response.json());  
			this._data = response.json();
		  },
		  error => {
			console.log(error);
		  }
		);
	  });
	});*/
	//}

	ngOnDestroy() {
		var body = document.getElementsByTagName("body")[0];
		body.classList.remove("landing-page");
		var navbar = document.getElementsByTagName("nav")[0];
		navbar.classList.remove("navbar-transparent");

		//  this.timerSubscription.unsubscribe();
		//  this.postsSubscription.unsubscribe();
	}
}
