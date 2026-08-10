const form = document.getElementById('chat-form');
const input = document.getElementById('message');
const chatBox = document.getElementById('chat-box');

function addMessage(text, cls) {
  const div = document.createElement('div');
  div.className = 'msg ' + cls;
  div.textContent = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const message = input.value.trim();
  if (!message) return;

  addMessage(message, 'user');
  input.value = '';

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
    const data = await res.json();

    if (data.success) {
      addMessage(data.reply, 'bot');
    } else {
      addMessage('เกิดข้อผิดพลาด: ' + data.error, 'error');
    }
  } catch (err) {
    addMessage('เชื่อมต่อเซิร์ฟเวอร์ไม่ได้: ' + err.message, 'error');
  }
});
