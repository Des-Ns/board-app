import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';

import { HeaderComponentsService } from '../header-components.service';
import { DashboardService } from 'src/app/sidenav-components/dashboard/dashboard.service';
import { ProjectCreateComponent } from 'src/app/sidenav-components/dashboard/project-create/project-create.component';
import { ProjectEditComponent } from 'src/app/sidenav-components/dashboard/project-edit/project-edit.component';
import { Member, Project } from 'src/app/shared/models';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatExpansionPanel } from '@angular/material/expansion';
import { MatDialog } from '@angular/material/dialog';

import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-projects-table',
  templateUrl: './projects-table.component.html',
  styleUrls: ['./projects-table.component.css'],
})
export class ProjectsTableComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'rowNumber',
    'title',
    'description',
    'startDate',
    'dateRange',
    'duration',
    'status',
    'team',
  ];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  dataSource = new MatTableDataSource<Project>();

  projects$!: Observable<Project[]>;
  projectsSubscription$!: Subscription;
  members$!: Observable<Member[]>;
  membersSubscription$!: Subscription;
  expansionPanel: MatExpansionPanel | undefined;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(
    private headerComponentService: HeaderComponentsService,
    public dialog: MatDialog,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.projects$ = this.headerComponentService.getProjects();
    this.projectsSubscription$ = this.projects$.subscribe((projects) => {
      this.dataSource.data = projects;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getBadgeClass(status: string): string {
    switch (status) {
      case 'to-do':
        return 'yellow-badge';
      case 'in-progress':
        return 'green-badge';
      case 'finished':
        return 'blue-badge';
      default:
        return '';
    }
  }

  onClick(project: Project) {
    console.log('onClick=>', project);
    // MANAGE TEAM MEMBERS
    this.dashboardService.openProjectDialog(ProjectEditComponent, project);
  }

  ngOnDestroy(): void {
    if (this.projectsSubscription$) {
      this.projectsSubscription$.unsubscribe();
    }
  }

  onCreateProject() {
    this.dashboardService.openProjectDialog(ProjectCreateComponent);
  }
}
