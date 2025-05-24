import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UiService {
  private sidenavOpenSubject = new BehaviorSubject<boolean>(false);
  public sidenavOpen$ = this.sidenavOpenSubject.asObservable();

  toggleSidenav() {
    this.sidenavOpenSubject.next(!this.sidenavOpenSubject.value);
  }

  closeSidenav() {
    this.sidenavOpenSubject.next(false);
  }

  setSidenavOpen(open: boolean) {
    this.sidenavOpenSubject.next(open);
  }
}
