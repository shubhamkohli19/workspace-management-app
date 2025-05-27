import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { SearchService } from '../../services/search.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  searchtext: string = '';
  isHomepage: boolean = false;
  isSeller: boolean = false;

  constructor(
    private loginService: LoginService,
    private searchService: SearchService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.isHomepage = this.router.url === '/homepage';
    });
    this.isSeller = JSON.parse(localStorage.getItem('isSeller') || 'false');
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
    return this.router.url === '/select-location' || this.router.url === '/select-service';
  }

  navigateToSellWorkspace(): void {
    this.router.navigate(['/sell-workspace']);
  }

  navigateToUploadSite(): void {
    this.router.navigate(['/upload-site']);
  }
}