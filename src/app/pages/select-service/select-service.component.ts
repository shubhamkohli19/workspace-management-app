import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-service',
  templateUrl: './select-service.component.html',
  styleUrl: './select-service.component.css'
})
export class SelectServiceComponent {

  constructor(private router: Router){}

  SelectedService(str: string){
    this.router.navigate(['/select-location'],  { state: { 'select-service' : str } });
  }
}