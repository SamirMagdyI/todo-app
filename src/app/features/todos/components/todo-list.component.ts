import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo.models';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatCheckboxModule],
  template: `
    <table mat-table [dataSource]="todos">
      <ng-container matColumnDef="title">
        <th mat-header-cell *matHeaderCellDef>Title</th>
        <td mat-cell *matCellDef="let todo">{{todo.title}}</td>
      </ng-container>
      <ng-container matColumnDef="isComplete">
        <th mat-header-cell *matHeaderCellDef>Completed</th>
        <td mat-cell *matCellDef="let todo">
          <mat-checkbox [checked]="todo.isComplete" (change)="toggleComplete(todo)"></mat-checkbox>
        </td>
      </ng-container>
      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef>Actions</th>
        <td mat-cell *matCellDef="let todo">
          <button mat-button color="warn" (click)="deleteTodo(todo.id)">Delete</button>
          <button mat-raised-button color="primary" (click)="addNewTodo()">Add New Todo</button>
        </td>
      </ng-container>
      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
  `,
  styles: [`
    table {
      width: 100%;
    }
  `]
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  displayedColumns: string[] = ['title', 'isComplete', 'actions'];

  constructor(private todoService: TodoService, private router : Router) {}

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe(todos => this.todos = todos);
  }

  toggleComplete(todo: Todo) {
    todo.isComplete = !todo.isComplete;
    this.todoService.updateTodo(todo).subscribe();
  }

  deleteTodo(id: number | undefined) {
    if (id) {
      this.todoService.deleteTodo(id).subscribe(() => {
        this.todos = this.todos.filter(t => t.id !== id);
      });
    }
  }
  addNewTodo() {
    this.router.navigate(['/todos/add']);
  }
}