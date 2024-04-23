import { Component } from '@angular/core';

@Component({
  selector: 'app-rent-workspace',
  templateUrl: './rent-workspace.component.html',
  styleUrl: './rent-workspace.component.css'
})
export class RentWorkspaceComponent {
  formData: any = {};
  locations: string[] = ["Location 1", "Location 2", "Location 3", "Location 4"];
  assets: string[] = ["Asset 1", "Asset 2", "Asset 3", "Asset 4"];
  today: string;

  constructor() {
    this.today = new Date().toISOString().split('T')[0];
  }

  submitForm() {
    console.log(this.formData);
  }
}
