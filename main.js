const KEY = 'AIzaSyA5B3H9...xxx';   // ← kendi anahtarını yaz
const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${KEY}`;

const app = document.getElementById('app');
app.innerHTML = `
  <div id="chat"></div>
  <div id="input">
    <textarea id="prompt" rows="2"></textarea>
    <button id="send">Gönder</button>
  </div>
`;

const chat = document.getElementById('chat');
const prompt = document.getElementById('prompt');
const send = document.getElementById('send');

send.onclick = async () => {
  const text = prompt.value.trim();
  if (!text) return;
  addBubble('user', text);
  const reply = await fetchGemini(text);
  addBubble('ai', reply);
  prompt.value = '';
};

function addBubble(role, text) {
  const div = document.createElement('div');
  div.className = `bubble ${role}`;
  div.textContent = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

async function fetchGemini(prompt) {
  const res = await fetch(URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
  });
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || 'Hata';
}
