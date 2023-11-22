import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Member } from 'src/app/shared/models';
import { RequestService } from 'src/app/shared/request.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-member-create',
  templateUrl: './member-create.component.html',
  styleUrls: ['./member-create.component.css'],
})
export class MemberCreateComponent {
  member: Member = {
    id: uuidv4(),
    firstName: '',
    lastName: '',
    email: '',
    avatar: '',
    bio: '',
    occupation: '',
    projects: [],
    fullAddress: '',
    city: '',
    postCode: '',
    country: '',
    phones: [],
  };

  constructor(
    private requestService: RequestService,
    private matDialogRef: MatDialogRef<MemberCreateComponent, any>
  ) {}

  onFormSubmit(member: Member) {
    this.requestService.postNewMember(member).subscribe(() => {
      this.matDialogRef.close();
      this.requestService.fetchMembers();
    });
  }
}
