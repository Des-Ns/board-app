import { Component, EventEmitter, Output } from '@angular/core';
import { DashboardService } from 'src/app/dashboard/dashboard.service';
import { ProjectCreateComponent } from 'src/app/dashboard/project-create/project-create.component';
import { MemberCreateComponent } from 'src/app/team/member-create/member-create.component';
import { TeamService } from 'src/app/team/team.service';

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
