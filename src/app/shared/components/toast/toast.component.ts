import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { ToastService, ToastType } from '../../../core/services/toast.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  imports: [NgClass],
  standalone: true,
})
export class ToastComponent implements OnInit, OnDestroy {
  show = false;
  message = '';
  type: ToastType = 'info';
  private subscription!: Subscription;

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.subscription = this.toastService.toast$.subscribe(({ message, type }) => {
      this.message = message;
      this.type = type;
      this.show = true;

      timer(3000).subscribe(() => {
        this.show = false;
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  close() {
    this.show = false;
  }

  get toastClasses(): string {
    switch (this.type) {
      case 'success':
        return 'bg-green-600 text-white';
      case 'error':
        return 'bg-red-600 text-white';
      default:
        return 'bg-blue-600 text-white';
    }
  }
}
