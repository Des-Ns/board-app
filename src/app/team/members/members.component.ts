import {
  Component,
  ViewChild,
  OnInit,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { Member } from 'src/app/dashboard/dashboard.models';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { TeamService } from '../team.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
})
export class MembersComponent implements OnInit, AfterViewInit, OnDestroy {
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
  membersSubscription$!: Subscription;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private teamService: TeamService) {}

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

  onClick() {
    console.log('onClick');
    this.teamService.getMembers();
  }

  ngOnDestroy(): void {
    if (this.membersSubscription$) {
      this.membersSubscription$.unsubscribe();
    }
  }
}
