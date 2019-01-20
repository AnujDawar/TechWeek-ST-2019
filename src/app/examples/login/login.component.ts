import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthorizationService} from "../../shared/authorization.service";
import {GlobalService} from "../../shared/global.service";

import { Router } from '@angular/router';
import * as Rellax from 'rellax';
import { FromEventPatternObservable } from 'rxjs/observable/FromEventPatternObservable';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    data : Date = new Date();
    focus;
    focus1;
    focus2;
    error="";

    emailVerificationMessage=false;

    constructor(public auth: AuthorizationService,public _router: Router,public globalService:GlobalService) { }


    ngOnInit() {
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');

        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.add('navbar-transparent');
    }
    ngOnDestroy(){
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('login-page');

        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
    }

    onSubmit(form: NgForm) {
        const email = form.value.email.trim();
        const password = form.value.password;
      if(this.isFormValid(form))
        {
        console.log("form.value.email-->"+form.value.email);
        console.log("form.value.password-->"+form.value.password);
        this.auth.signIn(email, password).subscribe((data) => {
          console.log("data-->"+data);
          this.globalService.setlocalStorageItem("email",email);
          if(this.globalService.isAUser()||this.globalService.isSUser() || this.globalService.isPUser())
          {
            this._router.navigateByUrl('/index');
          }
          else
          {
            this._router.navigateByUrl('/audience');
          }

          this.error="";
        }, (err)=> {
          form.value.email='';
          form.value.password='';
          this.emailVerificationMessage = true;
          this.error ="Invalid credentials. Please try again.";
        });   
      }
      
    }


      isFormValid(form: NgForm)
      {
        if(form.controls["email"].value == null && form.controls["email"].value.trim() == "" )  
          {
            form.controls["email"].setValue("");
            this.error= "Please enter email.";
            return false;
          }

          if(form.controls["password"].value == null && form.controls["password"].value.trim() == "" )  
          {
            form.controls["password"].setValue("");
            this.error= "Please enter password";
            return false;
          }

          if(form.controls["password"].value.length < 6  )  
          {
            form.controls["password"].setValue("");
            this.error= "Please enter valid password (6 Characters)";
            return false;
          }
            return true;   
      }
}
