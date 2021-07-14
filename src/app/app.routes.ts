import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
]

@NgModule({imports: [
		RouterModule.forRoot(routes, {})
	],
	exports: [RouterModule],
})

export class AppRoutingModule { }
