import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateTAComponent } from './create-ta/create-ta.component';
import { BulkuploadComponent } from './bulkupload/bulkupload.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: '', component: AppComponent, data: { title: 'dashboard' } },
  { path: 'dashboard', component: DashboardComponent, data: { title: 'dashboard' } },
  { path: 'createta', component: CreateTAComponent, data: { title: 'createta' } },
  { path: 'bulkupload', component: BulkuploadComponent, data: { title: 'bulkupload' } },
  { path: 'search', component: SearchComponent, data: { title: 'search' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
