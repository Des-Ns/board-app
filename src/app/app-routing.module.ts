import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './sidenav-components/dashboard/dashboard/dashboard.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { TeamComponent } from './sidenav-components/team/team/team.component';
import { ProjectsTableComponent } from './header-components/projects-table/projects-table.component';
import { ReportsUnderConstruction } from './sidenav-components/reports/reports-under-construction/under-construction.component';
import { ActivitiesUnderConstructionComponent } from './sidenav-components/activities/activities-under-construction/activities-under-construction.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'team', component: TeamComponent },
  { path: 'projects-table', component: ProjectsTableComponent },
  { path: 'reports', component: ReportsUnderConstruction },
  { path: 'activities', component: ActivitiesUnderConstructionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
