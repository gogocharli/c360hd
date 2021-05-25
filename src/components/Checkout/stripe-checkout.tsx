import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  useElements,
  useStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from '@stripe/react-stripe-js';
import formStyles from '../Form/styles.module.scss';
import { Button } from '../button';
import { ErrorText } from '../Form/error-text';
import { Spinner } from '../loading-spinner';
import { Address } from './payment';
import { useTranslation } from 'next-i18next';

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
  const [error, setError] = useState<any>(null);
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

  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) return;

    const card = elements.getElement(CardNumberElement);
    if (!card) return;

    const payload = await stripe.confirmCardPayment(clientSecret, {
      receipt_email: customerInfo.email,
      payment_method: {
        card,
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
  }

  const { t } = useTranslation('checkout');
  return (
    <form
      id='stripe-checkout'
      className={formStyles.form}
      onSubmit={handleSubmit}
    >
      <div className={formStyles.field}>
        <label>
          {t('payment.card.number')}
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
            {t('payment.card.exp')}
            <CardExpiryElement
              id='stripe-card-exp'
              options={{ ...baseStyles }}
            />
          </label>
        </div>
      </div>
      {isProcessing && (
        <div className='stripe-card-loading'>
          <Spinner />
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
        Pay Now
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

          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1000;
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
