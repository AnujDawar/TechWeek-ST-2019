import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
 //import {Observable} from 'rxjs';
//import { Observable } from 'rxjs/Rx';
import { AuthorizationService} from "../shared/authorization.service";
import { Http, Response ,Headers,RequestOptions, ResponseContentType}   from '@angular/http';
//import { Observable } from 'rxjs/Observable';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class RestApiservice {
  constructor(private http: Http,private auth: AuthorizationService) { }
  
  requestOptions={};


  get(baseUrl): any {

    const headers = new Headers();
    console.log("Inside get");
    var authenticatedUser = this.auth.getAuthenticatedUser();
    if (authenticatedUser == null) {
        console.log(" returning nothing");
      return;
    }
    console.log("authenticatedUser-->"+authenticatedUser)

    authenticatedUser.getSession((err, session) => {
      if (err) {
        console.log(err);
        return;
      }
      const token = session.getIdToken().getJwtToken();      
      const headers = new Headers();
      headers.append('Authorization', token);      
      var that = this;
      this.auth.getAuthenticatedUser().getSession((err, session) => {
        if (err) {
          console.log("Err"+err);
          return;
        }

        const headers = new Headers();
        const token = session.getIdToken().getJwtToken();        
        headers.append('Authorization', token); 

        console.log("token-->"+token);
        this.requestOptions = {                                                                                                                                                                                 
            headers: new Headers(headers), 
          };

          console.log("headers--->"+headers);
       //return  this.http.get('https://csq4s4nraf.execute-api.ap-south-1.amazonaws.com/dev/question',requestOptions);
          
      });
    });
    return this.http.get(baseUrl, this.requestOptions).map(this.extractData).catch(this.handleError);
  }


  post(baseUrl,data): any {

    const headers = new Headers();
    console.log("Inside get");
    var authenticatedUser = this.auth.getAuthenticatedUser();
    if (authenticatedUser == null) {
        console.log(" returning nothing");
      return;
    }
    //console.log("authenticatedUser-->"+authenticatedUser)

    authenticatedUser.getSession((err, session) => {
      if (err) {
        console.log(err);
        return;
      }
      const token = session.getIdToken().getJwtToken();      
      const headers = new Headers();
      headers.append('Authorization', token);      
      var that = this;
      this.auth.getAuthenticatedUser().getSession((err, session) => {
        if (err) {
          console.log("Err"+err);
          return;
        }

        const headers = new Headers();
        const token = session.getIdToken().getJwtToken();        
        headers.append('Authorization', token); 

        console.log("token-->"+token);
        this.requestOptions = {                                                                                                                                                                                 
            headers: new Headers(headers), 
          };

          //console.log("headers--->"+headers);
       //return  this.http.get('https://csq4s4nraf.execute-api.ap-south-1.amazonaws.com/dev/question',requestOptions);
          
      });
    });
    return this.http.post(baseUrl, data, this.requestOptions).map(this.extractData).catch(this.handleError);
  }

  put(baseUrl,data): any {

    const headers = new Headers();
    console.log("Inside get");
    var authenticatedUser = this.auth.getAuthenticatedUser();
    if (authenticatedUser == null) {
        console.log(" returning nothing");
      return;
    }
    //console.log("authenticatedUser-->"+authenticatedUser)

    authenticatedUser.getSession((err, session) => {
      if (err) {
        console.log(err);
        return;
      }
      const token = session.getIdToken().getJwtToken();      
      const headers = new Headers();
      headers.append('Authorization', token);      
      var that = this;
      this.auth.getAuthenticatedUser().getSession((err, session) => {
        if (err) {
          console.log("Err"+err);
          return;
        }

        const headers = new Headers();
        const token = session.getIdToken().getJwtToken();        
        headers.append('Authorization', token); 

        console.log("token-->"+token);
        this.requestOptions = {                                                                                                                                                                                 
            headers: new Headers(headers), 
          };
      });
    });
    return this.http.put(baseUrl, data, this.requestOptions).map(this.extractData).catch(this.handleError);
  }

  delete(baseUrl): any {

    const headers = new Headers();
    console.log("Inside get");
    var authenticatedUser = this.auth.getAuthenticatedUser();
    if (authenticatedUser == null) {
        console.log(" returning nothing");
      return;
    }
    //console.log("authenticatedUser-->"+authenticatedUser)

    authenticatedUser.getSession((err, session) => {
      if (err) {
        console.log(err);
        return;
      }
      const token = session.getIdToken().getJwtToken();      
      const headers = new Headers();
      headers.append('Authorization', token);      
      var that = this;
      this.auth.getAuthenticatedUser().getSession((err, session) => {
        if (err) {
          console.log("Err"+err);
          return;
        }

        const headers = new Headers();
        const token = session.getIdToken().getJwtToken();        
        headers.append('Authorization', token); 

        console.log("token-->"+token);
        this.requestOptions = {                                                                                                                                                                                 
            headers: new Headers(headers), 
          };

          //console.log("headers--->"+headers);
       //return  this.http.get('https://csq4s4nraf.execute-api.ap-south-1.amazonaws.com/dev/question',requestOptions);
          
      });
    });
    return this.http.delete(baseUrl,  this.requestOptions).map(this.extractData).catch(this.handleError);
  }



  private handleError(error:any) {
    /* In a real world app, we might use a remote logging infrastructure
     We'd also dig deeper into the error to get a better message*/
    /* error = error.json();
     console.log(error);
    let errMsg = (error.errorMessage) ? error.errorMessage :
        error.errorCode ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(errMsg);*/
    //  return Observable.throw('Server error, Please try again.');

    return Observable.throw(error.text() ? error.json().errorMessage : {});
}
private extractData(res: Response) {
    console.log("res.json()-->"+res.json());
    console.log("res.text()-->"+res.text());
    return res.text() ? res.json() : {};
}


//   getUserById(id: number) {
//     return this.http.get<any>(this.baseUrl + '/' + id);
//   }

//   createUser(user: User) {
//     return this.http.post(this.baseUrl, user);
//   }

//   updateUser(user: User) {
//     return this.http.put(this.baseUrl + '/' + user.id, user);
//   }

//   deleteUser(id: number) {
//     return this.http.delete(this.baseUrl + '/' + id);
//   }
}
