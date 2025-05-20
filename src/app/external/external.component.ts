import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-external',
  imports: [RouterOutlet],
  standalone: true,
  templateUrl: './external.component.html',
  styleUrls: ['./external.component.css'],
})
export class ExternalComponent {}
