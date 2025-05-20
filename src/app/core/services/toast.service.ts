import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  message: string;
  type: ToastType;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastSubject = new Subject<ToastMessage>();
  toast$ = this.toastSubject.asObservable();

  /**
   * @description Showing toast on action
   *
   * @param message
   * @param type
   */
  showToast(message: string, type: ToastType = 'info') {
    this.toastSubject.next({ message, type });
  }
}
