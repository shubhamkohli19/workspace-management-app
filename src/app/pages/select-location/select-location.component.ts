import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-select-location',
  templateUrl: './select-location.component.html',
  styleUrl: './select-location.component.css'
})
export class SelectLocationComponent {
  service : string = '';

  constructor(private router: Router, private route: ActivatedRoute){
    this.route.queryParams.subscribe(params => {
      const navigation = this.router.getCurrentNavigation();
      if (navigation && navigation.extras.state) {
        this.service = navigation.extras.state['select-service'];
      }
    })
  }

  SelectedService(str: string){
    this.router.navigate(['/rent-workspace'],  { state: { 'select-location': str, 'select-service': this.service } });
  }
}