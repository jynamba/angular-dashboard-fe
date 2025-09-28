import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  form: FormGroup;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  submit() {
    if (this.form.invalid) return;
    const { email, password, confirmPassword } = this.form.value;
    if (password !== confirmPassword) {
      this.error = 'Passwords do not match';
      return;
    }
    this.auth.register(email, password).subscribe({
      next: () => this.router.navigate(['/auth/login']),
      error: (err) =>
        (this.error = err.error?.message || 'Registration failed'),
    });
  }
}
