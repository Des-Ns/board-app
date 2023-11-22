import { Injectable } from '@angular/core';

import { RequestService } from 'src/app/shared/request.service';
import { MemberDetailsCardComponent } from './member-details-card/member-details-card.component';
import { Member, Project } from 'src/app/shared/models';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { Observable, map, take, tap, switchMap, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  projects$!: Observable<Project[]>;
  members$!: Observable<Member[]>;

  members!: Member[];
  memberProjects: Project[] | undefined;
  memberId!: number;

  constructor(
    private requestService: RequestService,
    private matDialog: MatDialog
  ) {}

  getProjects() {
    this.requestService.fetchProjects();
    this.projects$ = this.requestService.getProjects();
    return this.projects$;
  }

  getMembers() {
    this.requestService.fetchMembers();
    this.members$ = this.requestService.getAllMembers();
    return this.members$;
  }

  getMemberById(memberId: string) {
    return this.requestService.getMemberById(memberId);
  }

  getMemberProjectsTitles(memberId: string) {
    if (!this.projects$) {
      this.getProjects();
    }

    return this.projects$?.pipe(
      switchMap((projects: Project[]) => {
        if (projects) {
          return of(
            projects
              .filter((project) => project.teamIds?.includes(memberId))
              .map(
                (project: Project) => project.title
                // id: project.id,
              )
          );
        } else {
          return of([]);
        }
      })
    );
  }

  //* CREATE || EDIT MEMBER - DIALOG
  openMemberDialog(component: any, member?: Member) {
    if (member !== undefined) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = { member };
      dialogConfig.autoFocus = true;
      dialogConfig.width = '60%';

      const dialog = this.matDialog.open(component, dialogConfig);
      dialog
        .afterClosed()
        .pipe(take(1))
        .subscribe(() => {});
      return;
    }

    const dialog = this.matDialog.open(component, {
      autoFocus: true,
      width: '60%',
    });

    dialog
      .afterClosed()
      .pipe(take(1))
      .subscribe(() => {});

    return;
  }

  openMemberDetailsDialog(member: Member) {
    console.log(member);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { member };

    const dialog = this.matDialog.open(
      MemberDetailsCardComponent,
      dialogConfig
    );

    dialog
      .afterClosed()
      .pipe(take(1))
      .subscribe(() => {});
  }
}
