import {
	Component,
	OnInit,
	ViewChild,
	ElementRef,
	Renderer
} from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthorizationService } from "../../shared/authorization.service";
import { Router } from "@angular/router";
import { Http } from "@angular/http";
import { Question } from "../../shared/question.model";
import { httpFactory } from "@angular/http/src/http_module";
import { GlobalService } from "../../shared/global.service";
import { aws_url } from "../../shared/urls";

import { NgbAccordionConfig } from "@ng-bootstrap/ng-bootstrap";
import * as Rellax from "rellax";
import { RestApiservice } from "app/shared/rest-api.service";

@Component({
	selector: "app-questions",
	templateUrl: "./questions.component.html",
	styleUrls: ["./questions.component.scss"]
})
export class QuestionsComponent implements OnInit {
	@ViewChild("regform") questionForm: NgForm;

	questionList: Question[] = [];
	isDataLoaded: boolean = true;
	data: Date = new Date();
	submitQuestionText: string = "ADD QUESTION";
	currentQuestion: Question;
	public questionInputBox: string;
	questionListText: string = "Question List is Empty";
	asset_path: string;
	asset_name: string;

	constructor(
		public auth: AuthorizationService,
		public _router: Router,
		public http: Http,
		public globalservice: GlobalService,
		private renderer: Renderer,
		public restApi: RestApiservice,
		config: NgbAccordionConfig
	) {
		config.closeOthers = true;
		config.type = "info";
	}

	ngOnInit() {
		var rellaxHeader = new Rellax(".rellax-header");
		this.currentQuestion = new Question();
		this.refreshQuestionList();
	}

	createQuestion(questionForm: NgForm) {
		if (!this.isFormValid()) return;

		var question = questionForm.value;
		var correct_choice = question[question["correct_choice"]];
		
		question["is_active"] = 0;
		question["correct_choice"] = correct_choice;

		if (this.submitQuestionText == "ADD QUESTION") {
			this.restApi.post(aws_url.CREATE_QUESTION_URL, question).subscribe(
				response => {
					this.resetForm();
				},
				error => console.log(error)
			);
		} else if (this.submitQuestionText == "SAVE CHANGES") {
			question.question_id = this.currentQuestion.question_id;

			console.log("UPDATE REQUEST BODY: " + JSON.stringify(question));

			this.restApi.put(aws_url.UPDATE_QUESTION_URL, question).subscribe(
				response => {
					console.log("RESPONSE FOR UPDATE QUESTION: " + response);
					this.resetForm();
				},
				error => console.log(error)
			);
		}
	}

	onEditQuestion(question: Question) {
		this.submitQuestionText = "SAVE CHANGES";
		this.currentQuestion = question;

		console.log("SELECTED QUESTION FOR EDITING: " + JSON.stringify(question));

		this.questionForm.controls["question"].setValue(question.question);
		this.questionForm.controls["choice_1"].setValue(question.choice_1);
		this.questionForm.controls["choice_2"].setValue(question.choice_2);
		this.questionForm.controls["choice_3"].setValue(question.choice_3);
		this.questionForm.controls["choice_4"].setValue(question.choice_4);
		this.questionForm.controls["asset_name"].setValue(question.asset_name);
		this.questionForm.controls["round"].setValue(question.round);
		this.questionForm.controls["team"].setValue(question.team);

		this.asset_name = question.asset_name;
		this.asset_path = question.asset_path;

		switch (question.correct_choice) {
			case question.choice_1:
				this.questionForm.controls["correct_choice"].setValue("choice_1");
				break;

			case question.choice_2:
				this.questionForm.controls["correct_choice"].setValue("choice_2");
				break;

			case question.choice_3:
				this.questionForm.controls["correct_choice"].setValue("choice_3");
				break;

			case question.choice_4:
				this.questionForm.controls["correct_choice"].setValue("choice_4");
				break;
		}

		this.currentQuestion.question_id = question.question_id;
		this.currentQuestion.asset_name = question.asset_name;
	}

	refreshQuestionList() {
		//	read all the questions

		this.restApi.get(aws_url.GET_ALL_QUESTION_URL).subscribe(
			response => {
				var data = Array.from(response);

				// var data = response.json();

				if (data.length > 0) this.questionListText = "Question List";
				else this.questionListText = "Question List is Empty";

				this.questionList.push(...response);

				this.questionList.sort(function (a, b) {
					if (a.question_id > b.question_id) return 1;
					if (a.question_id < b.question_id) return -1;
					return 0;
				});
			},
			error => {
				console.log(error);
			}
		);
	}

	deleteQuestion() {
		console.log("QUESTIO ID FOR DELETION: " + this.currentQuestion.question_id);

		var deleteQuestionPrompt = confirm("Delete this question?");

		if (!deleteQuestionPrompt) return;

		this.restApi
			.delete(
				aws_url.DELETE_QUESTION_URL +
				"?question_id=" +
				this.currentQuestion.question_id
			)
			.subscribe(
				response => {
					console.log(response);
					this.resetForm();
				},
				error => {
					console.log(error);
				}
			);
	}

	resetForm() {
		this.asset_name = "";
		this.asset_path = "";
		this.questionForm.reset();
		this.submitQuestionText = "ADD QUESTION";
		this.questionList = [];
		this.refreshQuestionList();
	}

	isFormValid() {
		if (
			this.questionForm.controls["question"].value != null &&
			this.questionForm.controls["question"].value.trim() != "" &&
			this.questionForm.controls["choice_1"].value != null &&
			this.questionForm.controls["choice_1"].value.trim() != "" &&
			this.questionForm.controls["choice_2"].value != null &&
			this.questionForm.controls["choice_2"].value.trim() != "" &&
			this.questionForm.controls["choice_3"].value != null &&
			this.questionForm.controls["choice_3"].value.trim() != "" &&
			this.questionForm.controls["choice_4"].value != null &&
			this.questionForm.controls["choice_4"].value.trim() != "" &&
			this.questionForm.controls["correct_choice"].value != null &&
			this.questionForm.controls["correct_choice"].value.trim() != ""
		) {
			console.log(this.questionForm.controls["question"].value);
			console.log(this.questionForm.controls["choice_1"].value);
			console.log(this.questionForm.controls["choice_2"].value);
			console.log(this.questionForm.controls["choice_3"].value);
			console.log(this.questionForm.controls["choice_4"].value);
			console.log(this.questionForm.controls["correct_choice"].value);

			return true;
		} else {
			alert("Please enter all the required fields");
			return false;
		}
	}

}
