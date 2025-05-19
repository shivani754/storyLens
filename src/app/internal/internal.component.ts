import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { GlobalService } from '../core/services/global.service';

@Component({
  selector: 'app-internal',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './internal.component.html',
  styleUrl: './internal.component.css',
})
export class InternalComponent implements OnInit {
  constructor(private globalService: GlobalService) {}

  ngOnInit(): void {
    // To handle usecase of refreshing after login
    const userDetails = this.globalService.getUserDetails();
    if (!userDetails) {
      const credsInStorage: any = localStorage.getItem('userCredentials');
      if (credsInStorage) {
        this.globalService.setUserDetails({
          username: JSON.parse(credsInStorage).username,
        });
      }
    }
  }
}
