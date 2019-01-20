import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthorizationService} from "../../shared/authorization.service";
import {GlobalService} from "../../shared/global.service";

import { Router } from '@angular/router';


@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {

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
      this.auth.forgotPassword(email).subscribe((data) => {
        console.log("data-->"+data);
        this.globalService.setlocalStorageItem("forgotemail",email);
        this._router.navigateByUrl('forgotpasswordstep2');
        this.error="";
      }, (err)=> {
        form.value.email='';
        this.emailVerificationMessage = true;
        this.error = err;
        console.log(this.error);
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
      return true;

    }

    back()
{
  this._router.navigateByUrl('/login'); 
}
}

@Component({
  selector: 'app-forgot-step2',
  templateUrl: './forgot-step2.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotStep2Component implements OnInit {

confirmCode: boolean = false;
codeWasConfirmed: boolean = false;
error: string = "";
emailVerificationMessage: boolean = false;
data : Date = new Date();
focus;


  constructor(public auth: AuthorizationService,public _router: Router,public globalService:GlobalService) { }

  
  onSubmit(form: NgForm) {
    
    const email =  this.globalService.localStorageItem("forgotemail");
    const  verificationCode= form.value.verificationCode;
    const password = form.value.password;

    this.auth.confirmNewPassword(email, verificationCode, password)
    .subscribe((data) => {
      console.log("data-->"+data);
     
      this._router.navigateByUrl('/index');
      this.error="";
    }, (err)=> {
      form.value.email='';
      this.emailVerificationMessage = true;
      this.error = err;
      console.log(this.error);
    });   

    this.globalService.removelocalStorageItem("forgotemail");
}


  ngOnInit() {

    var body = document.getElementsByTagName('body')[0];
    body.classList.add('login-page');

    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
}

back()
{
  this._router.navigateByUrl('/forgotpassword'); 
}

}
