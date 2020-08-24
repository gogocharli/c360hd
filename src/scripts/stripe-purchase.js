export async function handleFormSubmission(event) {
  event.preventDefault();

  // https://developer.mozilla.org/en-US/docs/Web/API/FormData
  const form = new FormData(event.target);

  const data = {
    sku: form.get('sku'),
  };

  let response;
  // Contact the create checkout lambda to obtain our product
  if (form.get('setup') == 'true') {
    response = await fetch('/.netlify/functions/setup-payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
  } else {
    response = await fetch('/.netlify/functions/create-checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
  }

  const stripe = Stripe(response.publishableKey);
  const { error } = await stripe.redirectToCheckout({
    sessionId: response.sessionId,
  });

  if (error) {
    console.error(error);
  }
}

export async function retrieveCheckoutSession() {
  // Get the session ID from the URL
  const sessionRegex = /(?:session_id=%7B)(.*)(?:%7D)$/;
  const match = document.URL.match(sessionRegex);
  if (match) {
    const session = {
      id: match[1],
    };

    // Send it to our netlify function
    const postID = await fetch('/.netlify/functions/save-payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(session),
    });

    // Redirect the user to avoid double payments
    window.location = 'https://c360hd.com/';
  }
}
