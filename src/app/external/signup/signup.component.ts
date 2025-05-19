import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SignupModel } from '../models/signup.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  showPassword = false;
  isPasswordMatch = true;
  signupData: SignupModel = {
    username: '',
    password: '',
    confirmPassword: '',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  onSubmit() {
    const { username, password } = this.signupData;

    if (this.signupData.password !== this.signupData.confirmPassword) {
      this.isPasswordMatch = false;
      return;
    }

    localStorage.setItem(
      'userCredentials',
      JSON.stringify({ username, password }),
    );

    alert('Signup successful! You can now login.');
    this.goToLogin();
  }

  goToLogin() {
    this.router.navigate(['../login'], {
      relativeTo: this.route,
    });
  }
}
