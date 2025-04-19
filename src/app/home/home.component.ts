import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ModalComponent } from '../shared/ui/modal/modal.component';

@Component({
  selector: 'app-home',
  imports: [RouterLink, ModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export default class HomeComponent {}
