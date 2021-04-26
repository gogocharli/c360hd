import { useState } from 'react';
import { UseFormGetValues } from 'react-hook-form';
import { FormInputs } from '../Form/form-field';
import { StripeCheckout } from './stripe-checkout';

export function Payment({
  getValues,
}: {
  getValues: UseFormGetValues<FormInputs>;
}) {
  const {
    product,
    email,
    businessName: name,
    primaryNumber: phone,
    address,
  } = getValues();
  const [succeeded, setSucceeded] = useState(false);
  return (
    <>
      {succeeded ? (
        <div className='stripe-card-success'>Payment Successful</div>
      ) : (
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
      )}
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
