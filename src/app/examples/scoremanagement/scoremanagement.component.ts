import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { AuthorizationService } from "../../shared/authorization.service";
import { Router } from "@angular/router";
import * as Rellax from "rellax";
import { RestApiservice } from "../../shared/rest-api.service";
import { GlobalService } from "../../shared/global.service";
import { NgForm } from "@angular/forms";
import { aws_url } from "../../shared/urls";
import { Team } from "app/shared/Team.modal";

@Component({
  selector: "app-scoremanagement",
  templateUrl: "./scoremanagement.component.html",
  styleUrls: ["./scoremanagement.component.scss"]
})
export class ScoremanagementComponent implements OnInit {
  changeScore: any;

  @ViewChild("regform") scoreRef: NgForm;

  constructor(
    public auth: AuthorizationService,
    public _router: Router,
    public restApi: RestApiservice,
    public globalservice: GlobalService
  ) { }
  data: Date = new Date();
  _data: any;
  isDataLoaded = false;
  error = "";
  score;

  p: number = 1;

  ngOnInit() {
    this.getTeam();
  }

  getTeam() {
    this.restApi.get(aws_url.GET_TEAM_URL).subscribe(
      data => {
        this._data = data;
        console.log("Data" + data);
        this.isDataLoaded = true;
      },
      err => {
        console.log(err);
        this.error = "Not able to find team. Please try again.";
      }
    );
  }

  addScore(team: Team, change: number) {

    if (change) {
      team.score = (change * 1) + (team.score * 1);
      this.restApi.put(aws_url.UPDATE_TEAM_URL, team).subscribe(
        data => {
          console.log(data);
          this.scoreRef.reset();
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  deleteScore(team: Team, change: number) {
    if (change) {
      team.score = (team.score * 1) - (change * 1);
      this.restApi.put(aws_url.UPDATE_TEAM_URL, team).subscribe(
        data => {
          console.log(data);
          this.scoreRef.reset();
        },
        error => {
          console.log(error);
        }
      );
    }
  }
}
