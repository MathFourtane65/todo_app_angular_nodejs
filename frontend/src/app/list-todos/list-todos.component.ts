import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo.model';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-todos',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './list-todos.component.html',
  styleUrl: './list-todos.component.css',
})
export class ListTodosComponent implements OnInit {
  todos: Todo[] = [
    { id: 0, title: 'Todo en dur 1', description: 'Description 1', state: 0 },
    { id: 0, title: 'Todo en dur 2', description: 'Description 2', state: 1 },
  ];

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todoService.getAll().subscribe((todosFromBackend) => {
      this.todos = [...this.todos, ...todosFromBackend];
      console.log(this.todos);
    });
  }

  updateState(todo: Todo) {
  }
}
