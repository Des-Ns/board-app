import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DashboardService } from '../dashboard.service';
import { Observable } from 'rxjs';
import { Project } from '../dashboard.models';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css'],
})
export class ProjectFormComponent implements OnInit {
  projectForm!: FormGroup;
  @Input() project!: Project;
  @Output() projectAction = new EventEmitter<any>();

  members$!: Observable<{ firstName: string; lastName: string; id: string }[]>;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.members$ = this.dashboardService.getMembersNamesIds();

    const { title, description, teamIds, startDate, finalDate } = this.project;

    this.projectForm = new FormGroup({
      title: new FormControl(title, [Validators.required]),
      description: new FormControl(description),
      team: new FormControl(teamIds),
      startDate: new FormControl(startDate),
      finalDate: new FormControl(finalDate),
    });
  }

  onSubmit() {
    if (this.projectForm.invalid) {
      return;
    }

    this.projectAction.emit(this.projectForm.value);
  }
}
