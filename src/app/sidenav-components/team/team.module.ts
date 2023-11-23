import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialsModule } from 'src/app/materials.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { MembersTableComponent } from './members-table/members-table.component';
import { TeamComponent } from './team/team.component';
import { TeamsComponent } from './teams/teams.component';
import { MemberFormComponent } from './member-form/member-form.component';
import { MemberEditComponent } from './member-edit/member-edit.component';
import { MemberCreateComponent } from './member-create/member-create.component';
import { MemberDetailsCardComponent } from './member-details-card/member-details-card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TeamsTableComponent } from './teams-table/teams-table.component';

@NgModule({
  declarations: [
    MembersTableComponent,
    TeamComponent,
    TeamsComponent,
    MemberFormComponent,
    MemberEditComponent,
    MemberCreateComponent,
    MemberDetailsCardComponent,
    TeamsTableComponent,
  ],
  imports: [
    CommonModule,
    MaterialsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [
    MembersTableComponent,
    TeamComponent,
    TeamsComponent,
    MemberDetailsCardComponent,
  ],
})
export class TeamModule {}
