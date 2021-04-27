import { useEffect, useState } from 'react';
import {
  SubmitErrorHandler,
  SubmitHandler,
  useFormContext,
} from 'react-hook-form';
import { FormInputs } from '../Form/form-field';
import { ErrorText } from '../Form/error-text';
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
  const [requestComplete, setRequestComplete] = useState(false);

  const [orderNumber, setOrderNumber] = useState('');
  const [isProcessing, setProcessing] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const onValidForm: SubmitHandler<FormInputs> = async (formData) => {
    const formattedData = { ...formData, date: formData.date.toISOString() };
    try {
      const data = await window
        .fetch('/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formattedData),
        })
        .then((res) => res.json());

      if (!data.orderNumber) throw data.errorMessage;

      setOrderNumber(data.orderNumber);
      setErrors([]);
      setRequestComplete(true); // Avoid making the order when component refreshes
    } catch (err) {
      console.error(err);
      setErrors([err]);
    } finally {
      setProcessing(false);
    }
  };

  const onInvalidForm: SubmitErrorHandler<FormInputs> = (err) => {
    setProcessing(false);
    const errorMessages = Object.entries(err).map(
      ([field, error]) => `Please verify the ${field}: ${error.message}`,
    );
    console.error(errorMessages);
    setErrors(errorMessages);
  };

  useEffect(() => {
    if (requestComplete) return;

    if (isPaymentSuccess) {
      setProcessing(true);
      setErrors([]);
      handleSubmit(onValidForm, onInvalidForm)();
      setPaymentTime(null);
    }
  }, [isPaymentSuccess, requestComplete]);

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
      {(paymentTime == 'later' || isPaymentSuccess) && isProcessing ? (
        <h2>Processing</h2>
      ) : (
        <OrderConfirmation orderNumber={orderNumber} errors={errors} />
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
          padding: 0;
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

function OrderConfirmation({
  orderNumber,
  errors,
}: {
  orderNumber: string;
  errors: any;
}) {
  return (
    <>
      <div className='order flow'>
        <h2 className='[ status ] [ text-450 weight-normal leading-flat ]'>
          {errors.length > 0 ? 'Order Failed' : 'Order Successful'}
        </h2>
        {orderNumber && (
          <p className='[ number ] [ text-700 md:text-800 ] [ weight-bold tracking-tight leading-flat ]'>
            {orderNumber}
          </p>
        )}
        <p className='[ details ] [ text-300 measure-short ]'>
          {errors.length > 0
            ? errors.map((err) => <ErrorText key={err} children={err} />)
            : `Here’s your order number. We’ve sent you an email with more details.
          Thanks for doing business with us.`}
        </p>
      </div>
      <style jsx>{`
        div {
          --flow-space: 1rem;

          align-items: center;
          display: flex;
          flex-direction: column;
          margin: 0 auto;
          text-align: center;
        }
      `}</style>
    </>
  );
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
