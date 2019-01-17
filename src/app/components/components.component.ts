import { Component, OnInit, Renderer, OnDestroy } from "@angular/core";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { NgbAccordionConfig } from "@ng-bootstrap/ng-bootstrap";
import * as Rellax from "rellax";

import { AuthorizationService } from "../shared/authorization.service";
import { Router } from "@angular/router";
import { RestApiservice } from "../shared/rest-api.service";
import { GlobalService } from "../shared/global.service";

import { aws_url } from "../shared/urls";
import { Question } from "app/shared/question.model";

@Component({
  selector: "app-components",
  templateUrl: "./components.component.html",
  styles: [
    `
      ngb-progressbar {
        margin-top: 5rem;
      }
    `
  ]
})
export class ComponentsComponent implements OnInit, OnDestroy {
  data: Date = new Date();

  page = 4;
  page1 = 5;
  page2 = 3;
  focus;
  focus1;
  focus2;

  date: { year: number; month: number };
  model: NgbDateStruct;

  public isCollapsed = true;
  public isCollapsed1 = true;
  public isCollapsed2 = true;

  state_icon_primary = true;

  constructor(
    private renderer: Renderer,
    config: NgbAccordionConfig,
    public auth: AuthorizationService,
    public _router: Router,
    public restApi: RestApiservice,
    public globalservice: GlobalService
  ) {
    config.closeOthers = true;
    config.type = "info";
  }
  isWeekend(date: NgbDateStruct) {
    const d = new Date(date.year, date.month - 1, date.day);
    return d.getDay() === 0 || d.getDay() === 6;
  }

  isDisabled(date: NgbDateStruct, current: { month: number }) {
    return date.month !== current.month;
  }

  ngOnInit() {
    var rellaxHeader = new Rellax(".rellax-header");

    var navbar = document.getElementsByTagName("nav")[0];
    navbar.classList.add("navbar-transparent");
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("index-page");
  }
  ngOnDestroy() {
    var navbar = document.getElementsByTagName("nav")[0];
    navbar.classList.remove("navbar-transparent");
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("index-page");
  }

  startQuiz() {
    console.log("STARTING QUIZ BY COMPONENT");

    var question: Question;
    question = new Question();
    question.question_id = 0;

    this.restApi.put(aws_url.GET_NEXT_QUESTION_URL, question).subscribe(
      data => {
        console.log(
          "Inside component.component.ts. GET NEXT QUESTION (start quiz) line 82"
        );
        console.log(data);
        this._router.navigateByUrl("/landing");
      },
      error => {
        console.log(error);
      }
    );
  }

  goToQuiz() {
    this._router.navigateByUrl("/audience");
  }
  manageTeam() {
    this._router.navigateByUrl("/team");
  }

  manageQuestions() {
    this._router.navigateByUrl("/questions");
  }

  manageScores() {
    this._router.navigateByUrl("/score");
  }

  goToQuestionProjector() {
    this._router.navigateByUrl("/projector");
  }

 
  goToScoreBoard() {
    this._router.navigateByUrl("/scoreboard");
  }

  teamResults()
  {
    this._router.navigateByUrl("/result");
  }
}
