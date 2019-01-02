import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsComponent } from './components/components.component';
import { LandingComponent } from './examples/landing/landing.component';
import { LoginComponent } from './examples/login/login.component';
import { ProfileComponent } from './examples/profile/profile.component';
import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';
import { SignupComponent } from './examples/signup/signup.component';
import { AudienceComponent } from './examples/audience/audience.component';
import { QuestionsComponent } from './examples/questions/questions.component';
import { TeamComponent } from './examples/team/team.component';
import { ScoremanagementComponent } from './examples/scoremanagement/scoremanagement.component';




const routes: Routes =[
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index',                component: ComponentsComponent },
    { path: 'nucleoicons',          component: NucleoiconsComponent },
    { path: 'landing',     component: LandingComponent },
    { path: 'login',       component: LoginComponent },
    { path: 'register',       component: SignupComponent },
    { path: 'audience',     component:AudienceComponent },
    { path: 'questions',     component:QuestionsComponent },
    { path: 'team',     component:TeamComponent },
    { path: 'score',    component: ScoremanagementComponent}
    
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    exports: [
    ],
})
export class AppRoutingModule { }
