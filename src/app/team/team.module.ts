import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialsModule } from '../materials.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { MembersComponent } from './members/members.component';
import { TeamComponent } from './team/team.component';
import { TeamsComponent } from './teams/teams.component';
import { MemberFormComponent } from './member-form/member-form.component';
import { MemberEditComponent } from './member-edit/member-edit.component';
import { MemberCreateComponent } from './member-create/member-create.component';
import { MemberDetailsCardComponent } from './member-details-card/member-details-card.component';

@NgModule({
  declarations: [
    MembersComponent,
    TeamComponent,
    TeamsComponent,
    MemberFormComponent,
    MemberEditComponent,
    MemberCreateComponent,
    MemberDetailsCardComponent,
  ],
  imports: [
    CommonModule,
    MaterialsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
  ],
  exports: [
    MembersComponent,
    TeamComponent,
    TeamsComponent,
    MemberDetailsCardComponent,
  ],
})
export class TeamModule {}
