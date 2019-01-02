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

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        NouisliderModule,
        JWBootstrapSwitchModule,
        NgxPaginationModule
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
        ScoremanagementComponent
        
    ]
})
export class ExamplesModule { }
