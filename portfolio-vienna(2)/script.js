document.addEventListener('DOMContentLoaded', function() {

    console.log('✨ Portofolio Vienna Nafalea siap ditampilkan!');

    // ===== UPDATE YEAR di footer otomatis =====
    const yearElements = document.querySelectorAll('.copyright');
    const currentYear = new Date().getFullYear();

    yearElements.forEach(el => {
        el.textContent = el.textContent.replace('2026', currentYear);
    });

    console.log('📅 Tahun diperbarui ke:', currentYear);

});