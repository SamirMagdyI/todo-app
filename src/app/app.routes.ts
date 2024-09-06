import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/todos', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./features/autho/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'todos',
    loadComponent: () => import('./features/todos/components/todo-list.component').then(m => m.TodoListComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'todos/add',
    loadComponent: () => import('./features/todos/components/add-todo/add-todo.component').then(m => m.AddTodoComponent),
    canActivate: [AuthGuard]
  }
];