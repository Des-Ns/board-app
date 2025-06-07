import { Component, Inject } from '@angular/core';

import { RequestService } from 'src/app/shared/request.service';
import { MemberCreateComponent } from '../member-create/member-create.component';
import { Member } from 'src/app/shared/models';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css'],
})
export class MemberEditComponent {
  member!: Member;

  constructor(
    private requestService: RequestService,
    private matDialogRef: MatDialogRef<MemberCreateComponent, any>,
    @Inject(MAT_DIALOG_DATA) public data: { member: Member }
  ) {
    if (data && data.member) {
      this.member = data.member as Member;
    }
  }

  onFormSubmit(member: Member) {
    this.requestService.putEditedMember(member).subscribe(() => {
      this.matDialogRef.close();
      this.requestService.fetchMembers();
    });
  }
}
