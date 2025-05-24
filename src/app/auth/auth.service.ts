// auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;
  private isLoggedInSubject: BehaviorSubject<boolean>;
  public isLoggedIn$: Observable<boolean>;

  constructor() {
    this.currentUserSubject = new BehaviorSubject<User | null>(
      JSON.parse(localStorage.getItem('currentUser') || 'null')
    );
    this.currentUser$ = this.currentUserSubject.asObservable();

    this.isLoggedInSubject = new BehaviorSubject<boolean>(
      this.isAuthenticated()
    );
    this.isLoggedIn$ = this.isLoggedInSubject.asObservable();
  }

  login(email: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(
      (u: any) => u.email === email && u.password === password
    );

    if (user) {
      const authUser: User = {
        username: user.username,
        token: 'fake-jwt-token',
      };
      localStorage.setItem('currentUser', JSON.stringify(authUser));
      this.currentUserSubject.next(authUser);
      this.isLoggedInSubject.next(true);
      return true;
    }
    // Login admin standard
    if (email === 'admin@gmail.com' && password === 'admin') {
      const adminUser: User = {
        username: 'admin',
        token: 'admin-jwt-fake',
      };
      localStorage.setItem('currentUser', JSON.stringify(adminUser));
      this.currentUserSubject.next(adminUser);
      this.isLoggedInSubject.next(true);
      return true;
    }
    return false;
  }

  register(username: string, email: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = users.some((user: any) => user.email === email);

    if (userExists) return false;

    users.push({ username, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.isLoggedInSubject.next(false);
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }
}
