import { Component, OnInit } from '@angular/core';
import {AuthorizationService} from "../../shared/authorization.service";
import { Router } from '@angular/router';
import * as Rellax from 'rellax';
import {RestApiservice} from "../../shared/rest-api.service";
import {GlobalService} from "../../shared/global.service";
import { NgForm } from "@angular/forms";
import { aws_url } from 'app/shared/urls';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  //  GET_ALL_TEAMS="https://csq4s4nraf.execute-api.ap-south-1.amazonaws.com/dev/teams";
  //  CREATE_TEAM="https://csq4s4nraf.execute-api.ap-south-1.amazonaws.com/dev/teams";
  //  DELETE_TEAM="https://csq4s4nraf.execute-api.ap-south-1.amazonaws.com/dev/teams";

   constructor(private auth: AuthorizationService,private _router: Router,private restApi: RestApiservice, private globalservice:GlobalService) { }
    
   error ='';

   isDataLoaded;

   p: number = 1;
   collection; 
   
  ngOnInit() {
   this.getTeam() ;
  }

  createTeam(teamForm: NgForm) 
	{
		if(!this.isFormValid(teamForm))
			return;
    var teamName = teamForm.value.team_name;
    var isActive = teamForm.value.is_active;

    console.log("isActive-->"+isActive);

    const jsonData = {
    "team_name" : teamName,
     "is_active" : isActive
    };
    this.restApi.post(aws_url.CREATE_TEAM_URL,jsonData).subscribe(
      (data) => {        
       console.log("Data"+data);
       this.getTeam() ;
      },
      (err) => {
        console.log(err);
        this.error = "Not able to create team. Please try again.";
      }
    );
  }
  

  getTeam() 
	{
    this.restApi.get(aws_url.GET_TEAM_URL).subscribe(
      (data) => {   
        this.collection=data;    
       console.log("Data"+data);
       this.isDataLoaded=true;
      },
      (err) => {
        console.log(err);
        this.error = "Not able to find team. Please try again.";
      }
    );
	}


  isFormValid(form: NgForm)
	{
		if(form.controls["team_name"].value != null &&
			form.controls["team_name"].value.trim() != "" )
			{
				return true;
			}

			else
			{
			 this.error= "Please enter all the required fields";

				return false;
			}
	}



  removeTeam(id) 
	{
    console.log("id remove"+id)
    this.restApi.delete(aws_url.DELETE_TEAM_URL +"?team_id="+id).subscribe(
      (data) => { 
         
       console.log("Data"+data);
       this.isDataLoaded=true;
       this.getTeam();
      },
      (err) => {
        console.log(err);
        this.error = "Not able to find team. Please try again.";
      }
    );
	}
  

  back()
  {
  this._router.navigateByUrl('/index');
  }


}
