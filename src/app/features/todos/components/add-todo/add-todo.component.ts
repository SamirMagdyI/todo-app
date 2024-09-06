import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TodoService } from '../../services/todo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule, MatButtonModule],
  template: `
    <form (ngSubmit)="onSubmit()">
      <mat-form-field>
        <input matInput placeholder="Todo title" [(ngModel)]="title" name="title" required>
      </mat-form-field>
      <button mat-raised-button color="primary" type="submit">Add Todo</button>
    </form>
  `,
  styles: [`
    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 20px;
    }
    mat-form-field {
      width: 300px;
      margin-bottom: 10px;
    }
  `]
})
export class AddTodoComponent {
  title = '';

  constructor(private todoService: TodoService, private router: Router) {}

  onSubmit() {
    if (this.title.trim()) {
      this.todoService.addTodo({ title: this.title, isComplete: false }).subscribe({
        next: () => {
          this.router.navigate(['/todos']);
        },
        error: (error: any) => console.error('Error adding todo:', error)
      });
    }
  }
}