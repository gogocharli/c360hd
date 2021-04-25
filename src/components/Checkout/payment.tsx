import { useState } from 'react';
import { FormInputs } from '../Form/form-field';
import { Control, useWatch } from 'react-hook-form';
import { StripeCheckout } from './stripe-checkout';

export function Payment({ control }: { control: Control<FormInputs> }) {
  const { email, businessName: name, primaryNumber: phone } = useWatch({
    control,
  });
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
