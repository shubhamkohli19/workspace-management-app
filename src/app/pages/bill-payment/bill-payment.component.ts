import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bill-payment',
  templateUrl: './bill-payment.component.html',
  styleUrl: './bill-payment.component.css'
})
export class BillPaymentComponent {
  billResponse: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.billResponse = history.state.bill;
    console.log(this.billResponse, "fetched");
  }
}
