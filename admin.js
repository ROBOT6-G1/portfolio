import { db, collection, addDoc, getDocs, doc, setDoc, deleteDoc } from './firebase-config.js';

let currentAdminPass = '1234';

window.loginAdmin = function() {
  const passInput = document.getElementById('adminPassword').value;
  if (passInput === currentAdminPass) {
    document.getElementById('loginSection').classList.add('hidden');
    document.getElementById('adminDashboard').classList.remove('hidden');
    loadMessages();
  } else {
    alert('Tsy mety ny teny miafina!');
  }
};

window.compressAndUpload = function(inputElem, previewId) {
  const file = inputElem.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.src = e.target.result;
    img.onload = function() {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;
      const maxWidth = 800;
      if (width > maxWidth) {
        height = (maxWidth * height) / width;
        width = maxWidth;
      }
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
      document.getElementById(previewId).src = compressedDataUrl;
      document.getElementById(previewId).dataset.url = compressedDataUrl;
      alert('Sary voazip tsara (<150KB)');
    };
  };
  reader.readAsDataURL(file);
};

async function loadMessages() {
  const msgList = document.getElementById('messagesList');
  if (!msgList) return;
  msgList.innerHTML = '<p class="text-gray-400">Ampidirina ny hafatra...</p>';
  try {
    const querySnapshot = await getDocs(collection(db, 'messages'));
    if (querySnapshot.empty) {
      msgList.innerHTML = '<p class="text-gray-400">Tsy mbola misy hafatra.</p>';
      return;
    }
    msgList.innerHTML = '';
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const card = document.createElement('div');
      card.className = 'bg-slate-800 p-4 rounded-xl border border-purple-500/20 space-y-2';
      card.innerHTML = `
        <div class="flex justify-between text-sm text-purple-400">
          <span class="font-bold">${data.name} (${data.email})</span>
          <span>${new Date(data.date).toLocaleDateString()}</span>
        </div>
        <div class="text-xs bg-purple-900/40 text-purple-200 inline-block px-2 py-1 rounded">${data.service || 'Général'}</div>
        <p class="text-gray-300 text-sm">${data.message}</p>
      `;
      msgList.appendChild(card);
    });
  } catch (err) {
    msgList.innerHTML = '<p class="text-red-400">Fahadisoana nandritra ny fampidirana.</p>';
  }
}