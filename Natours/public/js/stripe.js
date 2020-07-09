/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts'; 
const stripe = Stripe(process.env.STRIPE_PUBLISH_KEY);

export const bookTour = async tourId => {
  try {
    // 1) Get checkout session from API
    console.log(tourId);
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    console.log(session);

    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
