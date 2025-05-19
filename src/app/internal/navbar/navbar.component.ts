import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../core/services/global.service';
import { UserDetailsModel } from '../../shared/models/user-details.model';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [NgClass],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  isDropdownOpen = false;
  activeRoute = '';
  userDetails: UserDetailsModel = {
    username: '',
  };

  constructor(
    private globalService: GlobalService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.userDetails = this.globalService.getUserDetails() || {};
  }

  isActive(route: string) {
    const url = this.router.url; // e.g. /photo-archive
    return route === url.split('/')[2]; // get 'photo-archive'
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    // Delay closing to allow click event on button to trigger first
    setTimeout(() => {
      this.isDropdownOpen = false;
    }, 100);
  }

  logout() {
    localStorage.removeItem('userCredentials');
    location.reload();
  }

  login() {
    this.router.navigate(['/auth/login']);
  }

  goTo(page: string) {
    switch (page) {
      case 'blog':
        this.router.navigate(['/internal/blogs']);
        break;
      case 'photo-archive':
        this.router.navigate(['/internal/photo-archive']);
        break;
      default:
        break;
    }
  }
}
