import { useEffect, useState } from 'react';
import {
  useElements,
  useStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from '@stripe/react-stripe-js';
import formStyles from './Form/styles.module.scss';

const baseStyles = {
  style: {
    base: {
      color: '#001738',
      fontFamily:
        'Poppins, Futura, Helvetica Neue, --applesystem, -system-ui, sans-serif',
      fontWeight: '400',
      fontSize: '20px',
      '::placeholder': {
        color: '#274262aa',
      },
    },
  },
};

export function StripeCheckout({
  customerInfo,
}: {
  customerInfo: { email: string; name: string; phone: string };
}) {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(true);
  // const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    window
      .fetch('/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: ['a product'], customerInfo }),
      })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) return;

    const payload = await stripe.confirmCardPayment(clientSecret, {
      receipt_email: customerInfo.email,
      payment_method: {
        card: elements.getElement(CardNumberElement),
        billing_details: customerInfo,
      },
    });

    if (payload.error) {
      setError(payload.error.message);
      setProcessing(false);
      setSucceeded(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
    console.log('[PaymentMethod]', payload);
  }

  return (
    <form
      id='stripe-checkout'
      className={formStyles.form}
      onSubmit={handleSubmit}
    >
      <div className={formStyles.field}>
        <label>
          Card Number
          <CardNumberElement
            id='stripe-card-number'
            options={{ ...baseStyles }}
          />
        </label>
      </div>
      <div className='extra-info'>
        <div className={formStyles.field}>
          <label>
            CVC
            <CardCvcElement id='stripe-card-cvc' options={{ ...baseStyles }} />
          </label>
        </div>
        <div className={formStyles.field}>
          <label>
            Expiration Date
            <CardExpiryElement
              id='stripe-card-exp'
              options={{ ...baseStyles }}
            />
          </label>
        </div>
      </div>
      {error && (
        <div className='stripe-card-error' role='alert'>
          {error}
        </div>
      )}
      {succeeded && (
        <div className='stripe-card-success'>Payment Successful</div>
      )}
      <style jsx>{`
        label > :global(*:last-child) {
          margin-top: 1rem;
          padding: 1rem;
          border: 1px solid hsl(var(--border-color));
        }

        .extra-info {
          display: flex;
          flex-flow: row wrap;
        }

        .extra-info > * {
          flex-basis: calc(50% - 0.5rem);
        }

        .extra-info > :last-child {
          margin-left: 0.5rem;
        }
      `}</style>
    </form>
  );
}
