import { Component, OnDestroy } from '@angular/core';
import { UiService } from './components/sidebar_service/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnDestroy {
  title = 'esame_finale_dinoto';
  sidenavOpened = false;
  private sidenavSub: Subscription;

  constructor(public uiService: UiService) {
    this.sidenavSub = this.uiService.sidenavOpen$.subscribe((open) => {
      this.sidenavOpened = open;
    });
  }

  toggleSidenav() {
    this.uiService.toggleSidenav();
  }

  ngOnDestroy() {
    this.sidenavSub.unsubscribe();
  }
}
