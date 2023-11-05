import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialsModule } from '../materials.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MembersComponent } from './members/members.component';
import { TeamComponent } from './team/team.component';
import { TeamsComponent } from './teams/teams.component';

@NgModule({
  declarations: [MembersComponent, TeamComponent, TeamsComponent],
  imports: [CommonModule, MaterialsModule, FlexLayoutModule],
  exports: [MembersComponent, TeamComponent, TeamsComponent],
})
export class TeamModule {}
