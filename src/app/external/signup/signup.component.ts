import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SignupModel } from '../models/signup.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../core/services/toast.service';

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
  passwordLengthValid = false;
  passwordSpecialCharValid = false;
  signupData: SignupModel = {
    username: '',
    password: '',
    confirmPassword: '',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
  ) {}

  onPasswordChange(password: string): void {
    this.passwordLengthValid = password.length >= 8;
    this.passwordSpecialCharValid = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  }

  checkPasswordMatch(): void {
    this.isPasswordMatch =
      this.signupData.password === this.signupData.confirmPassword;
  }

  onSubmit() {
    const { username, password } = this.signupData;

    localStorage.setItem(
      'userCredentials',
      JSON.stringify({ username, password }),
    );
    this.toastService.showToast(
      'Signup successful! You can now login.',
      'success',
    );
    this.goToLogin();
  }

  goToLogin() {
    this.router.navigate(['../login'], {
      relativeTo: this.route,
      queryParamsHandling: 'merge',
    });
  }
}
