import { Component, ViewChild, Input } from '@angular/core';

import { TeamService } from '../team.service';
import { Member } from 'src/app/shared/models';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Observable, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-teams-table',
  templateUrl: './teams-table.component.html',
  styleUrls: ['./teams-table.component.css'],
})
export class TeamsTableComponent {
  @Input() tableData!: any;

  displayedColumns: string[] = [
    'rowNumber',
    'occupation',
    'name',
    'email',
    'phone',
  ];
  dataSource = new MatTableDataSource<any>();

  members$!: Observable<Member[]>;
  member$!: Observable<Member | undefined>;

  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(public teamService: TeamService) {}

  ngOnInit(): void {
    console.log(this.tableData);
    if (this.tableData.members.length > 0) {
      this.dataSource.data = this.tableData.members;
    } else {
      this.dataSource.data = [];
    }
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  onRowClick(memberId: string) {
    this.teamService
      .getMemberById(memberId)
      .pipe(take(1))
      .subscribe((member) => {
        this.teamService.openMemberDetailsDialog(member as Member);
      });
  }

  ngOnDestroy(): void {}
}
