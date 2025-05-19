import { Injectable } from '@angular/core';
import { UserDetailsModel } from '../../shared/models/user-details.model';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  private userDetails: any = null;

  constructor() {}

  setUserDetails(user: UserDetailsModel): void {
    this.userDetails = user;
  }

  getUserDetails(): any {
    return this.userDetails;
  }
}
