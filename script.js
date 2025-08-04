document.addEventListener('DOMContentLoaded', () => {
    // === Countdown Timer ===
    const weddingDate = new Date('September 5, 2025 08:00:00').getTime(); // Sesuaikan dengan tanggal dan waktu akad Anda

    const countdownFunction = setInterval(() => {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance < 0) {
            clearInterval(countdownFunction);
            document.getElementById('timer').innerHTML = '<p>Pernikahan telah dimulai!</p>';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = days < 10 ? '0' + days : days;
        document.getElementById('hours').innerText = hours < 10 ? '0' + hours : hours;
        document.getElementById('minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById('seconds').innerText = seconds < 10 ? '0' + seconds : seconds;
    }, 1000);

    // === Music Player Toggle ===
    const backgroundMusic = document.getElementById('background-music');
    const musicToggleButton = document.getElementById('music-toggle');
    const musicIcon = musicToggleButton.querySelector('.music-icon');

    let isPlaying = false; // Akan diubah oleh browser jika autoplay diblokir

    // Memutar musik saat halaman dimuat (jika diizinkan browser)
    backgroundMusic.play().then(() => {
        isPlaying = true;
        musicIcon.innerHTML = '&#10074;&#10074;'; // Pause icon
    }).catch(error => {
        // Autoplay diblokir, tetap tampilkan play icon
        isPlaying = false;
        musicIcon.innerHTML = '&#9654;'; // Play icon
        console.log("Autoplay diblokir oleh browser. Pengguna harus mengklik tombol putar.");
    });


    musicToggleButton.addEventListener('click', () => {
        if (isPlaying) {
            backgroundMusic.pause();
            musicIcon.innerHTML = '&#9654;'; // Play icon
        } else {
            backgroundMusic.play();
            musicIcon.innerHTML = '&#10074;&#10074;'; // Pause icon
        }
        isPlaying = !isPlaying;
    });

    // === Salin Nomor Rekening ===
    const copyButton = document.querySelector('.btn-copy');
    if (copyButton) {
        copyButton.addEventListener('click', () => {
            const norekSpan = document.getElementById('norek');
            const textToCopy = norekSpan.innerText;

            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalText = copyButton.innerText;
                copyButton.innerText = 'Disalin!';
                setTimeout(() => {
                    copyButton.innerText = originalText;
                }, 1500);
            }).catch(err => {
                console.error('Gagal menyalin:', err);
                alert('Gagal menyalin nomor rekening. Silakan salin manual.');
            });
        });
    }

    // === Smooth Scroll untuk "Lihat Undangan" ===
    const viewInviteBtn = document.querySelector('.hero-content .btn');
    if (viewInviteBtn) {
        viewInviteBtn.addEventListener('click', function(event) {
            event.preventDefault(); // Mencegah perilaku default tautan
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
});