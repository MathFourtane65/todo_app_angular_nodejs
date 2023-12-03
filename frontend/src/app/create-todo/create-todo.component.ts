import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo.model';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-todo',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.css'],
})
export class CreateTodoComponent {
  // todo: Todo = { id: 0, title: '', description: '', state: 0 };
  todo: Omit<Todo, 'id'> = { title: '', description: '', state: 0 };

  constructor(private todoService: TodoService, private router: Router) {}

  createTodo() {
    // if (this.todo.title) {
    //   this.todoService.create(this.todo).subscribe(() => {
    //     console.log("Todo créé avec succès !");
    //     this.router.navigate(['/todos']);
    //   });
    // }
    if (this.todo.title) {
      this.todoService.createOne(this.todo).subscribe((newTodo) => {
        console.log('Todo créé avec succès !', newTodo);
        this.router.navigate(['/todos']);
      });
    }
  }
}
