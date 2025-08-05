document.addEventListener('DOMContentLoaded', () => {
    const coverPage = document.getElementById('cover-page');
    const openBtn = document.getElementById('open-invitation-btn');
    const mainContent = document.getElementById('main-content');
    const backgroundMusic = document.getElementById('background-music');
    const musicControlBtn = document.getElementById('music-control');
    const sections = document.querySelectorAll('.section');

    // Tanggal pernikahan
    const weddingDate = new Date("Sep 5, 2025 07:00:00").getTime();

    // 1. Logika tombol "Buka Undangan"
    openBtn.addEventListener('click', () => {
        coverPage.classList.add('hidden');
        mainContent.classList.remove('hidden');
        
        // Coba putar musik. Browser mungkin memblokir autoplay, jadi tambahkan .catch()
        backgroundMusic.play().catch(error => {
            console.log("Autoplay was prevented:", error);
            // Tombol musik akan tetap berfungsi meski autoplay gagal
        });

        // Setelah interaksi pertama, kita bisa tampilkan tombol musik
        musicControlBtn.style.display = 'block';

        // Animasikan konten utama setelah cover hilang
        setTimeout(() => {
            animateSections();
        }, 1000); // Tunggu animasi cover selesai
    });
    
    // 2. Logika tombol kontrol musik
    musicControlBtn.addEventListener('click', () => {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            musicControlBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            backgroundMusic.pause();
            musicControlBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    });

    // 3. Logika Countdown Timer
    const countdown = setInterval(() => {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

        if (distance < 0) {
            clearInterval(countdown);
            document.getElementById('countdown').innerHTML = `<h2>Kami telah menikah!</h2>`;
        }
    }, 1000);

    // 4. Logika Animasi Scroll (Intersection Observer)
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Hentikan observasi setelah animasi pertama
            }
        });
    }, { threshold: 0.3 }); // Trigger saat 30% dari elemen terlihat

    function animateSections() {
        document.querySelectorAll('.reveal-from-bottom, .reveal-from-left, .reveal-from-right').forEach(el => {
            observer.observe(el);
        });
    }

    // 5. Logika Galeri Foto (Lightbox)
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxClose = document.querySelector('.lightbox-close');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            lightbox.style.display = 'block';
            lightboxImage.src = item.src;
            document.body.style.overflow = 'hidden'; // Nonaktifkan scrolling
        });
    });

    lightboxClose.addEventListener('click', () => {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto'; // Aktifkan kembali scrolling
    });

    // Tutup lightbox jika mengklik di luar gambar
    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImage) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // 6. Logika Form Ucapan (Simulasi)
    const wishForm = document.getElementById('wish-form');
    const wishesList = document.getElementById('wishes-list');

    wishForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const message = document.getElementById('message').value;

        // Tambahkan ucapan baru ke daftar
        const wishItem = document.createElement('div');
        wishItem.classList.add('wish-item');
        wishItem.innerHTML = `<h4>${name}</h4><p>${message}</p>`;

        // Sisipkan di paling atas
        wishesList.prepend(wishItem);

        // Reset form
        wishForm.reset();
        
        alert('Ucapan Anda berhasil dikirim!');
    });
});