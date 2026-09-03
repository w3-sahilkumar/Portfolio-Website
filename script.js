const yearElement = document.getElementById('year');

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const certificateListElement = document.getElementById('certificate-list');
const certificateEmptyElement = document.getElementById('certificate-empty');

if (certificateListElement) {
  const certificateFiles = [
    'certificate-1.jpg',
    'certificate-2.jpg',
    'certificate-3.jpg'
  ];
  let loadedCertificates = 0;

  certificateFiles.forEach((fileName) => {
    const image = document.createElement('img');
    image.className = 'certificate-image';
    image.src = `assets/images/certificates/${fileName}`;
    image.alt = fileName.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
    image.loading = 'lazy';

    image.addEventListener('load', () => {
      loadedCertificates += 1;
      if (certificateEmptyElement) {
        certificateEmptyElement.hidden = true;
      }
    });

    image.addEventListener('error', () => {
      image.remove();
      if (loadedCertificates === 0 && certificateEmptyElement) {
        certificateEmptyElement.hidden = false;
      }
    });

    certificateListElement.appendChild(image);
  });
}
