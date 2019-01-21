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
import { BaseChartDirective } from "ng2-charts/ng2-charts";

@Component({
	selector: "app-audience-top-scorer",
	templateUrl: "./audience-top-scorer.component.html",
	styleUrls: ["./audience-top-scorer.component.scss"]
})
export class AudienceTopScorerComponent implements OnInit {
	// PolarArea
	public polarAreaChartLabels: string[] = ['', '', '', '', ''];
	public polarAreaChartData: number[] = [0, 0, 0, 0, 0];
	public polarAreaLegend: boolean = true;
	public polarAreaChartType: string = "polarArea";

	public polarAreaChartOptions = 
	{
		legend:
		{
			position: 'right',
			fullWidth: true,
			labels:
			{
				fontSize: 40,
				boxWidth: 80,
				padding: 10
			}
		},

	};

	@ViewChild(BaseChartDirective) chart: BaseChartDirective;

	collection;
	error = "";
	isDataLoaded;
	data: Date = new Date();

	constructor(
		public auth: AuthorizationService,
		public _router: Router,
		public restApi: RestApiservice,
		public globalservice: GlobalService
	) { }

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

	getAudience() {
		this.restApi.get(aws_url.AUDIENCE_ANALYSIS_URL).subscribe(
			data => {
				this.collection = data;
				console.log(data);
				this.isDataLoaded = true;
				this.updateGraph();
			},
			err => {
				console.log(err);
				this.error = "Not able to find Audience. Please try again.";
			}
		);
	}

	updateGraph() {
		let newChartData = [];
		let newChartLabels = [];

		this.collection.forEach(function (item) {
			newChartData.push(item.score);
			newChartLabels.push(item.user_email);
		});

		this.polarAreaChartData = newChartData;
		this.polarAreaChartLabels = newChartLabels;
		this.chart.chart.config.data.labels = newChartLabels;
	}
}
