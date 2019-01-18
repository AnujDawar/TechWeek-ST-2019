import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
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
import { QuizOverComponent } from './quiz-over/quiz-over.component';
import { ProjectorComponent } from './examples/projector/projector.component';
import { ScoreboardComponent } from './examples/audiencescore/scoreboard.component';
import { ResultsComponent } from './examples/results/results.component';
import { ForgotComponent, ForgotStep2Component } from './examples/forgot/forgot.component';




const routes: Routes = [
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index', component: ComponentsComponent },
    { path: 'nucleoicons', component: NucleoiconsComponent },
    { path: 'landing', component: LandingComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: SignupComponent },
    { path: 'audience', component: AudienceComponent },
    { path: 'questions', component: QuestionsComponent },
    { path: 'team', component: TeamComponent },
    { path: 'score', component: ScoremanagementComponent },
    { path: 'quiz-over', component: QuizOverComponent },
    { path: 'projector', component: ProjectorComponent },
    { path: 'scoreboard', component: ScoreboardComponent },
    { path: 'result', component: ResultsComponent },
    { path: 'forgotpassword', component: ForgotComponent },
    { path: 'forgotpasswordstep2', component: ForgotStep2Component }

    
    
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
