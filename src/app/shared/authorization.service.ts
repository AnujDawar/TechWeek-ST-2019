import { Injectable } from '@angular/core';
import {AuthenticationDetails, CognitoUser, CognitoUserPool,CognitoUserAttribute} from 'amazon-cognito-identity-js';
import { Observable } from 'rxjs/Observable';
import { poolData } from './credentials';

const userPool = new CognitoUserPool(poolData);

@Injectable()
export class AuthorizationService {
    cognitoUser: any;
   email:any; 
  constructor() { }

  register(email, password,name, mobile) {
     this.email=email;
    const attributeList = [];
  
    
    var dataName = {
        Name : 'name',
        Value : name
    };
    var dataPhoneNumber = {
        Name : 'phone_number',
        Value : "+91"+mobile
    };
   
    var attributeName = new CognitoUserAttribute(dataName);
    var attributePhoneNumber = new CognitoUserAttribute(dataPhoneNumber);

    attributeList.push(attributeName);
    attributeList.push(attributePhoneNumber);

    return Observable.create(observer => {
     
      userPool.signUp(email, password, attributeList, null, (err, result) => {
        if (err) {
          console.log("signUp error", err);
          observer.error(err.message);
        }

        this.cognitoUser = result.user;
        console.log("signUp success", result);
        observer.next(result);
        observer.complete();
      });
    });

  }

  confirmAuthCode(code) {
    const user = {
      Username : this.cognitoUser.username,
      Pool : userPool,
      GroupName: "audiencegroup"
    };
    return Observable.create(observer => {
      const cognitoUser = new CognitoUser(user);
      cognitoUser.confirmRegistration(code, true, function(err, result) {
        if (err) {
          console.log(err);
          observer.error(err);
        }
        console.log("confirmAuthCode() success", result);
        observer.next(result);
        observer.complete();
      });
    });
  }

  signIn(email, password) { 

    const authenticationData = {
      Username : email,
      Password : password,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    const userData = {
      Username : email,
      Pool : userPool
    };
    const cognitoUser = new CognitoUser(userData);

    return Observable.create(observer => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
        // console.log("Group Info :"+result.getAccessToken().payload['cognito:groups'];);
          observer.next(result);
          observer.complete();
        },
        onFailure: function(err) {
          console.log(err);
          observer.error(err);
        },
      });
    });
  }

  isLoggedIn() {    
    return userPool.getCurrentUser() != null;
  }

  getAuthenticatedUser() {
    // gets the current user from the local storage
    //console.log("userPool.getCurrentUser()"+userPool.getCurrentUser());
    return userPool.getCurrentUser();
  }

  logOut() {
    this.getAuthenticatedUser().signOut();
    this.cognitoUser = null;
  }

  resendCode(){
 
    const user = {
      Username : this.cognitoUser.username,
      Pool : userPool
    };
    return Observable.create(observer => {
      const cognitoUser = new CognitoUser(user);
      cognitoUser.resendConfirmationCode(function(err, result) {
        if (err) {
          console.log(err);
          observer.error(err);
        }
        console.log("Resendf code  success", result);
        observer.next(result);
        observer.complete();
      });
    });
}



    forgotPassword(email: string) {
        let userData = {
            Username : email,//his.cognitoUser.username,
            Pool: userPool
        };

        let cognitoUser = new CognitoUser(userData);

        return Observable.create(observer => {

          cognitoUser.forgotPassword({
            onSuccess: function () {
              observer.next(observer);
              observer.complete();
            },
            onFailure: function (err) {
              console.log(err);
              observer.error(err.message);
               
            }
        });

        });

       
    }


    confirmNewPassword(email: string, verificationCode: string, password: string) {
      let userData = {
        Username : email,
        Pool: userPool
    };

      let cognitoUser = new CognitoUser(userData);      
        return Observable.create(observer => {
          cognitoUser.confirmPassword(verificationCode, password, {
            onSuccess: function () {
              observer.next(observer);
              observer.complete();
            },
            onFailure: function (err) {
              console.log(err);
              observer.error(err.message);
               console.log("Error while confirming new passsword");
            }
        });

        });
  }


}
