
document.getElementById('downloadResume').addEventListener('click', () => {
    const resumeTemplate = document.getElementById('resumeTemplate');
    const opt = {
        margin: 1,
        filename: 'Resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().from(resumeTemplate).set(opt).save();
});
