import { handleFormSubmission } from './stripe-purchase.js';

/**
 * Returns a product dom element from an HTML template
 * @param {Object} product – the item's information
 */
function createProductFromTemplate(item) {
  // Pick the template and create a scaffold for our product
  const template = document.querySelector('#product');
  const product = template.content.cloneNode(true);

  product.querySelector('h2').innerText = item.name;
  product.querySelector('.description').innerText = item.description;
  product.querySelector('[name=sku]').value = item.sku;

  // Render the currency using the Intl formatter for safety
  product.querySelector('.price').innerText = new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: item.currency,
  }).format((item.amount / 100).toFixed(2)); // Currency is saved as cents, convert to dollars

  const img = product.querySelector('img');
  img.src = item.image;
  img.alt = item.name;

  // Attach an event listener to the individual product's form
  const form = product.querySelector('form');
  form.addEventListener('submit', handleFormSubmission);

  return product;
}

export async function loadProducts() {
  const data = await fetch('/.netlify/functions/get-products')
    .then((res) => res.json())
    .catch((err) => console.log(err));

  const products = document.querySelector('.products');

  data.forEach((item) => {
    const product = createProductFromTemplate(item);

    products.appendChild(product);
  });
}
