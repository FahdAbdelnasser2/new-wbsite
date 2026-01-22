// Ministry Initiative JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // User counter
  let userCount = 1;
  const userCountInput = document.getElementById('userCount');
  const displayUserCount = document.getElementById('displayUserCount');
  const decreaseBtn = document.getElementById('decreaseUsers');
  const increaseBtn = document.getElementById('increaseUsers');
  
  // Program selection
  const programCheckboxes = document.querySelectorAll('.program-checkbox');
  const selectedProgramsList = document.getElementById('selectedProgramsList');
  const totalAmountSpan = document.getElementById('totalAmount');
  const subscribeBtn = document.getElementById('subscribeBtn');
  
  // Initialize with default values
  updateTotal();
  
  // Update user count
  decreaseBtn.addEventListener('click', function() {
    if (userCount > 1) {
      userCount--;
      userCountInput.value = userCount;
      displayUserCount.textContent = userCount;
      updateTotal();
    }
  });
  
  increaseBtn.addEventListener('click', function() {
    if (userCount < 100) {
      userCount++;
      userCountInput.value = userCount;
      displayUserCount.textContent = userCount;
      updateTotal();
    }
  });
  
  // Program selection
  programCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      const card = this.closest('.program-card-mini');
      if (card) {
        if (this.checked) {
          card.classList.add('selected');
        } else {
          card.classList.remove('selected');
        }
      }
      updateTotal();
    });
  });
  
  // Calculate and update total
  function updateTotal() {
    let total = 0;
    let selectedPrograms = [];
    
    programCheckboxes.forEach(checkbox => {
      if (checkbox.checked) {
        const card = checkbox.closest('.program-card-mini');
        const price = parseInt(card.dataset.price);
        const programName = card.querySelector('h4').textContent;
        
        total += price;
        selectedPrograms.push({
          name: programName,
          price: price
        });
      }
    });
    
    const totalAmount = total * userCount;
    totalAmountSpan.textContent = totalAmount.toLocaleString('ar-SA');
    
    // Update selected programs list
    if (selectedPrograms.length > 0) {
      let html = '';
      selectedPrograms.forEach(prog => {
        html += `
          <div class="program-item">
            <span class="program-name">${prog.name}</span>
            <span class="program-price">${(prog.price * userCount).toLocaleString('ar-SA')} ريال</span>
          </div>
        `;
      });
      selectedProgramsList.innerHTML = html;
      subscribeBtn.disabled = false;
    } else {
      selectedProgramsList.innerHTML = '<p style="text-align: center; color: #94a3b8; font-size: 14px;">لم يتم اختيار أي برنامج</p>';
      subscribeBtn.disabled = true;
    }
  }
  
  // Open subscription page
  subscribeBtn.addEventListener('click', function() {
    // Store selected data in localStorage
    const selectedData = {
      programs: [],
      userCount: userCount,
      totalAmount: 0
    };
    
    programCheckboxes.forEach(checkbox => {
      if (checkbox.checked) {
        const card = checkbox.closest('.program-card-mini');
        const price = parseInt(card.dataset.price);
        const programName = card.querySelector('h4').textContent;
        
        selectedData.programs.push({
          name: programName,
          price: price
        });
        selectedData.totalAmount += price;
      }
    });
    
    selectedData.totalAmount *= userCount;
    
    localStorage.setItem('subscriptionData', JSON.stringify(selectedData));
    
    // Navigate to subscription wizard
    window.location.href = 'subscription-wizard.html';
  });
  
  // Initialize
  updateTotal();
});
