// Navbar: shadow saat scroll + toggle menu mobile
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');

window.addEventListener('scroll', () => {
  nav.classList.toggle('is-scrolled', window.scrollY > 8);
});

navToggle.addEventListener('click', () => {
  nav.classList.toggle('is-open');
  const open = nav.classList.contains('is-open');
  navToggle.setAttribute('aria-label', open ? 'Tutup menu' : 'Buka menu');
});

// Tutup menu mobile saat link diklik
document.querySelectorAll('.nav__links a').forEach((a) => {
  a.addEventListener('click', () => nav.classList.remove('is-open'));
});

// ===== Demo interaktif =====
const demoBtn = document.getElementById('demoBtn');
const demoFiles = document.getElementById('demoFiles');
const demoResult = document.getElementById('demoResult');

// Nama "cerdas" hasil auto-rename per file
const renameMap = {
  'IMG_20431.jpg': 'Pantai-Bali-Sunset.jpg',
  'untitled.docx': 'Proposal-Proyek-Q3.docx',
  'asdf123.xlsx': 'Laporan-Keuangan-Agustus.xlsx',
  'scan0032.png': 'Struk-Belanja-Kantor.png',
  'rekaman baru.mp3': 'Rekaman-Rapat-Tim.mp3',
  'dokumen final FIX.pdf': 'Kontrak-Klien-2026.pdf',
};

const catIcon = { Foto: '🖼️', Dokumen: '📘', Keuangan: '💰', Audio: '🎧' };

let isRunning = false;
demoResult.innerHTML = '<p class="placeholder">Hasil pengelompokan akan muncul di sini setelah kamu menekan tombol.</p>';

demoBtn.addEventListener('click', async () => {
  if (isRunning) return;
  isRunning = true;
  demoBtn.disabled = true;
  demoBtn.textContent = '⏳ Memproses...';
  demoResult.innerHTML = '';

  const items = Array.from(demoFiles.querySelectorAll('li'));
  const clusters = {};

  // Proses file satu per satu untuk efek visual
  for (const li of items) {
    await wait(450);
    const original = li.textContent.replace('📄 ', '').trim();
    const cat = li.dataset.cat;
    const newName = renameMap[original] || original;

    li.classList.add('done');
    li.textContent = `✅ ${original}  →  ${newName}`;

    (clusters[cat] = clusters[cat] || []).push(newName);
  }

  // Tampilkan folder hasil clustering
  await wait(300);
  for (const [cat, files] of Object.entries(clusters)) {
    const div = document.createElement('div');
    div.className = 'result-folder';
    div.innerHTML = `
      <h4><span>${catIcon[cat] || '📁'} Folder: ${cat}</span><span>${files.length} file</span></h4>
      <ul>${files.map((f) => `<li>↳ ${f}</li>`).join('')}</ul>`;
    demoResult.appendChild(div);
    await wait(200);
  }

  demoBtn.textContent = '↻ Ulangi Demo';
  demoBtn.disabled = false;
  isRunning = false;

  demoBtn.onclick = () => location.reload();
});

function wait(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

// Reveal on scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.step, .feature, .price, .stat').forEach((el) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity .5s ease, transform .5s ease';
  observer.observe(el);
});
