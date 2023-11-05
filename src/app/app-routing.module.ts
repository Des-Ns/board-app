import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { TeamComponent } from './team/team/team.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'team', component: TeamComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
