import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
})
export class TeamComponent implements OnInit {
  mainTeams$!: Observable<any>;

  constructor() {}

  ngOnInit(): void {}
}
