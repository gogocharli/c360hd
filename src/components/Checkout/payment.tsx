import { useEffect, useState } from 'react';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { FormInputs } from '../Form/form-field';
import { StripeCheckout } from './stripe-checkout';

export function Payment() {
  const { getValues, handleSubmit } = useFormContext<FormInputs>();
  const {
    product,
    email,
    businessName: name,
    primaryNumber: phone,
    address,
  } = getValues();
  const [paymentTime, setPaymentTime] = useState<PaymentTime>();
  const [succeeded, setSucceeded] = useState(false);

  const onSubmit: SubmitHandler<FormInputs> = (data) => console.log(data);

  useEffect(() => {
    if (succeeded) handleSubmit(onSubmit)();
  }, [succeeded]);

  return (
    <>
      {paymentTime == null ? (
        <div className='[ choose-payment ] [ text-550 weight-bold ]'>
          <button className='later' onClick={() => setPaymentTime('later')}>
            Pay Later
          </button>
          <button className='now' onClick={() => setPaymentTime('now')}>
            Pay Now
          </button>
        </div>
      ) : paymentTime == 'now' ? (
        <StripeCheckout
          product={product}
          customerInfo={{
            email,
            name,
            phone,
            address: createAdressObj(address),
          }}
          onSuccess={setSucceeded}
        />
      ) : (
        <h2 className=''>Submit Form</h2>
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

type PaymentTime = null | 'now' | 'later';
