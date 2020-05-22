import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateTAComponent } from './create-ta/create-ta.component';
import { BulkuploadComponent } from './bulkupload/bulkupload.component';
import { SearchComponent } from './search/search.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LandingpageComponent } from './landingpage/landingpage.component';

const routes: Routes = [
  { path: '', component: LandingpageComponent },
  { path: 'landingpage', component: LandingpageComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'createta', component: CreateTAComponent },
  { path: 'bulkupload', component: BulkuploadComponent },
  { path: 'search', component: SearchComponent, data: { title: 'search' } },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
