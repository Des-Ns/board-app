import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialsModule } from '../materials.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { SidenavListComponent } from './sidenav-list/sidenav-list.component';

@NgModule({
  declarations: [HeaderComponent, SidenavListComponent],
  imports: [CommonModule, MaterialsModule, FlexLayoutModule, RouterModule],
  exports: [HeaderComponent, SidenavListComponent],
})
export class NavigationModule {}
