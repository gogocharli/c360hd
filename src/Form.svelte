<script>
  import { createEventDispatcher } from 'svelte';
  import Flatpickr from 'svelte-flatpickr';

  const dispatch = createEventDispatcher();

  function handleSubmit() {
    dispatch('formsubmit', {
      state: {
        name,
        decisionMaker,
        address,
        primaryNumber,
        secondaryNumber,
        email,
        payment,
        photos,
        date,
        time,
        salesRepId,
        addInfo,
      },
    });
  }

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

  const flatpickrtimeOpts = {
    enableTime: true,
    noCalendar: true,
    minTime: '10:00',
    maxTime: '17:00',
    dateFormat: 'H:i',
    time_24hr: true,
    defaultDate: '10:00',
    minuteIncrement: '30:00',
  };

  export let name = '';
  export let decisionMaker = '';
  export let address = '';
  export let primaryNumber = '';
  export let secondaryNumber = '';
  export let email = '';
  export let payment = '';
  export let photos = '';
  export let date = null;
  export let time = null;
  export let salesRepId = '';
  export let addInfo = '';
</script>

<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css" />

<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/flatpickr@4.6.6/dist/themes/material_blue.min.css" />


<form>
  <div class="field">
    <label for="company">
      <span class="field__label">Company Name</span>
    </label>
    <input
      type="text"
      name="company"
      id="company"
      required="required"
      bind:value={name} />
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
      bind:value={decisionMaker} />
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
      bind:value={address} />
  </div>
  <div class="field">
    <label for="primaryContact">
      <span class="field__label">Phone Number</span>
    </label>
    <input
      type="text"
      inputmode="numeric"
      name="primaryContact"
      id="primaryContact"
      required="required"
      bind:value={primaryNumber} />
  </div>
  <div class="field">
    <label for="secondaryContact">
      <span class="field__label">Secondary Phone Number (Optional)</span>
    </label>
    <input
      type="text"
      inputmode="numeric"
      name="secondaryContact"
      id="secondaryContact"
      bind:value={secondaryNumber} />
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
      bind:value={email} />
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
        bind:group={payment}
        value="card" />
      <label for="cheque">
        <span class="field__label">Cheque</span>
      </label>
      <input
        type="radio"
        name="payment"
        id="cheque"
        bind:group={payment}
        value="cheque" />
    </div>
  </div>
  <div class="field">
    <label for="panoNumber">
      <span class="field__label">Number of Photoshoots</span>
    </label>
    <select name="panoNumber" id="panoNumber" bind:value={photos}>
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
    <Flatpickr options={flatpickrDateOpts} bind:value={date} id="date" />
  </div>
  <div class="field">
    <label for="time">
      <span class="field__label">Time</span>
    </label>
    <Flatpickr options={flatpickrtimeOpts} bind:value={time} id="time" />
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
      bind:value={salesRepId} />
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
      bind:value={addInfo} />
  </div>
  <button type="submit" class="button" on:click|preventDefault={handleSubmit}>
    Submit
  </button>
</form>
