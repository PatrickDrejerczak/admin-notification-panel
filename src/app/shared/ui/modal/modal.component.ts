import {
  Component,
  TemplateRef,
  input,
  contentChild,
  effect,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  isOpen = input.required<boolean>();
  template = contentChild.required(TemplateRef);

  constructor(private dialog: MatDialog) {
    effect(() => {
      const isOpen = this.isOpen();

      if (isOpen) {
        // added so that the active element loses focus and doesnt block any aria functionality
        const activeElement = document.activeElement as HTMLElement;
        activeElement.blur();
        this.dialog.open(this.template(), {
          panelClass: 'dialog-container',
          disableClose: true,
        });
      } else {
        this.dialog.closeAll();
      }
    });
  }
}
