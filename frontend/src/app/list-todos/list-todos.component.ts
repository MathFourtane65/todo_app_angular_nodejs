import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo.model';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-todos',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule, RouterLink],
  templateUrl: './list-todos.component.html',
  styleUrl: './list-todos.component.css',
})
export class ListTodosComponent implements OnInit {
  todos: Todo[] = [
    // { id: 0, title: 'Todo en dur 1', description: 'Description 2', state: 1 },
  ];

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todoService.getAll().subscribe((todosFromBackend) => {
      this.todos = [...this.todos, ...todosFromBackend];
      console.log(this.todos);
    });
  }

  updateState(todo: Todo) {
    if (todo) {
      const updatedTodo = { ...todo, state: todo.state ? 0 : 1 };
      this.todoService.update(todo.id, updatedTodo).subscribe(
        () => {
          console.log('Todo mise à jour avec succès');
          // Mettez à jour l'état du todo dans votre liste localement
          const index = this.todos.findIndex((t) => t.id === todo.id);
          if (index !== -1) {
            this.todos[index] = updatedTodo;
          }
        },
        // (error) => {
        //   console.error('Erreur lors de la mise à jour du todo', error);
        //   // Réinitialiser l'état du todo en cas d'échec
        //   todo.state = todo.state ? 0 : 1;
        // }
      );
    }
  }
}
