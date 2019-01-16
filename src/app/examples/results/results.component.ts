import { Component, OnInit } from "@angular/core";
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

@Component({
	selector: "app-results",
	templateUrl: "./results.component.html",
	styleUrls: ["./results.component.scss"]
})
export class ResultsComponent implements OnInit {
	collection;
	error = "";
	private timerSubscription: Subscription;
	private postsSubscription: Subscription;
	isDataLoaded;

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
				fontColor: 'white',  // x axe labels (can be hexadecimal too)
				fontSize: 20
			  },
			  gridLines: {
				color: 'white'  // grid line color (can be removed or changed)
			  }
			}],
			yAxes: [{
			  stacked: true,
			  ticks: {
				fontColor: 'white',  // y axes numbers color (can be hexadecimal too)
				min: 0,
				beginAtZero: true,
	  
			  },
			  gridLines: {
				color: 'white'  // grid line color (can be removed or changed)
			  },
			  scaleLabel: {
				display: true,
				labelString: 'score',
				fontColor: 'white',  // y axe label color (can be hexadecimal too),
				fontSize: 20
			  }
			}]
		  }
	};

	public barChartColor: Array<any> = [
		{
			backgroundColor: "blue",
			borderColor: "white",
			pointBackgroundColor: "white",
			pointBorderColor: "#fff",
			pointHoverBackgroundColor: "#fff",
			pointHoverBorderColor: "white",
			fontColor: "white"
		}
	];

	public barChartLabels: string[] = ["Team A", "Team B", "Team C", "Team D"];
	public barChartType: string = "bar";
	public barChartLegend: boolean = false;

	public barChartData: any[] = [{ data: [], label: "Score" }];

	// events
	public chartClicked(e: any): void {
		console.log(e);
	}

	public chartHovered(e: any): void {
		console.log(e);
	}

	ngOnInit() {
		this.getTeam();
	}

	refresh() {
		this.getTeam();
	}

	subscribeToData() {
		this.timerSubscription = Observable.timer(10000).subscribe(() =>
			this.getTeam()
		);
	}

	getTeam() {
		this.restApi.get(aws_url.GET_TEAM_URL).subscribe(
			data => {
				this.collection = data;
				data = Array.from(data);
				console.log(data);
				this.isDataLoaded = true;

				this.updateGraph();
				this.subscribeToData();
			},
			err => {
				console.log(err);
				this.error = "Not able to find team. Please try again.";
			}
		);
	}

	updateGraph() {
		let newChartData = [];
		let newChartLabels = [];

		this.collection.forEach(function (item) {
			newChartData.push(item.score);
			newChartLabels.push(item.team_name);
		});

		let cloneData = JSON.parse(JSON.stringify(this.barChartData));
		cloneData[0].data = newChartData;
		this.barChartData = cloneData;

		this.barChartLabels = newChartLabels;

		console.log(this.barChartData);
		console.log(this.barChartLabels);
	}

	ngOnDestroy() {
		if (this.timerSubscription) this.timerSubscription.unsubscribe();
	}
}
