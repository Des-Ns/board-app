import { Injectable } from '@angular/core';

import { RequestService } from 'src/app/shared/request.service';
import { MemberDetailsCardComponent } from './member-details-card/member-details-card.component';
import { Member, Project } from 'src/app/shared/models';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import {
  Observable,
  map,
  take,
  tap,
  switchMap,
  of,
  mergeMap,
  BehaviorSubject,
  distinctUntilChanged,
  shareReplay,
  concatMap,
} from 'rxjs';

interface ProjectMainMember {
  projectId: string;
  projectTitle: string;
  members?: {
    id: string;
    occupation: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar: string;
    phones: string[];
  };
}

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  projects$!: Observable<Project[]>;
  members$!: Observable<Member[]>;
  projectMainMembers$!: Observable<any>;

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

  getProjectsMainMembers() {
    this.getProjects();
    return (this.projectMainMembers$ = this.members$.pipe(
      map((members: Member[]) => {
        return members.map((member: Member) => ({
          id: member.id,
          occupation: member.occupation,
          firstName: member.firstName,
          lastName: member.lastName,
          email: member.email,
          avatar: member.avatar,
          phones: member.phones,
        }));
      }),
      tap((val) => console.log(val)),
      switchMap((members) =>
        this.projects$.pipe(
          tap((val) => console.log(members)),
          map((projects: Project[]) =>
            projects.map(({ id, title, teamIds }) => ({
              id: id,
              title: title,
              teamIds: teamIds,
            }))
          ),
          map((projecIds: { id: string; title: string; teamIds: string[] }[]) =>
            projecIds.map((project) => {
              const mainTeamMembers = members.filter((member: any) =>
                project.teamIds?.includes(member.id)
              );
              return {
                projectId: project.id,
                projectTitle: project.title,
                members: mainTeamMembers,
              };
            })
          ),
          tap((val) => console.log(val))
        )
      )
    ));
  }

  getMemberById(memberId: string) {
    return this.requestService.getMemberById(memberId);
  }

  getMemberProjectsTitles(memberId: string) {
    if (!this.projects$) {
      this.getProjects();
    }

    return this.projects$?.pipe(
      take(1),
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

//* TAKE A LOOK
// getProjectsMainMembers() {
//   this.getProjects();

//   return (this.projectMainMembers$ = this.members$.pipe(
//     switchMap((members) =>
//       this.projects$.pipe(
//         map((projects: Project[]) =>
//           projects.map(({ id, title, teamIds }) => ({
//             id: id,
//             title: title,
//             teamIds: teamIds,
//           }))
//         ),
//         map((projecIds: { id: string; title: string; teamIds: string[] }[]) =>
//           projecIds.map((project) => {
//             const mainTeamMembers = members.filter((member: any) =>
//               project.teamIds?.includes(member.id)
//             );
//             return {
//               projectId: project.id,
//               projectTitle: project.title,
//               members: mainTeamMembers,
//             };
//           })
//         ),
//         tap((val) => console.log('After mapping:', val))
//       )
//     )
//   ));
// }
