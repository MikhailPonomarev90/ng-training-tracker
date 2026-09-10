import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
