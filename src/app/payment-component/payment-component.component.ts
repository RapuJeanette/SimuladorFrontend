import { Component, OnInit } from '@angular/core';
import { StripeService } from './stripe.service';
import { CommonModule } from '@angular/common';
declare var paypal : any;

@Component({
  selector: 'app-payment-component',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './payment-component.component.html',
  styleUrl: './payment-component.component.css'
})
export class PaymentComponentComponent implements OnInit {
  clientSecret: string | null = null;
  public isProcessing = false;
  router: any;
  paymentSuccess: boolean = false;

  constructor(private stripeService: StripeService) {}

  ngOnInit(): void {
    this.stripeService.createPaymentIntent(1000).then(clientSecret => {
      this.clientSecret = clientSecret;
    });
  }

  ngAfterViewInit() {
    const cardElement = this.stripeService.getCardElement();
    if (cardElement) {
      cardElement.mount('#card-element');
    }
  }

  async handlePayment() {
    if (!this.clientSecret || !this.stripeService.stripe || !this.stripeService.card) {
      return;
    }
    this.isProcessing = true;

    const { paymentIntent, error } = await this.stripeService.stripe.confirmCardPayment(
      this.clientSecret,
      {
        payment_method: {
          card: this.stripeService.card,
        }
      }
    );

    if (error) {
      alert('Error: ' + error.message);
    } else if (paymentIntent?.status === 'succeeded') {
      this.paymentSuccess = true;
    }

    this.isProcessing = false;
  }

  goBack(): void {
    this.router.navigate(['/home-paciente']); // Redirige a la ruta deseada
  }
}
