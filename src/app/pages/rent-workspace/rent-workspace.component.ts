import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RentalService } from './../../services/rentalService';

@Component({
  selector: 'app-rent-workspace',
  templateUrl: './rent-workspace.component.html',
  styleUrls: ['./rent-workspace.component.css']
})

export class RentWorkspaceComponent {
  formData: any = {};
  locations: string[] = ["Location 1", "Location 2", "Location 3", "Location 4"];
  assets: string[] = ["Asset 1", "Asset 2", "Asset 3", "Asset 4"];
  today: string;
  selectedService: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private rentalService: RentalService) {
    this.today = new Date().toISOString().split('T')[0];
    this.route.queryParams.subscribe(params => {
      const navigation = this.router.getCurrentNavigation();
      console.log(navigation);
      if (navigation && navigation.extras.state) {
        this.selectedService = navigation.extras.state['select-service'];
        console.log('Selected Service:', this.selectedService);
      }
    })
  }

  submitForm() {
    this.formData.selectedService = this.selectedService;
    this.rentalService.submitRentalForm(this.formData).subscribe(
      response => {
        console.log('Form submitted successfully:', response);
      },
      error => {
        console.error('Error submitting form:', error);
      }
    );
  }
}
