<script>
  // Svelte modules
  import { createEventDispatcher } from 'svelte';

  // External packages
  import { createForm, ErrorMessage } from 'svelte-forms-lib';
  import Flatpickr from 'svelte-flatpickr';

  const validateAndSend = () =>
    new Promise((resolve) => setTimeout(resolve, 1000));

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
    initialValues: {
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
    },
    validate: (values) => {
      let errs = {};

      if (values.date == null) {
        errs['date'] = 'Please provide a valid time';
      }

      if (values.time == null) {
        errs['time'] = 'Please choose a valid time between 10AM and 5PM';
      }

      return errs;
    },
    onSubmit: (values) => {
      return validateAndSend().then(() => {
        console.log(values);
      });
    },
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
</script>

<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css" />

<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/flatpickr@4.6.6/dist/themes/material_blue.min.css" />

<!-- {#if STATE.send.success}
  <div id="sendmessage">Your message has been sent. Thank you!</div>
{/if}

{#if STATE.send.error}
  <div id="sendmessage">
    {STATE.send.error}
    <br />
    Please try again
  </div>
{/if} -->

<form on:submit={handleSubmit} role="form">
  <div class="field">
    <label for="company">
      <span class="field__label">Business Name</span>
    </label>
    <input
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
      type="text"
      name="decisionMaker"
      id="decisionMaker"
      required="required"
      bind:value={$form.decisionMaker} />
  </div>
  <div class="field">
    <label for="address">
      <span class="field__label">Address</span>
    </label>
    <input
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
      type="text"
      inputmode="numeric"
      name="secondaryNumber"
      id="secondaryNumber"
      bind:value={$form.secondaryNumber} />
  </div>
  <div class="field">
    <label for="email">
      <span class="field__label">E-Mail</span>
    </label>
    <input
      type="text"
      name="email"
      id="email"
      required="required"
      bind:value={$form.email} />
  </div>
  <div class="field">
    <p>Payment Method</p>
    <div class="radio">
      <label for="card">
        <span class="field__label">Credit or Debit Card</span>
      </label>
      <input
        type="radio"
        name="payment"
        id="card"
        bind:group={$form.payment}
        value="card" />
      <label for="cheque">
        <span class="field__label">Cheque</span>
      </label>
      <input
        type="radio"
        name="payment"
        id="cheque"
        bind:group={$form.payment}
        value="cheque" />
    </div>
  </div>
  <div class="field">
    <label for="photos">
      <span class="field__label">Number of Photoshoots</span>
    </label>
    <select name="photos" id="photos" bind:value={$form.photos}>
      <option value="0-10">0-10</option>
      <option value="10-20">10-20</option>
      <option value="20-30">20-30</option>
      <option value="30+">30+</option>
    </select>
  </div>
  <div class="field">
    <label for="date">
      <span class="field__label">Date</span>
    </label>
    <Flatpickr options={flatpickrDateOpts} bind:value={$form.date} id="date" />
  </div>
  <div class="field">
    <label for="time">
      <span class="field__label">Time</span>
    </label>
    <Flatpickr options={flatpickrTimeOpts} bind:value={$form.time} id="time" />
  </div>
  <div class="field">
    <label for="repId">
      <span class="field__label">Sales Rep ID</span>
    </label>
    <input
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
    <p class="field__hint" id="infoHint">
      Specify anything that we might need to take into account for this order
    </p>
    <textarea
      name="addInfo"
      id="addInfo"
      aria-describedby="infoHint"
      bind:value={$form.addInfo} />
  </div>
  <button type="submit" class="button">
    {#if $isSubmitting}loading...{:else}Submit{/if}
  </button>
</form>
