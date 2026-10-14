const messages = document.getElementById("messages");
const chatForm = document.getElementById("chatForm");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const restartBtn = document.getElementById("restartBtn");
const history = [];

function addMessage(role, content, stamp = "Just now") {
  const wrap = document.createElement("div");
  wrap.className = `message ${role}`;
  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = content;
  const time = document.createElement("time");
  time.textContent = stamp;
  wrap.append(bubble, time);
  messages.appendChild(wrap);
  messages.scrollTop = messages.scrollHeight;
  return wrap;
}
function addTyping() {
  return addMessage("assistant", "Thinking…");
}
async function sendMessage(text) {
  const clean = text.trim();
  if (!clean) return;
  addMessage("user", clean);
  messageInput.value = "";
  sendBtn.disabled = true;
  const typing = addTyping();
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({message: clean, history: history.slice(-10)})
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.detail || "Chat request failed.");
    typing.querySelector(".bubble").textContent = data.reply;
    history.push({role: "user", content: clean}, {role: "assistant", content: data.reply});
  } catch (error) {
    typing.querySelector(".bubble").textContent = "Sorry, I couldn't process that just now. Please try again or use the project enquiry form below.";
  } finally {
    sendBtn.disabled = false;
    messageInput.focus();
    messages.scrollTop = messages.scrollHeight;
  }
}
chatForm.addEventListener("submit", event => {
  event.preventDefault();
  sendMessage(messageInput.value);
});
document.querySelectorAll("[data-question]").forEach(button => {
  button.addEventListener("click", () => sendMessage(button.dataset.question));
});
restartBtn.addEventListener("click", () => {
  history.length = 0;
  messages.replaceChildren();
  addMessage("assistant", "Conversation restarted. Hi! I'm the SurfSync virtual assistant. What would you like to know?");
});
const leadForm = document.getElementById("leadForm");
const leadStatus = document.getElementById("leadStatus");
leadForm.addEventListener("submit", async event => {
  event.preventDefault();
  leadStatus.className = "status";
  leadStatus.textContent = "";
  const button = leadForm.querySelector(".submit-btn");
  button.disabled = true;
  const form = new FormData(leadForm);
  const payload = {
    name: form.get("name"),
    email: form.get("email"),
    phone: form.get("phone") || null,
    service: form.get("service"),
    description: form.get("description"),
    budget: form.get("budget") || null,
    timeline: form.get("timeline") || null,
    consent: document.getElementById("consent").checked
  };
  try {
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.detail || "Unable to save enquiry.");
    leadStatus.className = "status success";
    leadStatus.textContent = `${data.message} Reference: #${data.lead_id}.`;
    leadForm.reset();
  } catch (error) {
    leadStatus.className = "status error";
    leadStatus.textContent = error.message || "Something went wrong. Please try again.";
  } finally {
    button.disabled = false;
  }
});
