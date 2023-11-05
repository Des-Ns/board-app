import { Component, OnInit, Input } from '@angular/core';
import { Member, Task } from '../dashboard.models';
import { DashboardService } from '../dashboard.service';
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

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.teamMembers$ = this.dashboardService.getTaskMembers(this.task.id);

    this.title = this.task.title;
    this.description = this.task.description;
  }
}
