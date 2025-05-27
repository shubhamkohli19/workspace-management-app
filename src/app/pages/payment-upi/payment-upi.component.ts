import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-upi',
  templateUrl: './payment-upi.component.html',
  styleUrls: ['./payment-upi.component.css']
})
export class PaymentUpiComponent {
  qrCodeUrl: string = 'assets/upi-qr-code.png'; // Replace with the actual QR code URL

  constructor(private router: Router) {}

  onPaymentDone(): void {
    this.router.navigate(['/success']); // Redirect to the success payment page
  }
}
