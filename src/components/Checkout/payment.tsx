import { useState } from 'react';
import { UseFormGetValues } from 'react-hook-form';
import { FormInputs } from '../Form/form-field';
import { StripeCheckout } from './stripe-checkout';

export function Payment({
  getValues,
}: {
  getValues: UseFormGetValues<FormInputs>;
}) {
  const { email, businessName: name, primaryNumber: phone } = getValues();
  const [succeeded, setSucceeded] = useState(false);
  return (
    <>
      {succeeded ? (
        <div className='stripe-card-success'>Payment Successful</div>
      ) : (
        <StripeCheckout
          customerInfo={{ email, name, phone }}
          onSuccess={setSucceeded}
        />
      )}
    </>
  );
}
