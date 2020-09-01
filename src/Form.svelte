<script>
  // Svelte modules
  import { createEventDispatcher } from 'svelte';

  // External packages
  import { createForm, ErrorMessage } from 'svelte-forms-lib';
  import * as yup from 'yup';
  import Flatpickr from 'svelte-flatpickr';
  import { SyncLoader } from 'svelte-loading-spinners';

  const validateAndSend = (formResponses) => {
    isSubmitting.set(true);
    fetch('/api/order', {
      method: 'POST',
      body: JSON.stringify(formResponses),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        status = 'SUCCESS';
      })
      .catch((error) => {
        console.error(error);
        status = 'ERROR';
      })
      .finally(() => {
        isSubmitting.set(false);
        scrollToTop();
      });
  };

  const initialValues = {
    company: '',
    decisionMaker: '',
    address: '',
    primaryNumber: '',
    secondaryNumber: '',
    email: '',
    payment: '',
    photos: '',
    date: null,
    time: null,
    repId: '',
    addInfo: '',
  };

  const {
    // Observables state
    form,
    errors,
    state,
    touched,
    isValid,
    isSubmitting,
    isValidating,
    // Handlers
    handleBlur,
    handleChange,
    handleSubmit,
  } = createForm({
    initialValues,
    validationSchema: yup.object().shape({
      company: yup.string().required(),
      decisionMaker: yup.string().required(),
      address: yup.string().required(),
      primaryNumber: yup.string().required(),
      secondaryNumber: yup.string(),
      email: yup.string().email().required(),
      payment: yup.string().oneOf(['card', 'cheque']).required(),
      photos: yup.string().oneOf(['0-10', '10-20', '20-30', '30+']).required(),
      date: yup.date().required(),
      time: yup.date().required(),
      repId: yup.string().required(),
      addInfo: yup.string(),
    }),
    onSubmit: (values) => validateAndSend(values),
  });

  const flatpickrDateOpts = {
    minDate: 'today',
    disable: [
      function (date) {
        // Disable week-ends
        return date.getDay() === 0 || date.getDay() === 6;
      },
    ],
    locale: {
      firstDayOfWeek: 1, // start week on Monday
    },
    altInput: true,
    altFormat: 'F j, Y',
    dateFormat: 'Y-m-d',
  };

  const flatpickrTimeOpts = {
    enableTime: true,
    noCalendar: true,
    minTime: '10:00',
    maxTime: '17:00',
    dateFormat: 'H:i',
    time_24hr: true,
    minuteIncrement: '30:00',
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  const resetForm = () => {
    form.set(initialValues);
    status = 'PENDING';
  };

  let status = 'PENDING';
</script>

<style>
  button {
    align-self: center;
  }

  label {
    @apply my-2 text-gray-700 text-center text-lg font-medium;
  }

  .field {
    @apply flex flex-col items-center;
  }

  small {
    @apply block m-2 text-center text-red-600;
  }

  .modal {
    display: none; /* Hidden when the form is not submitting */
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .modal p {
    color: #2f80ed;
  }

  .modal.submitting {
    display: block;
  }

  .response {
    display: none;
  }

  .response.success,
  .response.error {
    display: block;
  }
</style>

<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css" />

<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/flatpickr@4.6.6/dist/themes/material_blue.min.css" />

<form
  on:submit={handleSubmit}
  role="form"
  class:loading={$isSubmitting}
  class="flex flex-col items-center container p-8 space-y-4 mx-auto">
  {#if status === 'SUCCESS'}
    <div
      class="response success bg-teal-100 border border-teal-500 rounded-b
        text-teal-900 px-16 py-3 shadow-md space-y-4">
      <p>Order sent!</p>
      <button
        class="py-2 px-4 rounded bg-teal-500 text-white"
        type="reset"
        on:click={resetForm}>Reset</button>
    </div>
  {/if}

  {#if status === 'ERROR'}
    <div
      class="response error bg-red-100 border border-red-400 text-red-700 px-4
        py-3 rounded">
      <p>Something went wrong. Please try again.</p>
    </div>
  {/if}

  <div
    class:submitting={$isSubmitting}
    class="modal bg-opacity-75 bg-blue-100 flex flex-col items-center
      justify-center p-16 transition-opacity">
    <p class="text-2xl text-center text-blue-700 font-bold mb-8">
      Please wait while we process your order
    </p>

    <SyncLoader size="60" color="#2f80ed" unit="px" class="mx-auto" />
  </div>
  <div class="field">
    <label for="company">
      <span class="field__label">Business Name</span>
    </label>
    <input
      class="form-input"
      type="text"
      name="company"
      id="company"
      required="required"
      bind:value={$form.company} />
  </div>
  <div class="field">
    <label for="decisionMaker">
      <span class="field__label">Decision Maker</span>
    </label>
    <input
      class="form-input"
      type="text"
      name="decisionMaker"
      id="decisionMaker"
      required="required"
      bind:value={$form.decisionMaker} />
  </div>
  <div class="field">
    <label for="address"> <span class="field__label">Address</span> </label>
    <input
      class="form-input"
      type="text"
      name="address"
      id="address"
      required="required"
      bind:value={$form.address} />
  </div>
  <div class="field">
    <label for="primaryContact">
      <span class="field__label">Phone Number</span>
    </label>
    <input
      class="form-input"
      type="text"
      inputmode="numeric"
      name="primaryNumber"
      id="primaryNumber"
      required="required"
      bind:value={$form.primaryNumber} />
  </div>
  <div class="field">
    <label for="secondaryContact">
      <span class="field__label">Secondary Phone Number (Optional)</span>
    </label>
    <input
      class="form-input"
      type="text"
      inputmode="numeric"
      name="secondaryNumber"
      id="secondaryNumber"
      bind:value={$form.secondaryNumber} />
  </div>
  <div class="field">
    <label for="email"> <span class="field__label">E-Mail</span> </label>
    <input
      class="form-input"
      type="text"
      name="email"
      id="email"
      required="required"
      bind:value={$form.email} />
    {#if $errors.email}<small>{$errors.email}</small>{/if}
  </div>
  <div class="field">
    <p class="text-lg mt-2 text-gray-700">Payment Method</p>
    <div class="radio">
      <label for="card" class="inline-flex items-center">
        <span class="field__label">Card</span>
        <input
          class="form-radio ml-2 h-6 w-6"
          type="radio"
          name="payment"
          id="card"
          bind:group={$form.payment}
          value="card" />
      </label>

      <label for="cheque" class="inline-flex items-center ml-6">
        <span class="field__label">Cheque</span>
        <input
          class="form-radio ml-2 h-6 w-6"
          type="radio"
          name="payment"
          id="cheque"
          bind:group={$form.payment}
          value="cheque" />
      </label>

      {#if $errors.payment}<small>{$errors.payment}</small>{/if}
    </div>
  </div>
  <div class="field">
    <label for="photos">
      <span class="field__label">Number of Photoshoots</span>
    </label>
    <select
      class="form-select"
      name="photos"
      id="photos"
      bind:value={$form.photos}>
      <option />
      <option value="0-10">0-10</option>
      <option value="10-20">10-20</option>
      <option value="20-30">20-30</option>
      <option value="30+">30+</option>
    </select>
    {#if $errors.photos}<small>{$errors.photos}</small>{/if}
  </div>
  <div class="field">
    <label for="date"> <span class="field__label">Date</span> </label>
    <Flatpickr
      class="form-input text-center"
      options={flatpickrDateOpts}
      bind:value={$form.date}
      id="date" />
  </div>
  <div class="field">
    <label for="time"> <span class="field__label">Time</span> </label>
    <Flatpickr
      class="form-input min-w-full text-center"
      options={flatpickrTimeOpts}
      bind:value={$form.time}
      id="time" />
  </div>
  <div class="field">
    <label for="repId"> <span class="field__label">Sales Rep ID</span> </label>
    <input
      class="form-input"
      type="text"
      name="repId"
      id="repId"
      required="required"
      bind:value={$form.repId} />
  </div>
  <div class="field">
    <label for="addInfo">
      <span class="field__label">Additional Information</span>
    </label>
    <p class="field__hint mb-2 text-sm text-center text-gray-700" id="infoHint">
      Specify anything that we might need to take into account for this order
    </p>
    <textarea
      name="addInfo"
      class="form-textarea mt-1 mb-8 block w-full"
      rows="3"
      placeholder="Enter some relevant information"
      id="addInfo"
      aria-describedby="infoHint"
      bind:value={$form.addInfo} />
  </div>
  <button
    type="submit"
    class="button rounded-md shadow-xs"
    disabled={$isSubmitting}>
    {#if $isSubmitting}Please wait...{:else}Submit{/if}
  </button>
</form>
