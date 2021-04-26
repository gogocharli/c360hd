import { useEffect, useState } from 'react';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { FormInputs } from '../Form/form-field';
import { StripeCheckout } from './stripe-checkout';

export function Payment() {
  const { getValues, handleSubmit, reset } = useFormContext<FormInputs>();
  const {
    product,
    email,
    businessName: name,
    primaryNumber: phone,
    address,
  } = getValues();
  const [paymentTime, setPaymentTime] = useState<PaymentTime>('idle');
  const [isPaymentSuccess, setPaymentSuccess] = useState(false);

  const [orderNumber, setOrderNumber] = useState('');
  const [isProcessing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    // Send the form to /api/orders
    // Set order number from return data
    // If there's an error, show it to the user
    setOrderNumber('');
    console.log(data);
    setOrderNumber('Order Number');
  };

  useEffect(() => {
    if (isPaymentSuccess) {
      handleSubmit(onSubmit)();
      setPaymentTime(null);
    }
  }, [isPaymentSuccess]);

  return (
    <>
      {paymentTime == 'idle' ? (
        <div className='[ choose-payment ] [ text-550 weight-bold ]'>
          <button
            className='later'
            onClick={() => {
              setPaymentTime('later');
              setPaymentSuccess(true);
            }}
          >
            Pay Later
          </button>
          <button className='now' onClick={() => setPaymentTime('now')}>
            Pay Now
          </button>
        </div>
      ) : (
        paymentTime == 'now' && (
          <StripeCheckout
            product={product}
            customerInfo={{
              email,
              name,
              phone,
              address: createAdressObj(address),
            }}
            onSuccess={setPaymentSuccess}
          />
        )
      )}

      {/* The 'later' option bypasses payment and immediatley places the order */}
      {(paymentTime == 'later' || isPaymentSuccess) && (
        <OrderConfirmation orderNumber={orderNumber} />
      )}

      <style jsx>{`
        .choose-payment {
          display: flex;
          flex-direction: column;
          font-feature-settings: 'ss02' off;
          position: absolute;

          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }

        button {
          border: 0;
          box-shadow: 0;

          cursor: pointer;
          flex: 1 1 50%;
          letter-spacing: 0.02em;
          text-transform: uppercase;
        }

        button:focus {
          outline-offset: -2em;
        }

        button.now {
          background-color: hsl(var(--color-accent-sky));
        }

        button.now:focus {
          outline-color: hsl(var(--color-dark-main));
        }

        button.later {
          background-color: hsl(var(--color-light-main));
        }

        @media (min-width: 50em) {
          .choose-payment {
            flex-direction: row;
          }
        }
      `}</style>
    </>
  );
}

function OrderConfirmation({ orderNumber }: { orderNumber: string }) {
  return <h2 className='align-center'>{orderNumber}</h2>;
}

function createAdressObj(address: string): Address {
  const [street, city, state, _country, postal_code] = address.split(',');

  return {
    line1: street,
    city,
    state,
    country: 'ca',
    postal_code,
  };
}

export interface Address {
  line1: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
}

type PaymentTime = null | 'now' | 'later' | 'idle';
