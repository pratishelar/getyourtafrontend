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
import { AuthGuard } from './guards/auth.guard';
import { LogoutGuard } from './guards/logout.guard';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UserEditResolver } from 'src/resolvers/user-edit.resolver';
import { PreventUnsavedFormGuard } from './guards/prevent-unsaved-form.guard';

const routes: Routes = [
  { path: '', component: LandingpageComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [LogoutGuard],
    children: [
      { path: 'landingpage', component: LandingpageComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'createta', component: CreateTAComponent },
      { path: 'bulkupload', component: BulkuploadComponent },
      { path: 'search', component: SearchComponent },
      { path: 'edit', component: EditUserComponent, 
        resolve: {user : UserEditResolver}, canDeactivate: [PreventUnsavedFormGuard]}
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
