import { Component } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { ActivatedRoute } from '@angular/router';

interface PaymentObject{
  total: number,
  productName: string
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})

export class CheckoutComponent {
  total: number = 0;
  bill: any;
  paymentObj: PaymentObject = { total: 0, productName: '' };

  constructor(private paymentService: PaymentService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      if (params['bill']) {
        this.bill = JSON.parse(params['bill']);
        this.total = this.bill.totalAmount;
      }
    });
    console.log(this.bill);
  }

  onCheckout(): void {
    this.paymentObj.total = this.total;
    this.paymentObj.productName = this.bill.service;
    this.paymentService.createCheckoutSession(this.paymentObj).subscribe((response: any) => {
      window.location.href = response;
    }, (error: any) => {
      console.error('Error creating checkout session', error);
    });
  }
}