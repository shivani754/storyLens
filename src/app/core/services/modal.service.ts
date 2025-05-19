// modal.service.ts
import { Injectable } from '@angular/core';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { LoginRequiredModalComponent } from '../../external/modals/login-required-modal/login-required-modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private overlay: Overlay) {}

  openLoginRequiredModal() {
    const overlayRef = this.overlay.create(
      new OverlayConfig({
        hasBackdrop: true,
        backdropClass: 'cdk-overlay-dark-backdrop',
        positionStrategy: this.overlay
          .position()
          .global()
          .centerHorizontally()
          .centerVertically(),
      }),
    );

    const modalPortal = new ComponentPortal(LoginRequiredModalComponent);
    const componentRef = overlayRef.attach(modalPortal);

    componentRef.instance.close = () => {
      overlayRef.dispose();
    };

    overlayRef.backdropClick().subscribe(() => overlayRef.dispose());
  }
}
