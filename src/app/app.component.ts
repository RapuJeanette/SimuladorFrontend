import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminPanelComponent } from "./admin-panel/admin-panel.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AdminPanelComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
