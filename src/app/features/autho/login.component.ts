import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <form (ngSubmit)="onSubmit()">
      <mat-form-field>
        <input matInput placeholder="Username" [(ngModel)]="username" name="username" required>
      </mat-form-field>
      <mat-form-field>
        <input matInput type="password" placeholder="Password" [(ngModel)]="password" name="password" required>
      </mat-form-field>
      <button mat-raised-button color="primary" type="submit">Login</button>
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
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login({ username: this.username, password: this.password })
      .subscribe({
        next: () => this.router.navigate(['/todos']),
        error: (err) => console.error('Login failed', err)
      });
  }
}