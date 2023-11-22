import { Component, Inject } from '@angular/core';

import { TeamService } from '../team.service';
import { RequestService } from 'src/app/shared/request.service';
import { MemberEditComponent } from '../member-edit/member-edit.component';
import { Member } from 'src/app/shared/models';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-member-details-card',
  templateUrl: './member-details-card.component.html',
  styleUrls: ['./member-details-card.component.css'],
})
export class MemberDetailsCardComponent {
  member!: Member;

  constructor(
    private matDialogRef: MatDialogRef<MemberDetailsCardComponent, any>,
    @Inject(MAT_DIALOG_DATA) public data: { member: Member },
    private teamService: TeamService,
    private requestService: RequestService
  ) {
    if (data && data.member) {
      this.member = data.member as Member;
    }
  }

  onEditMember() {
    this.matDialogRef.close();
    this.teamService.openMemberDialog(MemberEditComponent, this.member);
  }

  onDeleteMember() {
    this.matDialogRef.close();

    this.requestService.deleteMember(this.member.id).subscribe(() => {
      console.log('deleted => ', this.member);
    });
  }
}
