import { Component } from '@angular/core';
import { RentalService } from './../../services/rentalService';
import { RentalForm } from '../../models/rentalForm';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rent-workspace',
  templateUrl: './rent-workspace.component.html',
  styleUrls: ['./rent-workspace.component.css']
})
export class RentWorkspaceComponent {
  formData: any = {};
  locations: string[] = ["Location 1", "Location 2", "Location 3", "Location 4"];
  today: string;
  service: string = '';
  location: string = '';
  totalAmount: number = 0;
  totalDays: number = 0;
  rentAmounts: { [key: string]: number } = {
    'small': 100,
    'medium': 150,
    'large': 200
  };
  assetAmounts: { [key: string]: number } = {
    'Asset 1': 50,
    'Asset 2': 60,
    'Asset 3': 70,
    'Asset 4': 80
  };
  assetKeys: string[];


  constructor(private route: ActivatedRoute, private router: Router, private rentalService: RentalService) {
    this.today = new Date().toISOString().split('T')[0];
    this.assetKeys = Object.keys(this.assetAmounts);
    this.route.queryParams.subscribe(params => {
      const navigation = this.router.getCurrentNavigation();
      if (navigation && navigation.extras.state) {
        this.location = navigation.extras.state['select-location'];
        this.service = navigation.extras.state['select-service'];
      }
    })
  }

  submitForm() {
    this.formData.service = this.service;
    let assetsString = this.formData.asset.join(', ');

    const rentData: RentalForm = {
      id: 0,
      service: this.formData.service,
      location: this.location,
      rentDate: this.formData.rentDate,
      returnDate: this.formData.returnDate,
      assets: assetsString,
      status: 'Pending',
      email: localStorage.getItem('email')
    };

    const billResponse = {
      service: this.formData.service,
      location: this.location,
      totalDays: this.totalDays,
      assets: this.formData.asset,
      email: localStorage.getItem('email'),
      totalAmount: this.totalAmount
    }

    console.log(rentData);
    this.rentalService.submitRentalForm(rentData).subscribe(
      response => {
        console.log('Form submitted successfully:', response);
        this.router.navigate(['bill-payment'], { state: { 'bill': billResponse}})
        console.log(billResponse, "sent")
      },
      error => {
        console.error('Error submitting form:', error);
      }
    );
  }

  updateTotalAmount() {
    this.formData.rentDate = null;
    this.formData.returnDate = null;
    let rentSize = this.formData.workspaceSize;
    let assetTotal = 0;

    if (this.formData.asset) {
      for (let asset of this.formData.asset) {
        assetTotal += this.assetAmounts[asset];
      }
    }

    this.totalAmount = this.rentAmounts[rentSize] + assetTotal;
  }

  finalTotalAmount() {
    const rentDate = new Date(this.formData.rentDate);
    const returnDate = new Date(this.formData.returnDate);
    const diffInTime = returnDate.getTime() - rentDate.getTime();
    this.totalDays = (Math.ceil(diffInTime / (1000 * 60 * 60 * 24))) + 1;
    this.totalAmount *= this.totalDays;
  }
}