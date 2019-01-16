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
	selector: 'app-audience',
	templateUrl: './audience.component.html',
	styleUrls: ['./audience.component.scss']
})
export class AudienceComponent implements OnInit {
	staticAlertClosed = false;
	data: Date = new Date();
	focus;
	focus1;
	bAuthenticated = false;
	_data: any;
	private timerSubscription: Subscription;
	private postsSubscription: Subscription;
	choice_decr = '';
	busy: Subscription;
	error = '';
	submitButtonAlertMessage: string;

	isDataLoaded: boolean = false;
	previous;
	current;
	next;
	previousQuestionId: number = -1;

	@ViewChild("regform") audienceForm: NgForm;
	// regForm: NgForm;

	constructor(public auth: AuthorizationService, public _router: Router, public restApi: RestApiservice, public globalService: GlobalService) { }

	submit(form: NgForm) {
		const choice_id = form.value.choice;
		const question = this._data[0].question;
		const question_id = this._data[0].question_id;
		const choice_str_val = this.choice_decr;

		console.log("Choice -->" + choice_id);
		console.log("choice_val -->" + this.choice_decr);
		console.log("question_id -->" + question_id);

		const jsonData = {
			"user_email": this.globalService.localStorageItem('email'),
			"question_id": question_id,
			"answer_time": new Date(),
			"user_response": choice_str_val,
		};

		this.restApi.post(aws_url.STORE_USER_RESPONSE_URL, jsonData).subscribe(
			(data) => {
				this.submitButtonAlertMessage = "Your Response is recorded successfully";
				this.staticAlertClosed = false;
				form.reset();
				console.log("Data" + data);
			},
			(err) => {
				this.submitButtonAlertMessage = "Please try again."
				this.staticAlertClosed = false;
				console.log(err);
				this.error = "Not able to Store user response. Please try again.";
			}
		);
	}

	setChoiceDescr(choice_decr) {
		console.log("choice_decr-->" + choice_decr);
		this.choice_decr = choice_decr;
	}

	ngOnInit() {
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
		this.postsSubscription = this.restApi.get(aws_url.GET_CURRENT_QUESTION_URL + "?email=" + this.globalService.localStorageItem('email')).subscribe(
			(data) => {
				this._data = data;
				// console.log(this._data);

				if(this._data == "DUPLICATE")
				{
					this.staticAlertClosed = false;
					this.submitButtonAlertMessage = "Your Response is recorded successfully";
				}

				this._data = Array.from(data);

				console.log(this._data);

				if(this._data[0])
				if (this._data[0].question_id)
					if (this.previousQuestionId != this._data[0].question_id) {
						this.previousQuestionId = this._data[0].question_id;
						this.staticAlertClosed = true;
						// this.audienceForm.reset();
						// this.regForm.reset();
					}

				this.subscribeToData();
				this.isDataLoaded = true;

				if (this._data.length > 0) {
					this.current = this._data[0].question_id;
					this.previous = this._data[0].previous;
				}
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
