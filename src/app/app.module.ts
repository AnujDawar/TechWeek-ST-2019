import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { ExamplesModule } from './examples/examples.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import {AuthorizationService} from "./shared/authorization.service";
import {GlobalService} from "./shared/global.service";
import {RestApiservice} from "./shared/rest-api.service";
import {HttpModule} from "@angular/http";
import {HttpClientModule} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { QuizOverComponent } from './quiz-over/quiz-over.component'; // <-- import the module
import { ChartsModule } from 'ng2-charts/ng2-charts';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        QuizOverComponent
    ],
    imports: [
        BrowserAnimationsModule,
        NgbModule.forRoot(),
        FormsModule,
        RouterModule,
        AppRoutingModule,
        NgxPaginationModule,
        ComponentsModule,
        ExamplesModule,
        HttpClientModule,
        HttpModule,
        ChartsModule
        
    ],
    providers: [AuthorizationService,RestApiservice,GlobalService],
    bootstrap: [AppComponent]
})
export class AppModule { }
