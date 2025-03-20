import { Component, OnInit } from '@angular/core';
import { RentalService } from './../../services/rentalService';
import { RentalForm } from '../../models/rentalForm';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rent-workspace',
  templateUrl: './rent-workspace.component.html',
  styleUrls: ['./rent-workspace.component.css']
})
export class RentWorkspaceComponent implements OnInit {
  formData: any = {};
  name: string = '';
  today: string;
  service: string = '';
  location: string = '';
  locationPrice: number = 0;
  totalAmount: number = 0;
  totalDays: number = 0;
  rentAmounts: { [key: string]: number } = {};
  assetAmounts: { [key: string]: number } = {
    'Wi-fi': 200,
    'Electricity': 100,
    'Tables': 180,
    'Board': 80
  };
  assetOptions: { label: string, value: string }[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private rentalService: RentalService) {
    this.today = new Date().toISOString().split('T')[0];
    this.assetOptions = Object.keys(this.assetAmounts).map(asset => ({
      label: `${asset} - $${this.assetAmounts[asset]}`,
      value: asset
    }));
    this.route.queryParams.subscribe(params => {
      const navigation = this.router.getCurrentNavigation();
      if (navigation && navigation.extras.state) {
        this.location = navigation.extras.state['select-location'];
        this.service = navigation.extras.state['select-service'];
        this.locationPrice = navigation.extras.state['location-price'];
        this.calculateRentAmounts();
      }
    });
  }

  ngOnInit(): void {
    this.name = localStorage.getItem('name') || 'User';
  }

  calculateRentAmounts() {
    this.rentAmounts['small'] = this.locationPrice;
    this.rentAmounts['medium'] = this.locationPrice * 1.5;
    this.rentAmounts['large'] = this.locationPrice * 2;
  }

  submitForm() {
    this.formData.service = this.service;
    const assetsString = this.formData.asset.join(',');

    const rentData: RentalForm = {
      id: 0,
      service: this.formData.service,
      location: this.location,
      rentDate: this.formData.rentDate,
      returnDate: this.formData.returnDate,
      assets: assetsString,
      email: localStorage.getItem('email')
    };

    const billResponse = {
      service: this.formData.service,
      location: this.location,
      totalDays: this.totalDays,
      assets: this.formData.asset,
      email: localStorage.getItem('email'),
      totalAmount: this.totalAmount
    };

    this.rentalService.submitRentalForm(rentData).subscribe(
      response => {
        this.router.navigate(['checkout'], { queryParams: { bill: JSON.stringify(billResponse) } });
      },
      error => {
        console.error('Error submitting form:', error);
      }
    );
  }

  updateTotalAmount() {
    this.formData.rentDate = null;
    this.formData.returnDate = null;
    const rentSize = this.formData.workspaceSize;
    let assetTotal = 0;

    if (this.formData.asset) {
      for (let asset of this.formData.asset) {
        assetTotal += this.assetAmounts[asset];
      }
    }

    this.totalAmount = this.rentAmounts[rentSize] + assetTotal;
  }

  updateNgTotalAmount(selectedAssets: any[]) {
    let assetTotal = 0;

    if (selectedAssets) {
      for (let asset of selectedAssets) {
        const assetValue = asset.value;
        assetTotal += this.assetAmounts[assetValue];
      }
    }

    this.totalAmount = this.rentAmounts[this.formData.workspaceSize] + assetTotal;
  }

  finalTotalAmount() {
    const rentDate = new Date(this.formData.rentDate);
    const returnDate = new Date(this.formData.returnDate);
    const diffInTime = returnDate.getTime() - rentDate.getTime();
    this.totalDays = Math.ceil(diffInTime / (1000 * 60 * 60 * 24)) + 1;
    this.totalAmount *= this.totalDays;
  }
}