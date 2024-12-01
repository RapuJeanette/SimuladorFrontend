import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { loadStripe, Stripe, StripeCardElement, StripeElements, StripeElementsOptions } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  stripe: Stripe | null = null;
  elements: StripeElements | undefined;
  card: StripeCardElement | undefined;

  constructor(private http: HttpClient) {
    const stripePublishableKey = 'key'; // Tu clave pública de Stripe

    loadStripe(stripePublishableKey).then((stripe) => {
      this.stripe = stripe;
      this.elements = stripe?.elements();
      this.card = this.elements?.create('card');
    });
  }

  getCardElement() {
    return this.card;
  }

  async createPaymentIntent(amount: number): Promise<string> {
    try {
      const intAmount = Math.floor(amount);
      if (intAmount <= 0) {
        throw new Error('El monto debe ser mayor que 0');
      }
      console.log('Enviando amount:', intAmount);
      const response = await this.http
        .post<{ clientSecret: string }>(`http://localhost:8000/create-payment-intent?amount=${amount}`, { })
        .toPromise();

      if (!response) {
        throw new Error('La respuesta del servidor es indefinida');
      }

      return response.clientSecret;
    } catch (error) {
      console.error('Error al crear el PaymentIntent:', error);
      throw new Error('Hubo un problema al crear el PaymentIntent');
    }
  }

}
