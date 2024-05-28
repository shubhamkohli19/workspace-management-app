import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'workspace-management-app';

  constructor(private router: Router) {}
  
  isAttemptingRegistration(): boolean {
    return this.router.url === '/login' || this.router.url === '/signup' || this.router.url === '/rent-workspace';
  }
}