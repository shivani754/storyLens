import { Component } from '@angular/core';
import { LoginModel } from '../models/login.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../../core/services/global.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  showPassword = false;
  loginData: LoginModel = {
    username: '',
    password: '',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private globalService: GlobalService,
  ) {}

  onSubmit() {
    let credsInStorage: any = localStorage.getItem('userCredentials');
    if (!credsInStorage) {
      alert('User doesnt exists!');
      return;
    }
    credsInStorage = JSON.parse(credsInStorage);
    if (
      credsInStorage?.username !== this.loginData.username ||
      credsInStorage?.password !== this.loginData.password
    ) {
      alert('User or password is not correct!');
      return;
    }
    this.globalService.setUserDetails({ username: this.loginData.username });
    this.router.navigate(['/internal']);
  }

  goToSignUp() {
    this.router.navigate(['../signup'], {
      relativeTo: this.route,
    });
  }
}
