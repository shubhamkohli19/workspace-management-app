import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RentalService } from './../../services/rentalService';
import { RentalForm } from '../../models/rentalForm';

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
  service: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private rentalService: RentalService) {
    this.today = new Date().toISOString().split('T')[0];
    this.route.queryParams.subscribe(params => {
      const navigation = this.router.getCurrentNavigation();
      console.log(navigation);
      if (navigation && navigation.extras.state) {
        this.service = navigation.extras.state['select-service'];
        console.log('Selected Service:', this.service);
      }
    })
  }

  submitForm() {
    this.formData.service = this.service;
    console.log(this.formData);

    const rentData: RentalForm = {
      id: 0, service: this.formData.service, location: this.formData.location, rentDate: this.formData.rentDate, returnDate: this.formData.returnDate, assets: this.formData.asset,
      status: 'Pending', email: localStorage.getItem('email')
    };

    console.log(rentData);
    this.rentalService.submitRentalForm(rentData).subscribe(
      response => {
        console.log('Form submitted successfully:', response);
      },
      error => {
        console.error('Error submitting form:', error);
      }
    );
  }
}
