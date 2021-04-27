import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  useElements,
  useStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from '@stripe/react-stripe-js';
import formStyles from '../Form/styles.module.scss';
import { Button } from '@components/button';
import { ErrorText } from '@components/Form/error-text';
import { Address } from './payment';

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
  intent = 'deposit',
  product,
  customerInfo,
  onSuccess: setSucceeded,
}: {
  intent?: 'deposit' | 'final_payment';
  product: 'special' | 'classic';
  customerInfo: {
    email: string;
    name: string;
    phone: string;
    address: Address;
  };
  onSuccess: Dispatch<SetStateAction<boolean>>;
}) {
  const [error, setError] = useState(null);
  const [isProcessing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState('');

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    window
      .fetch(`/api/payments?intent=${intent}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ product, customerInfo }),
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
      {isProcessing && (
        <div className='stripe-card-loading'>
          <h2>Processing</h2>
        </div>
      )}
      {error && (
        <div className='stripe-card-error' role='alert'>
          <ErrorText>{error}</ErrorText>
        </div>
      )}
      <Button
        type='secondary'
        form='stripe-checkout'
        className='stripe-checkout-button'
        disabled={isProcessing}
      >
        Confirm Order
      </Button>
      <style jsx>{`
        form {
          width: 100%;
          position: relative;
        }

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

        .stripe-card-loading {
          position: absolute;
        }

        :global(.button.stripe-checkout-button) {
          --default-bg: var(--color-light-highlight);
          --default-color: var(--color-dark-main);
          --hover-bg: var(--color-dark-main);
          --hover-color: var(--color-light-main);

          align-self: center;
        }
      `}</style>
    </form>
  );
}
