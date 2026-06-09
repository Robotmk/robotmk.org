export function init() {
  document.querySelectorAll('.newsletter-form').forEach(form => {
    const emailInput = form.querySelector('input[type="email"]');
    const confirm = form.closest('.newsletter-cta__wrapper')?.querySelector('.newsletter-cta__confirm');

    if (!emailInput) return;

    // Client-side email validation on blur
    emailInput.addEventListener('blur', () => {
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);
      emailInput.setCustomValidity(valid || emailInput.value === '' ? '' : 'Bitte eine gültige E-Mail-Adresse eingeben.');
    });

    form.addEventListener('submit', (e) => {
      // GetResponse handles the actual submission via their widget
      // This handles the UI feedback after successful submit
      if (confirm) {
        e.preventDefault();
        // Attempt native form submit to GetResponse
        const data = new FormData(form);
        fetch(form.action, { method: 'POST', body: data, mode: 'no-cors' })
          .finally(() => {
            form.style.display = 'none';
            confirm.classList.add('is-visible');
          });
      }
    });
  });
}
