import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-external',
  imports: [RouterOutlet],
  standalone: true,
  templateUrl: './external.component.html',
  styleUrls: ['./external.component.css'],
})
export class ExternalComponent {}
