import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  OnDestroy,
} from '@angular/core';

import { RequestService } from 'src/app/shared/request.service';
import { Project, projectStatus } from 'src/app/shared/models';

import {
  FormGroupDirective,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css'],
})
export class ProjectFormComponent implements OnInit, OnDestroy {
  projectForm!: FormGroup;
  @Input() project!: Project;
  @Output() projectAction = new EventEmitter<any>();
  @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;

  members$!: Observable<{ firstName: string; lastName: string; id: string }[]>;
  projectStatus!: string[];

  private intervalId: any;

  constructor(private requestService: RequestService) {}

  ngOnInit(): void {
    this.members$ = this.requestService.getMembersNamesIds();
    this.projectStatus = Object.values(projectStatus);
    console.log(this.project);

    const {
      id,
      title,
      description,
      teamIds,
      tasks,
      duration,
      dateCreated,
      status,
      startDate,
      finalDate,
    } = this.project;

    this.projectForm = new FormGroup({
      id: new FormControl(id),
      title: new FormControl(title, [Validators.required]),
      description: new FormControl(description, [Validators.required]),
      teamIds: new FormControl(teamIds),
      startDate: new FormControl(startDate),
      finalDate: new FormControl(finalDate),
      tasks: new FormControl(tasks),
      duration: new FormControl(duration),
      dateCreated: new FormControl(dateCreated ? dateCreated : new Date()),
      status: new FormControl(status),
    });
  }

  onSubmit() {
    if (this.projectForm.invalid) {
      return;
    }
    // const formValue = this.projectForm.value;
    const formValue = this.projectForm.getRawValue();

    if (formValue.teamIds.length > 0 && formValue.teamIds[0] !== null) {
      formValue.teamIds = formValue.teamIds.map(
        (teamMember: { firstName: string; lastName: string; id: string }) =>
          teamMember.id
      );
    } else {
      formValue.teamIds = [];
    }

    console.log(this.projectForm.value);
    console.log(formValue);

    this.projectAction.emit(formValue);

    this.formGroupDirective.resetForm();
  }

  getDuration(startDate: Date, finalDate: Date): number {
    const start = new Date(startDate).getTime();
    const end = new Date(finalDate).getTime();
    const duration = Math.abs(end - start) / (1000 * 60 * 60 * 24); // Get difference in days
    return duration;
  }

  ngOnDestroy(): void {}
}
