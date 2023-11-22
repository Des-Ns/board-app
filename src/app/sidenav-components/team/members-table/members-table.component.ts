import {
  Component,
  ViewChild,
  OnInit,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';

import { TeamService } from '../team.service';
import { MemberCreateComponent } from '../member-create/member-create.component';
import { Member } from 'src/app/shared/models';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-members',
  templateUrl: './members-table.component.html',
  styleUrls: ['./members-table.component.css'],
})
export class MembersTableComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = [
    'rowNumber',
    'name',
    'email',
    'id',
    'occupation',
    'projects',
    'bio',
  ];
  dataSource = new MatTableDataSource<Member>();
  members$!: Observable<Member[]>;
  member$!: Observable<Member | undefined>;
  membersSubscription$!: Subscription;
  safeHtml: string = '&lt;div&gt;This is safe&lt;/div&gt;';

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(public teamService: TeamService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.members$ = this.teamService.getMembers();
    this.membersSubscription$ = this.members$.subscribe((members) => {
      this.dataSource.data = members;
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

  onCreateMember() {
    this.teamService.openMemberDialog(MemberCreateComponent);
  }

  onRowClick(memberId: string) {
    // const member: Member | undefined = this.dataSource.data.find(
    //   (member: Member) => member.id === memberId
    // );

    this.teamService
      .getMemberById(memberId)
      .pipe(take(1))
      .subscribe((member) => {
        this.teamService.openMemberDetailsDialog(member as Member);
      });
  }

  ngOnDestroy(): void {
    if (this.membersSubscription$) {
      this.membersSubscription$.unsubscribe();
    }
  }
}
