<script>
  import Form from './Form.svelte';

  function submitForm(e) {
    state = { ...e.detail.state };
  }

  const INITIAL_STATE = {
    name: '',
    decisionMaker: '',
    address: '',
    primaryNumber: '',
    secondaryNumber: '',
    email: '',
    payment: '',
    photos: '',
    date: null,
    time: null,
    salesRepId: '',
    addInfo: '',
  };

  let state = INITIAL_STATE;

  $: console.log(state);
</script>

<h1>C360HD Streetview Order</h1>
<Form {...state} on:formsubmit={submitForm} />
