document.getElementById('downloadResume').addEventListener('click', function () {
    const resumeElement = document.getElementById('resumeTemplate');
    const opt = {
        margin:       1,
        filename:     'Resume.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(resumeElement).save();
});
