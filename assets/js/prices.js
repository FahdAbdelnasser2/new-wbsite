const monthlyBtn = document.getElementById('monthly');
const yearlyBtn = document.getElementById('yearly');
const prices = document.querySelectorAll('.span-price');

monthlyBtn.addEventListener('click', () => {
  prices.forEach(price => {
    price.textContent = price.dataset.monthly;
    price.nextElementSibling.textContent = '/شهريا';
  });
  monthlyBtn.classList.add('active');
  yearlyBtn.classList.remove('active');
});

yearlyBtn.addEventListener('click', () => {
  prices.forEach(price => {
    price.textContent = price.dataset.yearly;
    price.nextElementSibling.textContent = '/سنويا';
  });
  yearlyBtn.classList.add('active');
  monthlyBtn.classList.remove('active');
});
