import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { AuthorizationService } from "../../shared/authorization.service";
import { GlobalService } from "../../shared/global.service";

import { Router } from '@angular/router';
import * as Rellax from 'rellax';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {


  confirmCode: boolean = false;
  codeWasConfirmed: boolean = false;
  error: string = "";
  emailVerificationMessage: boolean = false;
  data: Date = new Date();
  focus;
  focus1;
  focus2;

  constructor(public auth: AuthorizationService, public _router: Router, public globalService: GlobalService) { }

  ngOnInit() {

    var rellaxHeader = new Rellax('.rellax-header');


    var body = document.getElementsByTagName('body')[0];
    body.classList.add('login-page');

    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
  }


  register(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    const name = form.value.name;
    const mobile = '9999999999';//form.value.mobile;
    this.globalService.setlocalStorageItem("email", email);
    console.log("form.value.email-->" + form.value.email);

    if (this.isFormValid(form)) {
      this.auth.register(email, password, name, mobile).subscribe(
        (data) => {
          this.confirmCode = true;
          this.error = "";
        },
        (err) => {
          console.log(err);
          this.emailVerificationMessage = true;
          this.error = err;
          //this.error = "Please enter valid data.";
        }
      );
    }
  }


  validateAuthCode(form: NgForm) {
    const code = form.value.code;
    this.auth.confirmAuthCode(code).subscribe(
      (data) => {
        this.error = "";
        this.codeWasConfirmed = true;
        this.confirmCode = false;
        this._router.navigateByUrl('/landing');
      },
      (err) => {
        console.log(err);
        // this.error =err.message;
        this.error = "Confirm Authorization Error has occurred";
      });
  }

  onSubmit(form: NgForm) {
    const email = form.value.email.trim();
    const password = form.value.password;

    this.auth.signIn(email, password).subscribe((data) => {
      if (this.globalService.isAUser() || this.globalService.isSUser()) {
        this._router.navigateByUrl('/index');
      }
      else {
        this._router.navigateByUrl('/audience');
      }
      this.error = "";
    }, (err) => {
      this.emailVerificationMessage = true;
      this.error = err.message;
      this.error = "Confirm Authorization Error has occurred";
    });
  }

  resendCode() {
    this.auth.resendCode().subscribe((data) => {
      console.log("Data-->" + data);
      this.error = "";
    }, (err) => {
      this.error = err.message;
      console.log("Error->" + err);
      this.error = "Confirm Authorization Error has occurred";
    });
  }

  ngOnDestroy() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('login-page');

    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
  }


  //form.controls["mobile"].value != null &&
  //form.controls["mobile"].value.trim() != "" &&

  isFormValid(form: NgForm) {
    if (form.controls["name"].value == null && form.controls["name"].value.trim() == "") {
      form.controls["name"].setValue("");
      this.error = "Please enter valid name field.";
      return false;
    }

    if (form.controls["email"].value == null && form.controls["email"].value.trim() == "") {
      form.controls["email"].setValue("");
      this.error = "Please enter valid mail field.";
      return false;
    }
    if (form.controls["password"].value == null && form.controls["password"].value == "") {
      this.error = "Please enter valid mail field.";
      return false;
    }
    if (form.controls["password"].value.length < 6) {
      form.controls["password"].setValue("");
      this.error = "Please enter valid password field (Min 6 Characters).";
      return false;
    }

    return true;

  }

}
