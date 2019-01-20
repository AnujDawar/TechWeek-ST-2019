import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JWBootstrapSwitchModule } from 'jw-bootstrap-switch-ng2';

import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { ExamplesComponent } from './examples.component';
import { SignupComponent } from './signup/signup.component';
import { AudienceComponent } from './audience/audience.component';

import { QuestionsComponent } from './questions/questions.component';
import { TeamComponent } from './team/team.component';
import { ScoremanagementComponent } from './scoremanagement/scoremanagement.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { ProjectorComponent } from './projector/projector.component';
import { ScoreboardComponent } from './audiencescore/scoreboard.component';
import { ResultsComponent } from './results/results.component';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { ForgotComponent } from './forgot/forgot.component';
import { ForgotStep2Component } from './forgot/forgot.component';


import { AudiencePollComponent } from './audience-poll/audience-poll.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        NouisliderModule,
        JWBootstrapSwitchModule,
        NgxPaginationModule,
        ChartsModule
    ],
    declarations: [
        LandingComponent,
        LoginComponent,
        ExamplesComponent,
        ProfileComponent,
        SignupComponent,
        AudienceComponent,
        QuestionsComponent,
        TeamComponent,
        ScoremanagementComponent,
        ProjectorComponent,
        ScoreboardComponent,
        ResultsComponent,
        ForgotComponent,
        ForgotStep2Component,
        AudiencePollComponent
        
    ]
})
export class ExamplesModule { }
