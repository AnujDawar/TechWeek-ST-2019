import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { aws_url } from "app/shared/urls";
import { AuthorizationService } from "../../shared/authorization.service";
import { GlobalService } from "../../shared/global.service";

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
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { BaseChartDirective } from 'ng2-charts/ng2-charts';

@Component({
	selector: 'app-audience-poll',
	templateUrl: './audience-poll.component.html',
	styleUrls: ['./audience-poll.component.scss']
})
export class AudiencePollComponent implements OnInit {

	@ViewChild(BaseChartDirective) chart: BaseChartDirective;

	collection;
	error = "";
	private timerSubscription: Subscription;
	private postsSubscription: Subscription;
	isDataLoaded;
	data: Date = new Date();

	constructor(
		public auth: AuthorizationService,
		public _router: Router,
		public restApi: RestApiservice,
		public globalservice: GlobalService
	) { }

	public barChartOptions: any = {
		scaleShowVerticalLines: false,
		responsive: true,
		scales: {
			xAxes: [{
				stacked: true,
				ticks: {
					fontColor: 'black',  // x axe labels (can be hexadecimal too)
					fontSize: 20
				},
				gridLines: {
					color: 'white'  // grid line color (can be removed or changed)
				}
			}],
			yAxes: [{
				stacked: true,
				ticks: {
					fontColor: 'black',  // y axes numbers color (can be hexadecimal too)
					min: 0,
					fontSize: 20,
					beginAtZero: true,

				},
				gridLines: {
					color: 'white'  // grid line color (can be removed or changed)
				},
				scaleLabel: {
					display: true,
					labelString: 'score',
					fontColor: 'black',  // y axe label color (can be hexadecimal too),
					fontSize: 20
				}
			}]
		}
	};

	public barChartColor: Array<any> = [
		{
			backgroundColor: "#8B0000",
			borderColor: "black",
			pointBackgroundColor: "black",
			pointBorderColor: "black",
			pointHoverBackgroundColor: "black",
			pointHoverBorderColor: "black",
			fontColor: "black"
		}
	];

	public barChartLabels: string[] = ["A", "B", "C", "D"];
	public barChartType: string = "bar";
	public barChartLegend: boolean = false;

	public barChartData: any[] = [{ data: [], label: "Audience Poll" }];

	// events
	public chartClicked(e: any): void {
		console.log(e);
	}

	public chartHovered(e: any): void {
		console.log(e);
	}

	ngOnInit() {
		this.getAudience();
	}

	refresh() {
		this.getAudience();
	}

	subscribeToData() {
		this.timerSubscription = Observable.timer(1000).subscribe(() =>
			this.getAudience()
		);
	}

	getAudience() {
		this.restApi.get(aws_url.AUDIENCE_POLL_URL).subscribe(
			data => {

				if (data == "NOT LOCKED YET")
				{
					this.randomizePoll();
					console.log(data);
					this.isDataLoaded = true;
					this.subscribeToData();
				}
				else
				{
					this.collection = data;
					console.log(data);
					this.isDataLoaded = true;
					this.updateGraph();
					this.subscribeToData();
				}
			},
			err => {
				console.log(err);
				this.error = "Not able to find Audience. Please try again.";
			}
		);
	}

	randomizePoll() {
		//	randomize this.collection

		let newChartData = [];
		let newChartLabels = [];

		Math.floor(Math.random() * 6) + 1		

		newChartData.push(Math.random() * 100);
		newChartData.push(Math.random() * 100);
		newChartData.push(Math.random() * 100);
		newChartData.push(Math.random() * 100);

		let cloneData = JSON.parse(JSON.stringify(this.barChartData));
		cloneData[0].data = newChartData;
		this.barChartData = cloneData;

		console.log(this.barChartData);
		console.log(this.barChartLabels);
	}

	updateGraph() {
		let newChartData = [];
		let newChartLabels = [];

		newChartData.push(this.collection["A"]);
		newChartData.push(this.collection["B"]);
		newChartData.push(this.collection["C"]);
		newChartData.push(this.collection["D"]);

		let cloneData = JSON.parse(JSON.stringify(this.barChartData));
		cloneData[0].data = newChartData;
		this.barChartData = cloneData;

		console.log(this.barChartData);
		console.log(this.barChartLabels);
	}

	ngOnDestroy() {
		if (this.timerSubscription) this.timerSubscription.unsubscribe();
	}
}
