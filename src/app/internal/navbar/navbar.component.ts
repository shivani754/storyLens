import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../core/services/global.service';
import { UserDetailsModel } from '../../shared/models/user-details.model';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  isDropdownOpen = false;
  userDetails: UserDetailsModel = {
    username: '',
  };

  constructor(private globalService: GlobalService) {}

  ngOnInit() {
    this.userDetails = this.globalService.getUserDetails() || {};
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

  logout() {}
}
