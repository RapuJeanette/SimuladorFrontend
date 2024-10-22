import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminPanelComponent } from "./admin-panel/admin-panel.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AdminPanelComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private router: Router) {}
  title = 'frontend';

  isAdminPanelVisible(): boolean {
    return !this.router.url.includes('/registro');
  }
}
