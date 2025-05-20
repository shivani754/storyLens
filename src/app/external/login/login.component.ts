import { Component } from '@angular/core';
import { LoginModel } from '../models/login.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../../core/services/global.service';
import { ToastService } from '../../core/services/toast.service';

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
    private toastService: ToastService,
    private globalService: GlobalService,
  ) {}

  onSubmit() {
    let credsInStorage: any = localStorage.getItem('userCredentials');
    if (!credsInStorage) {
      this.toastService.showToast('User doesnt exists!', 'error');
      return;
    }
    credsInStorage = JSON.parse(credsInStorage);
    if (
      credsInStorage?.username !== this.loginData.username ||
      credsInStorage?.password !== this.loginData.password
    ) {
      this.toastService.showToast('User or password is not correct!', 'error');
      return;
    }
    this.globalService.setUserDetails({ username: this.loginData.username });
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    !returnUrl
      ? this.router.navigate(['/internal'])
      : this.router.navigateByUrl(returnUrl + '/comment');
  }

  goToSignUp() {
    this.router.navigate(['../signup'], {
      relativeTo: this.route,
      queryParamsHandling: 'merge',
    });
  }
}
