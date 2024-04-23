import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {
  constructor(private loginService: LoginService) {
  }

  isValid() {
    return this.loginService.isAuthenticated();
  }

  logout() {
    this.loginService.logout();
  }
}