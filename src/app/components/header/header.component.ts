import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { UiService } from '../sidebar_service/ui.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    public auth: AuthService,
    private uiService: UiService,
    private router: Router
  ) {}

  toggleSidenav() {
    this.uiService.toggleSidenav();
  }

  logout() {
    this.auth.logout();
    this.uiService.closeSidenav();
    this.router.navigate(['/login']);
  }
}
