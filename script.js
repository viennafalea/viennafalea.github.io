document.addEventListener('DOMContentLoaded', function() {

    console.log('✨ Portofolio Vienna Nafalea siap ditampilkan!');

    // ===== UPDATE YEAR di footer otomatis =====
    const yearElements = document.querySelectorAll('.copyright');
    const currentYear = new Date().getFullYear();

    yearElements.forEach(el => {
        el.textContent = el.textContent.replace('2026', currentYear);
    });

    console.log('📅 Tahun diperbarui ke:', currentYear);

    // ===== DOWNLOAD PDF =====
    const downloadPdfBtn = document.getElementById('downloadPdfBtn');
    if (downloadPdfBtn) {
        downloadPdfBtn.addEventListener('click', () => {
            // Sembunyikan tombol saat di-generate
            downloadPdfBtn.style.display = 'none';
            downloadPdfBtn.innerText = 'Generating...';
            downloadPdfBtn.style.display = 'flex'; // Tetap tampilkan tapi ubah teks
            downloadPdfBtn.disabled = true;

            // Pastikan scroll ada di atas agar html2canvas tidak terpotong
            window.scrollTo(0, 0);

            async function generatePDF() {
                try {
                    const { jsPDF } = window.jspdf;
                    const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [1920, 1080] });
                    const slides = document.querySelectorAll('.slide');

                    for (let i = 0; i < slides.length; i++) {
                        // Kunci ukuran elemen untuk canvas
                        slides[i].style.width = '1920px';
                        slides[i].style.height = '1080px';
                        slides[i].style.minHeight = '1080px';
                        slides[i].style.maxHeight = '1080px';
                        
                        const canvas = await html2canvas(slides[i], {
                            scale: 2,
                            useCORS: true,
                            width: 1920,
                            height: 1080,
                            windowWidth: 1920,
                            windowHeight: 1080,
                            scrollY: 0,
                            scrollX: 0
                        });
                        
                        // Kembalikan style
                        slides[i].style.width = '';
                        slides[i].style.height = '';
                        slides[i].style.minHeight = '100vh';
                        slides[i].style.maxHeight = '';
                        
                        const imgData = canvas.toDataURL('image/jpeg', 0.98);
                        if (i > 0) pdf.addPage([1920, 1080], 'landscape');
                        pdf.addImage(imgData, 'JPEG', 0, 0, 1920, 1080);
                    }
                    
                    pdf.save('Portfolio_Vienna_Nafalea.pdf');
                } catch (err) {
                    console.error("PDF generation error:", err);
                    alert("Maaf, terjadi kesalahan saat membuat PDF. Silakan coba lagi.");
                } finally {
                    downloadPdfBtn.innerHTML = '<i class="fas fa-file-pdf"></i> Download PDF';
                    downloadPdfBtn.disabled = false;
                }
            }

            // Jalankan
            generatePDF();
        });
    }

    // ===== SCROLL ANIMATION =====
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

});