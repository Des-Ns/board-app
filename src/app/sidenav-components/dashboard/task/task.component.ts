import { Component, OnInit, Input } from '@angular/core';

import { Member, Task } from 'src/app/shared/models';
import { RequestService } from 'src/app/shared/request.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  @Input() task!: Task;

  title!: string;
  description!: string;
  teamMembers$!: Observable<Member[]>;

  duration!: number;
  dateCreated!: Date;

  constructor(private requestService: RequestService) {}

  ngOnInit(): void {
    if (this.task) {
      this.teamMembers$ = this.requestService.getTaskMembers(this.task.id);

      this.title = this.task.title;
      this.description = this.task.description;
    }
  }
}
