const chatToggle = document.querySelector(".chat-toggle");
const chatWidget = document.querySelector(".chat-widget");
const chatClose = document.querySelector(".chat-close");
const chatInput = document.querySelector(".chat-input input");
const sendBtn = document.querySelector(".send-btn");
const chatBody = document.querySelector(".chat-body");

function addMessage(message, isUser = false) {
  if (!chatBody) return;
  const div = document.createElement("div");
  div.className = `chat-message ${isUser ? "user-message" : "bot-message"}`;
  div.innerHTML = `<p>${message}</p>`;
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function sendMessage() {
  if (!chatInput) return;
  const msg = chatInput.value.trim();
  if (msg) {
    addMessage(msg, true);
    chatInput.value = "";
    setTimeout(() => {
      const responses = [
        "شكراً لتواصلك معنا! 👌",
        "تم استلام رسالتك ✅",
        "سنرد عليك قريباً 🙌",
      ];
      addMessage(responses[Math.floor(Math.random() * responses.length)]);
    }, 1000);
  }
}

chatToggle?.addEventListener("click", () => {
  chatWidget.classList.add("active");
  chatToggle.style.display = "none";
});

chatClose?.addEventListener("click", () => {
  chatWidget.classList.remove("active");
  chatToggle.style.display = "block";
});

sendBtn?.addEventListener("click", sendMessage);
chatInput?.addEventListener("keypress", (e) =>
  e.key === "Enter" ? sendMessage() : null
);
