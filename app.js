import { db, collection, addDoc, getDocs } from './firebase-config.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log('Portfolio App active');
  initContactForm();
});

function initContactForm() {
  const form = document.getElementById('publicContactForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = form.querySelector('[name="fullname"]').value;
    const email = form.querySelector('[name="email"]').value;
    const service = form.querySelector('[name="service"]').value;
    const message = form.querySelector('[name="message"]').value;
    const btn = form.querySelector('button[type="submit"]');

    btn.disabled = true;
    btn.innerText = 'Lasa ny hafatra...';

    try {
      await addDoc(collection(db, 'messages'), {
        name,
        email,
        service,
        message,
        date: new Date().toISOString()
      });
      alert('Misaotra betsaka! Voaray ny hafatrao ary hifandray aminao vetivety izahay.');
      form.reset();
    } catch (err) {
      console.error(err);
      alert('Nisy olana kely: ' + err.message);
    } finally {
      btn.disabled = false;
      btn.innerText = 'Alefa ny hafatra';
    }
  });
}