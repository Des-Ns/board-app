import { Component, EventEmitter, Output } from '@angular/core';

import { TeamService } from 'src/app/sidenav-components/team/team.service';
import { DashboardService } from 'src/app/sidenav-components/dashboard/dashboard.service';
import { ProjectCreateComponent } from 'src/app/sidenav-components/dashboard/project-create/project-create.component';
import { MemberCreateComponent } from 'src/app/sidenav-components/team/member-create/member-create.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Output() sidenavToggle = new EventEmitter<void>();

  constructor(
    private dashboardService: DashboardService,
    private teamService: TeamService
  ) {}

  openCreateProjectDialog() {
    this.dashboardService.openProjectDialog(ProjectCreateComponent);
  }

  openCreateMemberDialog() {
    this.teamService.openMemberDialog(MemberCreateComponent);
  }

  onMenuChange(ev: Event) {
    this.sidenavToggle.emit();
  }
}
