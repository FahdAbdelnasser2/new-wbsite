const monthlyBtn = document.getElementById("monthly");
const yearlyBtn = document.getElementById("yearly");
const prices = document.querySelectorAll(".span-price");

monthlyBtn.addEventListener("click", () => {
  prices.forEach((price) => {
    price.textContent = price.dataset.monthly;
    price.nextElementSibling.textContent = "/شهريا";
  });
  monthlyBtn.classList.add("active");
  yearlyBtn.classList.remove("active");
});

yearlyBtn.addEventListener("click", () => {
  prices.forEach((price) => {
    price.textContent = price.dataset.yearly;
    price.nextElementSibling.textContent = "/سنويا";
  });
  yearlyBtn.classList.add("active");
  monthlyBtn.classList.remove("active");
});
const appList = document.querySelector(".app-list");
let userCount = 1;
let selectedApps = [];

function updateUserCountFromInput() {
  let inputValue = parseInt(document.getElementById("userCount").value);
  if (inputValue >= 1) {
    userCount = inputValue;
  } else {
    userCount = 1;
    document.getElementById("userCount").value = 1;
  }
  updateUserCountDisplay();
  updateTotalPrice();
}

function changeUsers(delta) {
  userCount = Math.max(1, userCount + delta);
  document.getElementById("userCount").value = userCount;
  updateUserCountDisplay();
  updateTotalPrice();
}

function updateUserCountDisplay() {
  document.querySelector(".userCount").textContent = userCount;
}

function updateTotalPrice() {
  let total = 0;
  if (selectedApps.length > 0) {
    selectedApps.forEach((app) => {
      total += parseFloat(app.price) * userCount;
    });
  }
  total += userCount * 10;
  document.getElementById("totalPrice").textContent = total.toFixed(2);
}

document.querySelectorAll(".app-card").forEach((card) => {
  card.addEventListener("click", function () {
    let element = this.querySelector(".app-card-name").textContent;
    let elementPrice = this.querySelector(".app-card-price").textContent;
    this.classList.toggle("selected");

    if (this.classList.contains("selected")) {
      let li = document.createElement("li");
      li.className = "app-item";
      li.dataset.appName = element;
      li.innerHTML = `<span class="app-name">${element}</span>
                                    <span class="app-price">$${elementPrice} / user</span>`;
      appList.appendChild(li);
      selectedApps.push({ name: element, price: parseFloat(elementPrice) });
    } else {
      let liToRemove = appList.querySelector(`li[data-app-name="${element}"]`);
      if (liToRemove) liToRemove.remove();
      selectedApps = selectedApps.filter((app) => app.name !== element);
    }
    updateTotalPrice();
  });

  // إضافة دعم لمفتاح Enter/Space لتحديد الكروت
  card.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      this.click();
    }
  });
});

document
  .getElementById("userCount")
  .addEventListener("input", updateUserCountFromInput);
updateUserCountDisplay();
updateTotalPrice();
