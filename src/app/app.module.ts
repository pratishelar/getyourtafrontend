import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app-material.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateTAComponent } from './create-ta/create-ta.component';
import { PiechartComponent } from './dashboard/piechart/piechart.component';
import { BarchartComponent } from './dashboard/barchart/barchart.component';
import { HorizontalbarchartComponent } from './dashboard/horizontalbarchart/horizontalbarchart.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { BulkuploadComponent } from './bulkupload/bulkupload.component';
import { ProgressComponent } from './bulkupload/progress/progress.component';
import { DndDirective } from './dnd.directive';
import { SidenavbarComponent } from './sidenavbar/sidenavbar.component';
import { SearchComponent } from './search/search.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TaformComponent } from './taform/taform.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';

import { FirebaseService } from './services/firebase.service';
import { HttpClientModule } from '@angular/common/http';
import {FlexLayoutModule} from '@angular/flex-layout';
import { AuthService } from './services/Auth.service';
import { LandingpageComponent } from './landingpage/landingpage.component';

import { ErrorInterceptorProvider } from './services/error.interceptor';
import { EditUserComponent } from './edit-user/edit-user.component';
import { JwtModule } from '@auth0/angular-jwt';
import { UserEditResolver } from 'src/resolvers/user-edit.resolver';
import { PreventUnsavedFormGuard } from './guards/prevent-unsaved-form.guard';
import { PhotoEditorComponent } from './edit-user/photo-editor/photo-editor.component';
import { FileUploadModule } from 'ng2-file-upload';


export function tokenGetter(){
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CreateTAComponent,
    PiechartComponent,
    BarchartComponent,
    HorizontalbarchartComponent,
    BulkuploadComponent,
    ProgressComponent,
    DndDirective,
    SidenavbarComponent,
    SearchComponent,
    TaformComponent,
    LoginComponent,
    RegisterComponent,
    LandingpageComponent,
    EditUserComponent,
    PhotoEditorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    NgxChartsModule,
    FormsModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    NgxDatatableModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    FlexLayoutModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:5000'],
        blacklistedRoutes: ['localhost:5000/api/auth']
      }
    }),
    FileUploadModule
  ],
  exports: [
    AppMaterialModule,
    TaformComponent
  ],
  providers: [
    FirebaseService,
    AuthService,
    ErrorInterceptorProvider,
    UserEditResolver,
    PreventUnsavedFormGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
