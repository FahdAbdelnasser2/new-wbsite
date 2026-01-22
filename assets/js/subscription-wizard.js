// Subscription Wizard JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Load subscription data from localStorage
  const subscriptionData = JSON.parse(localStorage.getItem('subscriptionData') || '{}');
  
  // Elements
  const steps = document.querySelectorAll('.step');
  const stepContents = document.querySelectorAll('.wizard-step-content');
  
  // Step 1 elements
  const companyForm = document.getElementById('companyForm');
  const nextToPaymentBtn = document.getElementById('nextToPayment');
  
  // Step 2 elements
  const backToCompanyBtn = document.getElementById('backToCompany');
  const processPaymentBtn = document.getElementById('processPayment');
  const summaryAmountSpan = document.getElementById('summaryAmount');
  const summaryTotalSpan = document.getElementById('summaryTotal');
  
  // Step 3 elements
  const successEmailSpan = document.getElementById('successEmail');
  const successDomainSpan = document.getElementById('successDomain');
  const successCompanySpan = document.getElementById('successCompany');
  
  // Initialize
  updateOrderSummary();
  
  // Update order summary
  function updateOrderSummary() {
    if (subscriptionData.totalAmount && Array.isArray(subscriptionData.programs) && subscriptionData.programs.length > 0) {
      const total = subscriptionData.totalAmount;
      // بناء تفاصيل البرامج مع عدد المستخدمين
      let details = '';
      subscriptionData.programs.forEach(prog => {
        details += `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;padding:6px 0; font-weight:700; color:#0e7490; font-size:1.1em;">البرامج :</div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px; background:#f1f5f9; border-radius:7px; padding:6px 12px; font-size:1.05em;">
        <span style="font-weight:600; color:#334155;">${prog.name}</span>
        <span style="color:#0e7490; font-weight:700;">${prog.price.toLocaleString('ar-SA')} ريال</span>
        </div>`;
      });
      details += `<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;padding:6px 0; font-weight:700; color:#0e7490; font-size:1.1em;">عدد المستخدمين: <span>${subscriptionData.userCount}</span></div>`;
      // عرض التفاصيل أعلى ملخص الطلب
      const summaryBox = summaryAmountSpan.closest('.order-summary');
      if (summaryBox) {
        let detailsBox = summaryBox.querySelector('.order-details-list');
        if (!detailsBox) {
          detailsBox = document.createElement('div');
          detailsBox.className = 'order-details-list';
          summaryBox.insertBefore(detailsBox, summaryBox.querySelector('.summary-item'));
        }
        detailsBox.innerHTML = details;
      }
      summaryAmountSpan.textContent = total.toLocaleString('ar-SA') + ' ريال';
      summaryTotalSpan.textContent = total.toLocaleString('ar-SA') + ' ريال';
    }
  }
  
  // Navigate to specific step
  function goToStep(stepNumber) {
    // Update step indicators
    steps.forEach((step, index) => {
      const stepNum = index + 1;
      
      if (stepNum === stepNumber) {
        step.classList.add('active');
        step.classList.remove('completed');
      } else if (stepNum < stepNumber) {
        step.classList.add('completed');
        step.classList.remove('active');
      } else {
        step.classList.remove('active', 'completed');
      }
    });
    
    // Update step content visibility
    stepContents.forEach((content, index) => {
      if (index + 1 === stepNumber) {
        content.classList.add('active');
      } else {
        content.classList.remove('active');
      }
    });
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  // Step 1: Next to Payment
  if (nextToPaymentBtn) {
    nextToPaymentBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Validate form
      if (companyForm.checkValidity()) {
        goToStep(2);
      } else {
        // Show validation messages
        companyForm.reportValidity();
      }
    });
  }
  
  // Step 2: Back to Company
  if (backToCompanyBtn) {
    backToCompanyBtn.addEventListener('click', function() {
      goToStep(1);
    });
  }
  
  // Step 2: Process Payment
  if (processPaymentBtn) {
    processPaymentBtn.addEventListener('click', function() {
      const btn = this;
      const originalHTML = btn.innerHTML;
      
      // Disable button and show loading
      btn.disabled = true;
      btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> جاري المعالجة...';
      
      // Simulate payment processing
      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = originalHTML;
        
        // Show success step
        showSuccessStep();
      }, 2000);
    });
  }
  
  // Show success step
  function showSuccessStep() {
    goToStep(3);
    
    // Get form data
    const companyEmail = document.getElementById('companyEmail').value;
    const companyName = document.getElementById('companyName').value;
    const preferredDomain = document.getElementById('preferredDomain').value;
    
    // Update success message
    if (successEmailSpan) {
      successEmailSpan.textContent = companyEmail;
    }
    
    if (successCompanySpan) {
      successCompanySpan.textContent = companyName;
    }
    
    if (successDomainSpan) {
      const domain = preferredDomain || companyName.toLowerCase().replace(/\s+/g, '-');
      successDomainSpan.textContent = `https://${domain}.raito.sa`;
    }
  }
  
  // Format card number input
  const cardNumberInput = document.querySelector('input[placeholder="1234 5678 9012 3456"]');
  if (cardNumberInput) {
    cardNumberInput.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\s/g, '');
      let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
      e.target.value = formattedValue;
    });
  }
  
  // Format expiry date input
  const expiryInput = document.querySelector('input[placeholder="MM/YY"]');
  if (expiryInput) {
    expiryInput.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2, 4);
      }
      e.target.value = value;
    });
  }
  
  // Format CVV input (numbers only)
  const cvvInput = document.querySelector('input[placeholder="123"]');
  if (cvvInput) {
    cvvInput.addEventListener('input', function(e) {
      e.target.value = e.target.value.replace(/\D/g, '');
    });
  }
  
  // Format phone number input
  const phoneInput = document.getElementById('companyPhone');
  if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
      e.target.value = e.target.value.replace(/\D/g, '');
    });
  }
});
