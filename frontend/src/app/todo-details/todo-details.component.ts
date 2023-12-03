import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo.model';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.css'],
})
export class TodoDetailsComponent implements OnInit {
  todo: Todo | undefined;

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService
  ) {}

  ngOnInit(): void {
    const todoId = +this.route.snapshot.paramMap.get('id')!;
    this.todoService.getOne(todoId).subscribe((todo) => (this.todo = todo));
    console.log(this.todo);
    
    // Utilisez todoService pour charger les détails de la todo
    // Par exemple : this.todoService.get(todoId).subscribe(todo => this.todo = todo);
  }
}
