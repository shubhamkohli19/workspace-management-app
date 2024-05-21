import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { SearchService } from '../../services/search.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {
  searchtext: string = '';

  constructor(private loginService: LoginService,
    private searchService: SearchService, private router: Router
  ) {
  }
  
  onSearch() {
    this.searchService.setSearchText(this.searchtext);
    return false;
  }

  isValid() {
    return this.loginService.isAuthenticated();
  }

  logout() {
    this.loginService.logout();
  }

  SearchbarActive(): boolean {
    return this.router.url !== '/homepage';
  }
}