import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './sidenav-components/dashboard/dashboard/dashboard.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { TeamComponent } from './sidenav-components/team/team/team.component';
import { ProjectsTableComponent } from './header-components/projects-table/projects-table.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'team', component: TeamComponent },
  { path: 'projects-table', component: ProjectsTableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
