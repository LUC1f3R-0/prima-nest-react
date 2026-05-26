import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-company-shell',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './company-shell.component.html',
  styleUrl: './company-shell.component.css',
})
export class CompanyShellComponent {}
