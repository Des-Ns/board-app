import { Component, OnInit } from '@angular/core';

import { TeamService } from '../team.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
})
export class TeamsComponent implements OnInit {
  mainTeamsData$!: Observable<any[]>;

  constructor(private teamService: TeamService) {}

  ngOnInit() {
    // this.teamService.getProjects();
    this.mainTeamsData$ = this.teamService.getProjectsMainMembers();
  }
}
