import { Component, OnInit, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy, CommonModule } from '@angular/common';
import { AuthorizationService } from "../../shared/authorization.service";

import { RestApiservice } from "../../shared/rest-api.service";
import { GlobalService } from "../../shared/global.service";
import { Router } from '@angular/router';
import { aws_url } from '../urls';
import { Question } from '../question.model';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    private toggleButton: any;
    private sidebarVisible: boolean;
    email: any;
    constructor(public location: Location, private element: ElementRef, private auth: AuthorizationService, private _router: Router, private globalService: GlobalService, private restApi: RestApiservice) {
        this.sidebarVisible = false;
    }

    // nextquestionurl="https://csq4s4nraf.execute-api.ap-south-1.amazonaws.com/dev/question/next";
    ngOnInit() {
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    }



    doLogout() {
        this.auth.logOut();
        //this._router.navigateByUrl('/login');
    }



    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const html = document.getElementsByTagName('html')[0];
        setTimeout(function () {
            toggleButton.classList.add('toggled');
        }, 500);
        html.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const html = document.getElementsByTagName('html')[0];
        // console.log(html);
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        html.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };

    isDocumentation() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if (titlee === '/documentation') {
            return true;
        }
        else {
            return false;
        }
    }

    startQuiz() {
        var question: Question;
        question = new Question();
        question.question_id = 0;

        this.restApi.put(aws_url.GET_NEXT_QUESTION_URL, question).subscribe(
            (data) => {
                console.log(data);
                this._router.navigateByUrl('/landing');
            },
            function (error) {
                console.log(error);
            }
        );
    }
}
